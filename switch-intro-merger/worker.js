// =========================================================================
// ENVIRONMENT SHIM: Fool ffmpeg.min.js into believing a DOM exists in this worker
// =========================================================================
self.window = self;
self.document = {
    currentScript: { src: self.location.href },
    createElement: function(tagName) {
        if (tagName === 'a') {
            return {
                href: '',
                get protocol() { try { return new URL(this.href, self.location.href).protocol; } catch(e) { return ''; } },
                get host() { try { return new URL(this.href, self.location.href).host; } catch(e) { return ''; } },
                get hostname() { try { return new URL(this.href, self.location.href).hostname; } catch(e) { return ''; } },
                get pathname() { try { return new URL(this.href, self.location.href).pathname; } catch(e) { return ''; } },
                get search() { try { return new URL(this.href, self.location.href).search; } catch(e) { return ''; } },
                get hash() { try { return new URL(this.href, self.location.href).hash; } catch(e) { return ''; } }
            };
        }
        return {};
    },
    getElementsByTagName: function() { return []; }
};
// =========================================================================

// Now safely load the library locally
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
            ffmpeg.FS('writeFile', 'user.mp4', new Uint8Array(e.data.userFile));

            let ffmpegArgs;

            if (e.data.noIntro) {
                // Compress-only mode: no intro, just re-encode the user clip
                self.postMessage({ type: 'STATUS', message: 'Encoding video stream...' });

                ffmpegArgs = [
                    '-i', 'user.mp4',
                    '-vf', 'fps=30,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1',
                    '-af', 'aformat=channel_layouts=stereo,aresample=44100',
                    '-c:v', 'libx264',
                    '-preset', 'ultrafast',
                    '-pix_fmt', 'yuv420p'
                ];

                if (e.data.limitTo8MB && e.data.duration) {
                    const targetSizeBits = 7.8 * 1024 * 1024 * 8;
                    const audioBitrateKbps = 96;
                    let videoBitrateKbps = Math.floor((targetSizeBits / e.data.duration) / 1000) - audioBitrateKbps;
                    if (videoBitrateKbps < 150) videoBitrateKbps = 150;

                    ffmpegArgs.push(
                        '-b:v', `${videoBitrateKbps}k`,
                        '-maxrate', `${videoBitrateKbps * 1.2}k`,
                        '-bufsize', `${videoBitrateKbps}k`,
                        '-c:a', 'aac',
                        '-b:a', `${audioBitrateKbps}k`
                    );
                } else {
                    ffmpegArgs.push('-crf', '23', '-c:a', 'aac');
                }

                ffmpegArgs.push('-threads', '1', '-movflags', '+faststart', 'output.mp4');

            } else {
                ffmpeg.FS('writeFile', 'intro.mp4', await fetchFile(e.data.introUrl));

                self.postMessage({ type: 'STATUS', message: 'Aligning stream parameters and compiling...' });

                ffmpegArgs = [
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
                '-pix_fmt', 'yuv420p'
            ];

            // If 8MB Optimization Toggle is active, calculate an aggressive target bitrate
            if (e.data.limitTo8MB && e.data.duration) {
                const targetSizeBits = 7.8 * 1024 * 1024 * 8; // Aim for 7.8MB safely under the 8MB wire
                const totalDuration = e.data.duration + 3.0;   // Add ~3 seconds for the Switch intro animation
                
                // Allocate 96kbps for audio, rest goes to video
                const audioBitrateKbps = 96;
                let videoBitrateKbps = Math.floor((targetSizeBits / totalDuration) / 1000) - audioBitrateKbps;
                
                // Bound check minimum bitrate requirements so video doesn't break entirely
                if (videoBitrateKbps < 150) videoBitrateKbps = 150; 

                ffmpegArgs.push(
                    '-b:v', `${videoBitrateKbps}k`,
                    '-maxrate', `${videoBitrateKbps * 1.2}k`,
                    '-bufsize', `${videoBitrateKbps}k`,
                    '-c:a', 'aac',
                    '-b:a', `${audioBitrateKbps}k`
                );
            } else {
                // Default high quality settings
                ffmpegArgs.push(
                    '-crf', '23',
                    '-c:a', 'aac'
                );
            }

            // Append threading and standard output parameters
            ffmpegArgs.push(
                '-threads', '1',
                '-movflags', '+faststart',
                'output.mp4'
            );
            
            } // end noIntro else block

            await ffmpeg.run(...ffmpegArgs);

            self.postMessage({ type: 'STATUS', message: 'Validating binary stream output...' });
            const data = ffmpeg.FS('readFile', 'output.mp4');
            
            // Pass binary stream payload back using high-performance Transferable ArrayBuffer
            self.postMessage({ type: 'DONE', data: data.buffer }, [data.buffer]);
        } catch (err) {
            self.postMessage({ type: 'ERROR', error: err.message });
        }
    }
};
