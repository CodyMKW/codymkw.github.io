function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

function getBrowserSpecs() {
    const browserInfo = `
        Browser Name: ${navigator.appName}<br>
        Browser Version: ${navigator.appVersion}<br>
        User Agent: ${navigator.userAgent}<br>
        Platform: ${navigator.platform}<br>
        Language: ${navigator.language}
    `;
    document.getElementById('browserInfo').innerHTML = browserInfo;
}

function getPCSpecs() {
    const pcInfo = `
        Screen Width: ${screen.width}px<br>
        Screen Height: ${screen.height}px<br>
        Color Depth: ${screen.colorDepth} bits<br>
        Device Memory: ${navigator.deviceMemory || 'N/A'} GB<br>
        Hardware Concurrency: ${navigator.hardwareConcurrency || 'N/A'} threads
    `;
    document.getElementById('pcInfo').innerHTML = pcInfo;
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", targetTheme);
    
    // Update button text
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.textContent = targetTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode";
}

// Initialize default tab
document.addEventListener('DOMContentLoaded', () => {
    openTab('browserSpecs');
    getBrowserSpecs();
    getPCSpecs();

    // Set initial theme and button text
    const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", initialTheme);
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.textContent = initialTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode";

    // Add event listener for dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
});
