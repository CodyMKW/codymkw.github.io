const discordHome = "https://discord.com/channels/@me";
const modal = document.getElementById("extWarning");
const extensionID = "edfpalahildnikdjdnmmoekoncglnblh";
var modalCloseButton = document.getElementById("modalClose");
var installedExtVersion;

function version_is_newer(current, available) {
    let current_subvs = current.split(".");
    let available_subvs = available.split(".");
    for (let i = 0; i < 4; i++) {
        let ver_diff = (parseInt(available_subvs[i]) || 0) - (parseInt(current_subvs[i]) || 0);
        if (ver_diff > 0)
            return true;
        else if (ver_diff < 0)
            return false;
    }
    return false;
}

window.addEventListener('DOMContentLoaded', (event) => {
    var extNotLoaded;
    fetch("chrome-extension://" + extensionID + "/manifest.json")
        .then(response => response.json())
        .then(data => {
            installedExtVersion = data.version;
            extNotLoaded = setTimeout(() => {
                document.getElementById('frame').src += ''
            }, 1000);
        })
