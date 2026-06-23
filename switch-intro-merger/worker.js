// FIXED: Loading the library locally to bypass strict browser CDN blocks
importScripts('ffmpeg.min.js');

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ 
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core-st/dist/ffmpeg-core.js",
    mainName: "main"
});

// Watch internal FFmpeg CLI progress loops
ffmpeg.setProgress(({ ratio }) => {
    self.postMessage({ type: 'PROGRESS', ratio });
});

// Track internal engine readouts visually
ffmpeg.setLogger(({ type, message }) => {
    self.postMessage({ type: 'LOG', logType: type, message });
});

self.onmessage = async (e) => {
    if (e.data.type === 'START') {
        try {
            self.postMessage({ type: 'STATUS', message: 'Loading compilation framework...' });
            if (!ffmpeg.isLoaded()) {
                await ffmpeg.load();
            }
            
            self.postMessage({ type: 'STATUS', message: 'Staging local source files...' });
            ffmpeg.FS('writeFile', 'intro.mp4', await fetchFile(e.data.introUrl));
            ffmpeg.FS('writeFile', 'user.mp4', new Uint8Array(e.data.userFile));

            self.postMessage({ type: 'STATUS', message: 'Aligning stream parameters and compiling...' });
            
            await ffmpeg.run(
                '-i', 'intro.mp4', 
                '-i', 'user.mp4', 
                '-filter_complex', 
                '[0:v]fps=30,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v0];' +
                '[1:v]fps=30,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v1];' +
                '[0:a]aformat=channel_layouts=stereo,aresample=44100[a0];' +
                '[1:a]aformat=channel_layouts=stereo,aresample=44100[a1];' +
                '[v0][a0][v1][a1]concat=n=2:v=1:a=1[outv][outa]', 
                '-map', '[outv]', 
                '-map', '[outa]', 
                '-c:v', 'libx264',
                '-preset', 'ultrafast',
                '-pix_fmt', 'yuv420p',
                '-c:a', 'aac',
                '-threads', '1',
                '-movflags', '+faststart',
                'output.mp4'
            );

            self.postMessage({ type: 'STATUS', message: 'Validating binary stream output...' });
            const data = ffmpeg.FS('readFile', 'output.mp4');
            
            // Pass binary stream payload back using high-performance Transferable ArrayBuffer
            self.postMessage({ type: 'DONE', data: data.buffer }, [data.buffer]);
        } catch (err) {
            self.postMessage({ type: 'ERROR', error: err.message });
        }
    }
};