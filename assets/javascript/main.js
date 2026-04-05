function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchWithRetry(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        var fallbackUrl = url.split('?')[0];
        return fetch(fallbackUrl).then(function (fallbackResponse) {
          return fallbackResponse.json();
        });
      }
      return data;
    })
    .catch(function () {
      var fallbackUrl = url.split('?')[0];
      return fetch(fallbackUrl).then(function (fallbackResponse) {
        return fallbackResponse.json();
      });
    });
}

function updatePresence() {
  fetchWithRetry('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5')
    .then(function (data) {
      var state = data.friend.presence.state.toLowerCase();
      var onlineStatus = state === 'playing'
        ? 'Online'
        : capitalizeFirstLetter(state);

      var gameName = data.friend.presence.game.name || null;
      var statusContainer = document.getElementById('status-container');

      var statusColor = '';
      switch (onlineStatus.toLowerCase()) {
        case 'online':
        case 'playing':
          statusColor = '#00C900';
          break;
        case 'offline':
          statusColor = 'red';
          break;
        case 'inactive':
          statusColor = 'yellow';
          break;
        default:
          statusColor = 'white';
      }

      if (gameName) {
        statusContainer.innerHTML =
          '<p>Currently <span style="color: ' + statusColor + ';">' +
          onlineStatus +
          '</span> playing ' + gameName +
          ' <a id="check-switch-game-status">🔎</a></p>';
      } else {
        statusContainer.innerHTML =
          '<p>Currently <span style="color: ' + statusColor + ';">' +
          onlineStatus.charAt(0) + onlineStatus.slice(1).toLowerCase() +
          '</span> <a id="check-switch-game-status">🔎</a></p>';
      }

      document
        .getElementById('check-switch-game-status')
        .addEventListener('click', openModal);
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
    });
}

function openModal() {
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = 'X';
  closeButton.onclick = closeModal;
  
  const pictureElement = document.createElement('picture');
  
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('srcset', `https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5/embed?theme=${currentTheme}&friend-code=2549-4631-6600&transparent=1`);
  sourceElement.setAttribute('media', '(prefers-color-scheme: dark)');
  
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', `https://nxapi-presence.fancy.org.uk/api/presence/644cd5195/embed?theme=${currentTheme}&friend-code=2549-4631-6600&transparent=1`);
  imgElement.setAttribute('alt', 'Nintendo Switch presence');
  
  pictureElement.appendChild(sourceElement);
  pictureElement.appendChild(imgElement);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(pictureElement);
  modalContainer.appendChild(modalContent);
  
  document.body.appendChild(modalContainer);
  
  document.body.classList.add('modal-open');

  const themeChangeHandler = (e) => {
    const newTheme = e.detail;
    sourceElement.setAttribute('srcset', sourceElement.srcset.replace(/theme=\w+/, `theme=${newTheme}`));
    imgElement.setAttribute('src', imgElement.src.replace(/theme=\w+/, `theme=${newTheme}`));
  };
  document.addEventListener('themeChanged', themeChangeHandler);

  modalContainer.addEventListener('click', function handler(e) {
    if (e.target === modalContainer) {
      document.removeEventListener('themeChanged', themeChangeHandler);
      modalContainer.removeEventListener('click', handler);
    }
  });
}

function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.parentNode.removeChild(modalContainer);
  
  document.body.classList.remove('modal-open');
}

updatePresence();

setInterval(updatePresence, 5000);

var currentDate = new Date();

var birthday = new Date(currentDate.getFullYear(), 0, 17);

if (
  currentDate.getMonth() === birthday.getMonth() &&
  currentDate.getDate() === birthday.getDate()
) {
  var birthDate = new Date(1991, 0, 17);
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  var codyHeading = document.getElementById("cody-heading");
  var codyHeading2 = document.getElementById("cody-heading2");
  codyHeading.innerHTML = "🎂 Cody 🎂";
  codyHeading2.innerHTML = "Happy " + age + getOrdinalSuffix(age) + " Birthday!! 🥳";

  codyHeading.classList.add("shimmer");
  codyHeading2.classList.add("shimmer");

  var headerBg = document.getElementById("cody-header-bg");
  if (headerBg) {
      headerBg.classList.add("cody-header-bg-visible");
  }

  var ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = age.toString();
  }
}

function getOrdinalSuffix(number) {
  var suffix = 'th';
  var lastDigit = number % 10;
  var lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    suffix = 'st';
  } else if (lastDigit === 2 && lastTwoDigits !== 12) {
    suffix = 'nd';
  } else if (lastDigit === 3 && lastTwoDigits !== 13) {
    suffix = 'rd';
  }

  return suffix;
}
  
  function changeLocation(url) {
    window.location.href = url;
  }
  
var startYear = 2023;
var currentYear = new Date().getFullYear();
var yearText = startYear === currentYear ? startYear : startYear + ' - ' + currentYear;
var yearSpan = document.getElementById('copyrightYears');
yearSpan.innerHTML = '&copy; ' + yearText + ' ';

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    const siteTitleImage = document.getElementById('site-title-image');
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        setLightTheme();
    } else {
        setDarkTheme();
    }
    
    themeToggle.addEventListener('click', function() {
        if (themeStyle.getAttribute('href').includes('light')) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    });
    
    function setLightTheme() {
        themeStyle.href = 'assets/css/main-light.css';
        themeToggle.innerHTML = '<span>🌙</span> Dark Mode';
        localStorage.setItem('theme', 'light');

        if (siteTitleImage) {
            siteTitleImage.src = 'assets/images/Site_Title(light).png';
        }

        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'light' }));
    }

    function setDarkTheme() {
        themeStyle.href = 'assets/css/main.css';
        themeToggle.innerHTML = '<span>☀️</span> Light Mode';
        localStorage.setItem('theme', 'dark');

        if (siteTitleImage) {
            siteTitleImage.src = 'assets/images/Site_Title(dark).png';
        }

        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'dark' }));
    }
});

/* ── Start April Fools code ── */
(function () {
  var now = new Date();
  var isAprilFools = now.getMonth() === 3 && now.getDate() === 1;
  if (!isAprilFools) return;
 
  var style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
 
    * {
      font-family: "Comic Neue", "Comic Sans MS", cursive !important;
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='28'%3E🤡%3C/text%3E%3C/svg%3E") 16 16, auto !important;
    }
 
    /* Subtle rainbow text shimmer on headings */
    h1, h2, h3, h4, h5, h6 {
      animation: rainbowText 3s linear infinite !important;
      background: linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff, #ff0000) !important;
      background-size: 200% auto !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
 
    @keyframes rainbowText {
      0%   { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
 
    /* Images: slow wobble instead of full spin (readable but unsettling) */
    img {
      animation: wobble 2.5s ease-in-out infinite !important;
      filter: hue-rotate(0deg) !important;
      animation: wobble 2.5s ease-in-out infinite, colorShift 4s linear infinite !important;
    }
 
    @keyframes wobble {
      0%   { transform: rotate(-4deg) scale(1); }
      25%  { transform: rotate(4deg) scale(1.03); }
      50%  { transform: rotate(-3deg) scale(0.97); }
      75%  { transform: rotate(3deg) scale(1.02); }
      100% { transform: rotate(-4deg) scale(1); }
    }
 
    @keyframes colorShift {
      0%   { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
 
    /* Buttons/links: jiggle on hover via class */
    .af-jiggle {
      animation: jiggle 0.4s ease !important;
    }
 
    @keyframes jiggle {
      0%   { transform: translate(0, 0) rotate(0deg); }
      20%  { transform: translate(-6px, 3px) rotate(-2deg); }
      40%  { transform: translate(6px, -3px) rotate(2deg); }
      60%  { transform: translate(-4px, 5px) rotate(-1deg); }
      80%  { transform: translate(4px, -2px) rotate(1deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
 
    /* Marquee banner */
    #af-marquee-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: repeating-linear-gradient(
        45deg,
        #ffcc00,
        #ffcc00 10px,
        #ff0000 10px,
        #ff0000 20px
      );
      color: #000;
      font-family: "Comic Neue", "Comic Sans MS", cursive !important;
      font-weight: 700;
      font-size: 16px;
      padding: 8px 0;
      z-index: 999999;
      overflow: hidden;
      white-space: nowrap;
      box-shadow: 0 -3px 8px rgba(0,0,0,0.4);
    }
 
    #af-marquee-inner {
      display: inline-block;
      animation: marqueeScroll 20s linear infinite;
    }
 
    @keyframes marqueeScroll {
      0%   { transform: translateX(100vw); }
      100% { transform: translateX(-100%); }
    }
 
    /* Toast notification */
    #af-toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fff;
      border: 3px solid #ff0000;
      border-radius: 8px;
      padding: 14px 18px;
      font-family: "Comic Neue", "Comic Sans MS", cursive !important;
      font-size: 15px;
      font-weight: 700;
      color: #222;
      z-index: 999999;
      max-width: 280px;
      box-shadow: 6px 6px 0 #ff0000;
      animation: toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      opacity: 0;
    }
 
    @keyframes toastIn {
      0%   { transform: translateX(120%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
 
    /* Confetti canvas */
    #af-confetti {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 999998;
    }
  `;
  document.head.appendChild(style);
 
  var skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "INPUT", "TEXTAREA", "SELECT", "OPTION", "CODE", "PRE"]);
 
  function reverseText(node) {
    if (node.nodeType === 3) {
      if (node.nodeValue.trim().length > 1) {
        node.nodeValue = node.nodeValue.split("").reverse().join("");
      }
    } else if (!skipTags.has(node.nodeName)) {
      node.childNodes.forEach(reverseText);
    }
  }
 
  reverseText(document.body);
 
  var interactives = document.querySelectorAll("button, a, [role='button']");
  interactives.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      if (Math.random() < 0.4) {
        var rect = el.getBoundingClientRect();
        var dx = (Math.random() * 80 - 40);
        var dy = (Math.random() * 40 - 20);
        el.style.transition = "transform 0.15s ease";
        el.style.transform = "translate(" + dx + "px, " + dy + "px)";
        setTimeout(function () {
          el.style.transform = "translate(0, 0)";
        }, 600);
      }
      el.classList.add("af-jiggle");
      el.addEventListener("animationend", function () {
        el.classList.remove("af-jiggle");
      }, { once: true });
    });
  });
 
  var audioCtx = null;
 
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
 
  var boomAudio = new Audio("https://www.myinstants.com/media/sounds/vine-boom.mp3");
  boomAudio.preload = "auto";
 
  document.addEventListener("click", function () {
    var boom = boomAudio.cloneNode();
    boom.volume = 0.25;
    boom.playbackRate = 0.85 + Math.random() * 0.4;
    boom.play().catch(function () {});
  });
 
  var emojis = ["🎉","🤡","💥","🎈","🐸","🦆","🔥","👻","🌈","💀","🎺","🧨"];
 
  document.addEventListener("dblclick", function (e) {
    for (var i = 0; i < 10; i++) {
      (function (i) {
        var span = document.createElement("span");
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.cssText = [
          "position: fixed",
          "left: " + e.clientX + "px",
          "top: " + e.clientY + "px",
          "font-size: " + (18 + Math.random() * 24) + "px",
          "pointer-events: none",
          "z-index: 9999999",
          "transform: translate(-50%, -50%)",
          "transition: all 0.8s ease-out",
          "opacity: 1"
        ].join(";");
        document.body.appendChild(span);
 
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            var angle = (i / 10) * Math.PI * 2;
            var dist = 60 + Math.random() * 80;
            span.style.left = (e.clientX + Math.cos(angle) * dist) + "px";
            span.style.top  = (e.clientY + Math.sin(angle) * dist) + "px";
            span.style.opacity = "0";
            span.style.fontSize = "10px";
          });
        });
 
        setTimeout(function () { span.remove(); }, 900);
      })(i);
    }
  });
 
  var messages = [
    "🎉 HAPPY APRIL FOOLS DAY! 🎉",
    "⚠️ WARNING: Your computer has detected 0 viruses (that we're aware of)",
    "📢 Everything you see is completely normal. Nothing has changed.",
    "🤡 The real fools were the friends we pranked along the way",
    "🔥 This message will self-destruct in... just kidding",
    "🦆 Did you know ducks wear hats on April 1st? You do now.",
    "📉 Productivity has entered the chat and immediately left",
    "🎈 Your scroll wheel is now reversed. Psyche! (or is it?)",
  ];
 
  var bar = document.createElement("div");
  bar.id = "af-marquee-bar";
  var inner = document.createElement("span");
  inner.id = "af-marquee-inner";
  inner.textContent = messages.join("          ✦          ");
  bar.appendChild(inner);
  document.body.appendChild(bar);
 
  document.body.style.paddingBottom = "40px";
 
  var toasts = [
    "🚨 CRITICAL UPDATE: Mimtendo has found your location.",
    "📧 You have 1,847 unread emails and their all about shirtless Mario.",
    "🐛 Bug found: Your mouse is working too well. Throttling it now.",
    "✅ Your data has been backed up to a floppy disk.",
    "🤖 AI has taken over. Please report to your nearest clown.",
    "📡 WiFi signal boosted by 3000%. You're welcome.",
    "🧃 Reminder: Hydrate. Or don't. We're a website, not your mom.",
  ];
  var toastIndex = 0;
 
  function showToast() {
    var existing = document.getElementById("af-toast");
    if (existing) existing.remove();
 
    var toast = document.createElement("div");
    toast.id = "af-toast";
    toast.textContent = toasts[toastIndex % toasts.length];
    toastIndex++;
    document.body.appendChild(toast);
 
    setTimeout(function () {
      toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(120%)";
      setTimeout(function () { toast.remove(); }, 450);
    }, 5000);
  }
 
  setTimeout(function () {
    showToast();
    setInterval(showToast, 15000);
  }, 3000);
 
  var canvas = document.createElement("canvas");
  canvas.id = "af-confetti";
  document.body.appendChild(canvas);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
 
  window.addEventListener("resize", function () {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
 
  var ctx2d = canvas.getContext("2d");
  var confettiPieces = [];
  var confettiColors = ["#ff0000","#ff7700","#ffee00","#00cc44","#0088ff","#cc00ff","#ff66aa"];
 
  for (var i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * canvas.height,
      w: 6 + Math.random() * 8,
      h: 10 + Math.random() * 6,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rot: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 2,
      vy: 1.5 + Math.random() * 2.5,
      vr: (Math.random() - 0.5) * 0.12,
      life: 1
    });
  }
 
  var confettiRunning = true;
  var confettiFrames = 0;
 
  function drawConfetti() {
    if (!confettiRunning) return;
    confettiFrames++;
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
 
    var anyAlive = false;
    confettiPieces.forEach(function (p) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.vr;
      if (p.y > canvas.height + 20) {
        if (confettiFrames < 200) {
          // Recycle while burst is fresh
          p.y = -10;
          p.x = Math.random() * canvas.width;
        } else {
          p.life = 0;
        }
      }
      if (p.life > 0) {
        anyAlive = true;
        ctx2d.save();
        ctx2d.globalAlpha = p.life;
        ctx2d.fillStyle = p.color;
        ctx2d.translate(p.x, p.y);
        ctx2d.rotate(p.rot);
        ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx2d.restore();
      }
    });
 
    if (!anyAlive) {
      confettiRunning = false;
      canvas.remove();
      return;
    }
 
    requestAnimationFrame(drawConfetti);
  }
 
  drawConfetti();
 
  console.log(
    "%c🤡 APRIL FOOLS! %cYou opened DevTools on April 1st... we respect the hustle.",
    "font-size: 28px; color: #ff3300; font-weight: bold;",
    "font-size: 14px; color: #555;"
  );
  console.log("%cP.S. Nothing in this script actually broke your page. Probably.", "font-style: italic; color: #999;");
 
})();
/* ── End April Fools code ── */

/* ── Start Easter  code ── */
(function () {
 
  function getEasterDate(year) {
    var a = year % 19, b = Math.floor(year / 100), c = year % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day   = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  }
 
  function run() {
    var now    = new Date();
    var easter = getEasterDate(now.getFullYear());
    var isEaster = now.getMonth() === easter.getMonth() && now.getDate() === easter.getDate();
    // var isEaster = true; // ← TEST MODE
    if (!isEaster) return;
 
    /* ── Styles ──────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🥚%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      #easter-overlay {
        position: fixed; inset: 0;
        background: linear-gradient(160deg,
          rgba(255,182,193,0.10) 0%,
          rgba(186,225,255,0.10) 33%,
          rgba(198,255,198,0.10) 66%,
          rgba(255,253,186,0.10) 100%);
        pointer-events: none; z-index: 89990;
      }
 
      #easter-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89991;
      }
 
      #easter-banner {
        position: fixed; top: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #ffb6c1, #b6e0ff, #b6ffb6, #fffbbf, #ffb6c1);
        background-size: 300% 100%;
        animation: easterBannerFlow 4s ease infinite;
        font-family: 'Fredoka One', cursive;
        font-size: 18px; color: #5a3060;
        text-align: center; padding: 10px 0;
        z-index: 89995; letter-spacing: 2px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.15);
      }
      @keyframes easterBannerFlow {
        0%,100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
      }
 
      h1, h2, h3 {
        background: linear-gradient(90deg, #ff69b4, #87ceeb, #90ee90, #ffd700, #ff69b4) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: easterHeadingFlow 4s linear infinite !important;
      }
      @keyframes easterHeadingFlow {
        0%   { background-position: 0% center; }
        100% { background-position: 200% center; }
      }
 
      img { animation: easterWobble 3s ease-in-out infinite !important; }
      @keyframes easterWobble {
        0%,100% { transform: rotate(-2deg); }
        50%     { transform: rotate(2deg); }
      }
 
      #easter-toast {
        position: fixed; bottom: 48px; left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: #fff; border: 3px solid #ff69b4;
        border-radius: 50px; padding: 12px 24px;
        font-family: 'Fredoka One', cursive;
        font-size: 15px; color: #5a3060;
        z-index: 89996; white-space: nowrap;
        box-shadow: 0 6px 24px rgba(255,105,180,0.3);
        transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.4s ease;
        opacity: 0;
      }
      #easter-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
 
      #easter-footer {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #ffb6c1, #b6e0ff, #b6ffb6, #fffbbf, #ffb6c1);
        background-size: 300% 100%;
        animation: easterBannerFlow 4s ease infinite;
        padding: 7px 0; text-align: center;
        font-size: 20px; letter-spacing: 4px; z-index: 89993;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "48px";
    document.body.style.paddingBottom = "40px";
 
    /* ── DOM ──────────────────────────────────────────────── */
    var banner = document.createElement("div");
    banner.id = "easter-banner";
    banner.textContent = "🐣  Happy Easter!  •  🌸  Wishing you a joyful spring day  •  🌷  Happy Easter!  •  🐰";
    document.body.prepend(banner);
 
    var footer = document.createElement("div");
    footer.id = "easter-footer";
    footer.textContent = "🥚 🌸 🐣 🌷 🦋 🐰 🌼 🥚 🌸 🐣 🌷 🦋 🐰 🌼";
    document.body.appendChild(footer);
 
    var overlay = document.createElement("div");
    overlay.id = "easter-overlay";
    document.body.appendChild(overlay);
 
    /* ── Canvas ───────────────────────────────────────────── */
    var canvas = document.createElement("canvas");
    canvas.id = "easter-canvas";
    document.body.appendChild(canvas);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    });
 
    var ctx = canvas.getContext("2d");
    var symbols = ["🥚","🐣","🐥","🌸","🌷","🦋","🌼","🐰"];
    var fallers = [];
    for (var i = 0; i < 35; i++) {
      fallers.push({
        x: Math.random() * window.innerWidth,
        y: -Math.random() * window.innerHeight,
        size: 15 + Math.random() * 16,
        vy: 0.5 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.5,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        sym: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }
 
    (function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fallers.forEach(function (f) {
        f.y += f.vy; f.x += f.vx; f.rot += f.vr;
        if (f.y > canvas.height + 30) { f.y = -30; f.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(f.x, f.y); ctx.rotate(f.rot);
        ctx.font = f.size + "px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(f.sym, 0, 0);
        ctx.restore();
      });
      requestAnimationFrame(animate);
    })();
 
    /* ── Chime + burst on click ───────────────────────────── */
    function playChime() {
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        [523, 659, 784, 1047].forEach(function (freq, i) {
          var osc = ac.createOscillator(), g = ac.createGain();
          osc.connect(g); g.connect(ac.destination);
          osc.type = "sine"; osc.frequency.value = freq;
          var t = ac.currentTime + i * 0.1;
          g.gain.setValueAtTime(0.12, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          osc.start(t); osc.stop(t + 0.55);
        });
      } catch(e) {}
    }
 
    var burstSyms = ["🥚","🐣","🌸","🌷","🦋","🌼"];
    document.addEventListener("click", function (e) {
      playChime();
      for (var i = 0; i < 8; i++) {
        (function(i) {
          var span = document.createElement("span");
          span.textContent = burstSyms[Math.floor(Math.random() * burstSyms.length)];
          span.style.cssText = "position:fixed;pointer-events:none;z-index:999999;font-size:" +
            (15 + Math.random()*12) + "px;left:" + e.clientX + "px;top:" + e.clientY +
            "px;transition:all 0.7s ease-out;opacity:1;transform:translate(-50%,-50%)";
          document.body.appendChild(span);
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            var ang = (i / 8) * Math.PI * 2, d = 50 + Math.random() * 55;
            span.style.left = (e.clientX + Math.cos(ang)*d) + "px";
            span.style.top  = (e.clientY + Math.sin(ang)*d) + "px";
            span.style.opacity = "0";
          }); });
          setTimeout(function () { span.remove(); }, 800);
        })(i);
      }
    });
 
    /* ── Toasts ───────────────────────────────────────────── */
    var toasts = [
      "🐰 Hoppy Easter! Wishing you a wonderful spring day.",
      "🌷 Spring has sprung — flowers, sunshine, and chocolate eggs!",
      "🥚 Did you know Easter eggs were first dyed red to symbolize joy?",
      "🌸 The Easter Bunny originated from German traditions in the 1700s.",
      "🐣 Fun fact: Easter is the oldest Christian holiday.",
      "🍫 1.5 billion chocolate eggs are sold each Easter worldwide.",
    ];
    var toastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("easter-toast");
      if (!t) { t = document.createElement("div"); t.id = "easter-toast"; document.body.appendChild(t); }
      t.textContent = toasts[toastIdx++ % toasts.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 4500);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 16000); }, 2500);
 
    console.log("%c🥚 Happy Easter! 🌸", "font-size:15px; color:#ff69b4; font-weight:bold;");
  }
 
  run();
})();
/* ── End Easter  code ── */


/* ── Start Halloween  code ── */
(function () {
 
  var now = new Date();
  var isHalloween = now.getMonth() === 9 && now.getDate() === 31;
  // var isHalloween = true; // ← TEST MODE
  if (!isHalloween) return;
 
  /* ── Styles ──────────────────────────────────────────────── */
  var style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Josefin+Sans:wght@300;600&display=swap');
 
    * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🕷️%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
    #hw-overlay {
      position: fixed; inset: 0;
      background: rgba(10, 5, 20, 0.72);
      pointer-events: none; z-index: 89990;
      mix-blend-mode: multiply;
    }
 
    h1, h2, h3 {
      font-family: 'Creepster', cursive !important;
      color: #ff6a00 !important;
      text-shadow: 0 0 12px rgba(255,106,0,0.7), 0 0 30px rgba(255,50,0,0.4) !important;
      animation: hwFlicker 6s ease-in-out infinite !important;
    }
 
    @keyframes hwFlicker {
      0%,100% { opacity: 1; }
      92%  { opacity: 1; }
      93%  { opacity: 0.2; }
      94%  { opacity: 1; }
      96%  { opacity: 0.4; }
      97%  { opacity: 1; }
    }
 
    #hw-canvas {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none; z-index: 89991;
    }
 
    .hw-spider {
      position: fixed; top: 0;
      font-size: 24px;
      pointer-events: none;
      z-index: 89992;
      animation: hwSpiderDrop linear forwards;
    }
 
    @keyframes hwSpiderDrop {
      0%   { transform: translateY(-30px); opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateY(110vh); opacity: 0; }
    }
 
    #hw-footer {
      position: fixed; bottom: 0; left: 0; right: 0;
      height: 52px;
      background: #0a0514;
      display: flex; align-items: flex-end; justify-content: space-around;
      padding: 0 10px;
      z-index: 89993;
      border-top: 2px solid #ff6a00;
      box-shadow: 0 -4px 20px rgba(255,106,0,0.25);
      font-size: 32px;
      overflow: hidden;
    }
 
    #hw-toast {
      position: fixed; top: 24px; right: 24px;
      background: #1a0a2e;
      border: 2px solid #ff6a00;
      border-radius: 6px;
      padding: 14px 20px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 14px; font-weight: 300;
      color: #ffd580;
      z-index: 89997;
      max-width: 290px;
      box-shadow: 0 0 24px rgba(255,106,0,0.4), inset 0 0 12px rgba(255,106,0,0.05);
      transform: translateX(120%);
      transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    #hw-toast.show { transform: translateX(0); }
 
    #hw-jumpscare {
      position: fixed; inset: 0;
      background: #000;
      z-index: 999999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.05s ease;
    }
    #hw-jumpscare.show {
      opacity: 1;
      pointer-events: all;
    }
    #hw-jumpscare-text {
      font-family: 'Creepster', cursive;
      font-size: clamp(60px, 15vw, 140px);
      color: #ff1a00;
      text-shadow: 0 0 40px #ff6a00, 0 0 80px rgba(255,26,0,0.6);
      animation: hwScareIn 0.3s ease forwards;
      transform: scale(0.2);
    }
    @keyframes hwScareIn {
      to { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  document.body.style.paddingBottom = "60px";
 
  /* ── Dark overlay ────────────────────────────────────── */
  var overlay = document.createElement("div");
  overlay.id = "hw-overlay";
  document.body.appendChild(overlay);
 
  /* ── Canvas (bats) ───────────────────────────────────── */
  var canvas = document.createElement("canvas");
  canvas.id = "hw-canvas";
  document.body.appendChild(canvas);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("resize", function () {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
 
  var ctx = canvas.getContext("2d");
  var bats = [];
  for (var i = 0; i < 8; i++) {
    bats.push({
      x:   -80 - Math.random() * 400,
      y:   30 + Math.random() * (window.innerHeight * 0.6),
      spd: 1.2 + Math.random() * 1.8,
      amp: 20 + Math.random() * 30,
      freq: 0.03 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      size: 20 + Math.random() * 14,
      flip: 1
    });
  }
 
  function animateBats() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var t = Date.now() / 1000;
    bats.forEach(function (b) {
      b.x += b.spd;
      var yOff = Math.sin(t * b.freq * 50 + b.phase) * b.amp;
      if (b.x > canvas.width + 60) {
        b.x = -60;
        b.y = 30 + Math.random() * (window.innerHeight * 0.6);
      }
      ctx.save();
      ctx.translate(b.x, b.y + yOff);
      ctx.font = b.size + "px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🦇", 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(animateBats);
  }
  animateBats();
 
  /* ── Spiders drop on click ───────────────────────────── */
  document.addEventListener("click", function (e) {
    var spider = document.createElement("div");
    spider.className = "hw-spider";
    spider.textContent = "🕷️";
    var dur = 3 + Math.random() * 4;
    spider.style.left  = e.clientX + "px";
    spider.style.animationDuration = dur + "s";
    // Thread
    spider.style.borderLeft = "1px dashed rgba(200,200,200,0.4)";
    document.body.appendChild(spider);
    setTimeout(function () { spider.remove(); }, (dur + 0.2) * 1000);
  });
 
  /* ── Spooky organ on load ────────────────────────────── */
  function playOrgan() {
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      // Minor chord: Am (A2 C3 E3)
      [[110, 1.5], [130.81, 1.2], [164.81, 0.9]].forEach(function (pair) {
        var freq = pair[0], gain_v = pair[1] * 0.06;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.type = "sawtooth";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ac.currentTime);
        gain.gain.linearRampToValueAtTime(gain_v, ac.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 4.0);
        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 4.2);
      });
    } catch(e) {}
  }
 
  // Play after first interaction
  document.addEventListener("click", function onFirst() {
    playOrgan();
    document.removeEventListener("click", onFirst);
  }, { once: true });
 
  /* ── Graveyard footer ────────────────────────────────── */
  var footer = document.createElement("div");
  footer.id = "hw-footer";
  footer.innerHTML = "🪦 🎃 🕸️ 🦇 💀 🪦 🕯️ 💀 🕸️ 🎃 🪦 💀 🕸️ 🎃 🕯️ 💀 🪦";
  document.body.appendChild(footer);
 
  /* ── Haunted toasts ──────────────────────────────────── */
  var hwToasts = [
    "👻 Something is watching you scroll...",
    "🕯️ The candles are almost out. Be careful.",
    "💀 You have entered a haunted webpage. There is no escape.",
    "🦇 Count Dracula has logged your IP address.",
    "🎃 The trick OR treat offer has expired. Only tricks remain.",
    "🕸️ Fun fact: You are never more than 3 feet from a spider. Happy browsing.",
    "🌕 The moon is full tonight. Enjoy your evening... if you can.",
  ];
  var hwToastIdx = 0;
 
  function showHwToast() {
    var t = document.getElementById("hw-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "hw-toast";
      document.body.appendChild(t);
    }
    t.textContent = hwToasts[hwToastIdx++ % hwToasts.length];
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 5000);
  }
 
  setTimeout(function () {
    showHwToast();
    setInterval(showHwToast, 20000);
  }, 4000);
 
  /* ── Mild jump scare after 45s idle ─────────────────── */
  var idleTimer;
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(triggerScare, 45000);
  }
  ["mousemove","keydown","scroll","click"].forEach(function (ev) {
    document.addEventListener(ev, resetIdle);
  });
  resetIdle();
 
  var scareTriggered = false;
  function triggerScare() {
    if (scareTriggered) return;
    scareTriggered = true;
    var scare = document.createElement("div");
    scare.id = "hw-jumpscare";
    scare.innerHTML = '<div id="hw-jumpscare-text">BOO!</div>';
    document.body.appendChild(scare);
 
    // Flash
    requestAnimationFrame(function () {
      scare.classList.add("show");
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        var osc = ac.createOscillator();
        var g   = ac.createGain();
        osc.connect(g); g.connect(ac.destination);
        osc.type = "sawtooth"; osc.frequency.value = 80;
        g.gain.setValueAtTime(0.4, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
        osc.start(); osc.stop(ac.currentTime + 0.7);
      } catch(e) {}
    });
 
    setTimeout(function () {
      scare.style.transition = "opacity 0.5s ease";
      scare.style.opacity = "0";
      setTimeout(function () { scare.remove(); }, 600);
    }, 1200);
 
    scare.addEventListener("click", function () { scare.remove(); });
  }
 
  console.log("%c👻 Mwahahaha... you dared to open DevTools on Halloween.",
    "font-family: 'Creepster', cursive; font-size:18px; color:#ff6a00;");
  console.log("%c🕷️ The spiders are watching.", "font-size:13px; color:#888;");
 
})();
/* ── End Halloween  code ── */


/* ── Start Christmas  code ── */
(function () {
 
  var now    = new Date();
  var m      = now.getMonth(); // 0-based
  var d      = now.getDate();
  var isXmas = m === 11 && (d === 24 || d === 25);
  // var isXmas = true; // ← TEST MODE
  if (!isXmas) return;
 
  var isXmasDay = d === 25;
 
  /* ── Styles ──────────────────────────────────────────────── */
  var style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Lato:wght@300;400;700&display=swap');
 
    * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🎅%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
    #xmas-canvas {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none; z-index: 89990;
    }
 
    #xmas-lights {
      position: fixed; top: 0; left: 0; right: 0;
      height: 34px;
      display: flex; align-items: flex-end;
      gap: 0; padding: 0;
      z-index: 89995;
      background: transparent;
      overflow: hidden;
    }
    .xmas-light-wrap {
      display: flex; flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }
    .xmas-wire {
      width: 28px; height: 14px;
      border-bottom: 2px solid #333;
      border-right: 0; border-left: 0;
      border-radius: 0 0 50% 50%;
    }
    .xmas-bulb {
      width: 12px; height: 16px;
      border-radius: 3px 3px 6px 6px;
      position: relative;
      top: -1px;
      animation: xmasBlink 1.5s ease-in-out infinite;
    }
    .xmas-bulb::after {
      content: '';
      position: absolute; top: -4px; left: 3px;
      width: 6px; height: 4px;
      background: #555; border-radius: 2px 2px 0 0;
    }
 
    .xmas-c0 { background: #ff2222; box-shadow: 0 0 10px #ff0000, 0 0 20px rgba(255,0,0,0.5); animation-delay: 0s; }
    .xmas-c1 { background: #22cc22; box-shadow: 0 0 10px #00cc00, 0 0 20px rgba(0,200,0,0.5); animation-delay: 0.3s; }
    .xmas-c2 { background: #ffcc00; box-shadow: 0 0 10px #ffaa00, 0 0 20px rgba(255,180,0,0.5); animation-delay: 0.6s; }
    .xmas-c3 { background: #2277ff; box-shadow: 0 0 10px #0055ff, 0 0 20px rgba(0,100,255,0.5); animation-delay: 0.9s; }
    .xmas-c4 { background: #ff66cc; box-shadow: 0 0 10px #ff00aa, 0 0 20px rgba(255,0,170,0.5); animation-delay: 1.2s; }
 
    @keyframes xmasBlink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.35; }
    }
 
    h1, h2, h3 {
      font-family: 'Mountains of Christmas', cursive !important;
      color: #cc0000 !important;
      text-shadow: 2px 2px 0 #005500 !important;
    }
 
    #xmas-counter {
      position: fixed; bottom: 24px; right: 24px;
      background: linear-gradient(135deg, #cc0000, #006600);
      border: 3px solid #ffcc00;
      border-radius: 16px;
      padding: 16px 22px;
      font-family: 'Mountains of Christmas', cursive;
      font-size: 17px;
      color: #fff;
      z-index: 89996;
      box-shadow: 0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
      text-align: center;
      line-height: 1.5;
    }
 
    #xmas-toast {
      position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: linear-gradient(135deg, #1a4a1a, #4a0a0a);
      border: 2px solid #ffcc00;
      border-radius: 50px;
      padding: 12px 24px;
      font-family: 'Lato', sans-serif;
      font-size: 15px; font-weight: 300;
      color: #ffe599;
      z-index: 89996;
      white-space: nowrap;
      box-shadow: 0 6px 24px rgba(0,0,0,0.4);
      transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.4s ease;
      opacity: 0;
    }
    #xmas-toast.show {
      transform: translateX(-50%) translateY(0); opacity: 1;
    }
 
    #xmas-sleigh {
      position: fixed; top: 12%; right: -200px;
      font-size: 40px;
      pointer-events: none;
      z-index: 89994;
      transition: right 6s cubic-bezier(0.33, 0, 0.66, 1);
      white-space: nowrap;
    }
    #xmas-sleigh.fly { right: 110%; }
  `;
  document.head.appendChild(style);
  document.body.style.paddingTop = "40px";
 
  /* ── Christmas lights ────────────────────────────────── */
  var lightsBar = document.createElement("div");
  lightsBar.id = "xmas-lights";
  var colors = ["c0","c1","c2","c3","c4"];
  var count = Math.ceil(window.innerWidth / 28) + 2;
  for (var i = 0; i < count; i++) {
    var wrap = document.createElement("div");
    wrap.className = "xmas-light-wrap";
    var wire = document.createElement("div");
    wire.className = "xmas-wire";
    var bulb = document.createElement("div");
    bulb.className = "xmas-bulb xmas-" + colors[i % 5];
    wrap.appendChild(wire);
    wrap.appendChild(bulb);
    lightsBar.appendChild(wrap);
  }
  document.body.prepend(lightsBar);
 
  /* ── Snow canvas ─────────────────────────────────────── */
  var canvas = document.createElement("canvas");
  canvas.id = "xmas-canvas";
  document.body.appendChild(canvas);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("resize", function () {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
 
  var ctx = canvas.getContext("2d");
  var flakes = [];
  for (var j = 0; j < 160; j++) {
    flakes.push({
      x:    Math.random() * window.innerWidth,
      y:    Math.random() * window.innerHeight,
      r:    1 + Math.random() * 3.5,
      vy:   0.4 + Math.random() * 1.2,
      vx:   (Math.random() - 0.5) * 0.4,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.5 + Math.random() * 0.5
    });
  }
  var windT = 0;
 
  function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    windT += 0.005;
    var wind = Math.sin(windT) * 0.5;
    flakes.forEach(function (f) {
      f.phase += 0.02;
      f.x += f.vx + wind + Math.sin(f.phase) * 0.3;
      f.y += f.vy;
      if (f.y > canvas.height + 5) { f.y = -5; f.x = Math.random() * canvas.width; }
      if (f.x > canvas.width + 5)  { f.x = -5; }
      if (f.x < -5)                 { f.x = canvas.width + 5; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + f.alpha + ")";
      ctx.fill();
    });
    requestAnimationFrame(animateSnow);
  }
  animateSnow();
 
  /* ── Jingle bells on click ───────────────────────────── */
  function playJingle() {
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      // Simple jingle pattern: E5 E5 E5 (jingle jingle jingle)
      [[659,0],[659,0.18],[659,0.36],[659,0.54],[784,0.72],[523,0.9],[587,1.05],[659,1.25]].forEach(function(p){
        var osc = ac.createOscillator();
        var g   = ac.createGain();
        osc.connect(g); g.connect(ac.destination);
        osc.type = "triangle";
        osc.frequency.value = p[0];
        g.gain.setValueAtTime(0, ac.currentTime + p[1]);
        g.gain.linearRampToValueAtTime(0.12, ac.currentTime + p[1] + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + p[1] + 0.16);
        osc.start(ac.currentTime + p[1]);
        osc.stop(ac.currentTime + p[1] + 0.18);
      });
    } catch(e) {}
  }
 
  document.addEventListener("click", playJingle);
 
  /* ── Counter / greeting ──────────────────────────────── */
  var counter = document.createElement("div");
  counter.id = "xmas-counter";
  counter.innerHTML = isXmasDay
    ? "🎄 Merry Christmas! 🎄<br>✨ Ho ho ho! ✨"
    : "🎅 It's Christmas Eve!<br>🎁 Santa is on his way!";
  document.body.appendChild(counter);
 
  /* ── Santa's sleigh flyby ────────────────────────────── */
  var sleigh = document.createElement("div");
  sleigh.id = "xmas-sleigh";
  sleigh.textContent = "🦌🦌🦌🎅🛷";
  document.body.appendChild(sleigh);
 
  function flySleigh() {
    sleigh.style.right = "-200px";
    sleigh.style.transition = "none";
    setTimeout(function () {
      sleigh.style.transition = "right 7s cubic-bezier(0.25, 0, 0.5, 1)";
      sleigh.classList.add("fly");
      setTimeout(function () {
        sleigh.classList.remove("fly");
      }, 7500);
    }, 100);
  }
 
  setTimeout(flySleigh, 5000);
  setInterval(flySleigh, 45000);
 
  /* ── Toast messages ──────────────────────────────────── */
  var xmasToasts = [
    "🎁 Santa has your wishlist. He's read it twice.",
    "🍪 Don't forget to leave out milk and cookies tonight!",
    "⛄ Fun fact: the average snowman lives just 3 days.",
    "🎄 Deck the halls... and also the rest of this website.",
    "🦌 Rudolph's nose has been scientifically confirmed to emit red light.",
    "🎶 You are now hearing Jingle Bells in your head. You're welcome.",
  ];
  var xmasToastIdx = 0;
 
  function showXmasToast() {
    var t = document.getElementById("xmas-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "xmas-toast";
      document.body.appendChild(t);
    }
    t.textContent = xmasToasts[xmasToastIdx++ % xmasToasts.length];
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 5000);
  }
 
  setTimeout(function () {
    showXmasToast();
    setInterval(showXmasToast, 18000);
  }, 3000);
 
  console.log("%c🎄 Ho Ho Ho! Merry Christmas from your website! 🎅",
    "font-size:16px; color:#cc0000; font-weight:bold;");
  console.log("%c🎁 Fun fact: this console message is the best gift you'll receive today.",
    "font-size:13px; color:#006600;");
 
})();
/* ── End Christmas  code ── */


/* ── Start New Years  code ── */
(function () {
 
  function run() {
    var now  = new Date();
    var m    = now.getMonth();
    var d    = now.getDate();
    var isNYE  = m === 11 && d === 31;
    var isNYD  = m === 0  && d === 1;
    var isActive = isNYE || isNYD;
    // var isActive = true; var isNYE = true; var isNYD = false; // ← TEST NYE
    // var isActive = true; var isNYE = false; var isNYD = true; // ← TEST NYD
    if (!isActive) return;
 
    /* ── Styles ────────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@200;400&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🥂%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      /* Canvas sits behind everything, pointer-events off */
      #ny-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 89990;
      }
 
      h1, h2, h3 {
        color: #f0c040 !important;
        font-family: 'Playfair Display', serif !important;
        text-shadow: 0 0 20px rgba(240,192,64,0.5), 0 2px 4px rgba(0,0,0,0.4) !important;
      }
 
      #ny-banner {
        position: fixed; top: 0; left: 0; right: 0;
        background: rgba(10,8,20,0.92);
        border-bottom: 1px solid rgba(240,192,64,0.5);
        padding: 10px 0; text-align: center;
        font-family: 'Playfair Display', serif;
        font-size: 18px; color: #f0c040;
        letter-spacing: 4px; z-index: 89995;
        text-shadow: 0 0 16px rgba(240,192,64,0.4);
      }
 
      #ny-clock {
        position: fixed; top: 56px; right: 24px;
        background: rgba(10,8,20,0.88);
        border: 1px solid rgba(240,192,64,0.5);
        border-radius: 12px; padding: 16px 24px;
        font-family: 'Raleway', sans-serif; color: #f0c040;
        z-index: 89996; text-align: center;
        box-shadow: 0 0 40px rgba(240,192,64,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
      }
      #ny-clock-label {
        font-size: 11px; font-weight: 200;
        letter-spacing: 3px; text-transform: uppercase;
        color: rgba(240,192,64,0.6); margin-bottom: 6px;
      }
      #ny-clock-time { font-size: 32px; font-weight: 400; letter-spacing: 4px; }
      #ny-clock-sub  {
        font-size: 12px; font-weight: 200;
        letter-spacing: 2px; color: rgba(240,192,64,0.5); margin-top: 4px;
      }
 
      /* Big countdown number — centered, above page content */
      #ny-countdown-overlay {
        position: fixed; inset: 0;
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; z-index: 89997; opacity: 0;
        transition: opacity 0.3s ease;
      }
      #ny-countdown-overlay.show { opacity: 1; }
      #ny-countdown-number {
        font-family: 'Playfair Display', serif;
        font-size: clamp(120px, 28vw, 240px);
        font-weight: 900; color: #f0c040;
        text-shadow: 0 0 60px rgba(240,192,64,0.9), 0 0 120px rgba(240,150,0,0.5);
        animation: nyNumPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards;
        transform: scale(0.3);
      }
      @keyframes nyNumPop { to { transform: scale(1); } }
 
      #ny-marquee {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: rgba(10,8,20,0.9);
        border-top: 1px solid rgba(240,192,64,0.4);
        padding: 10px 0; overflow: hidden; white-space: nowrap;
        font-family: 'Raleway', sans-serif;
        font-size: 14px; font-weight: 200;
        color: #f0c040; letter-spacing: 2px; z-index: 89995;
      }
      #ny-marquee-inner { display: inline-block; animation: nyScroll 26s linear infinite; }
      @keyframes nyScroll {
        0%   { transform: translateX(100vw); }
        100% { transform: translateX(-100%); }
      }
 
      #ny-toast {
        position: fixed; bottom: 48px; left: 50%;
        transform: translateX(-50%) translateY(60px);
        background: rgba(10,8,20,0.92);
        border: 1px solid rgba(240,192,64,0.6);
        border-radius: 8px; padding: 14px 24px;
        font-family: 'Raleway', sans-serif;
        font-size: 14px; color: #f0c040;
        z-index: 89996; white-space: nowrap;
        box-shadow: 0 0 30px rgba(240,192,64,0.15);
        transition: transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.5s ease;
        opacity: 0;
      }
      #ny-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
 
      /* Confetti canvas is separate from fireworks so it never dims the page */
      #ny-confetti {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89989;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "48px";
    document.body.style.paddingBottom = "40px";
 
    /* ── Banner ────────────────────────────────────────────── */
    var banner = document.createElement("div");
    banner.id = "ny-banner";
    banner.textContent = isNYD
      ? "✦  Happy New Year " + now.getFullYear() + "  ✦  Cheers to a brilliant new year  ✦"
      : "✦  New Year's Eve  ✦  " + (now.getFullYear() + 1) + " is almost here  ✦";
    document.body.prepend(banner);
 
    /* ── Fireworks canvas (transparent bg — never fills page) ── */
    var fwCanvas = document.createElement("canvas");
    fwCanvas.id = "ny-canvas";
    document.body.appendChild(fwCanvas);
    fwCanvas.width  = window.innerWidth;
    fwCanvas.height = window.innerHeight;
 
    window.addEventListener("resize", function () {
      fwCanvas.width  = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    });
 
    var fwCtx = fwCanvas.getContext("2d");
    var particles = [];
    var goldColors = ["#f0c040","#fffacd","#c0c0c0","#ffd700","#f8f8ff","#ffa500","#fffacd"];
 
    function explode(x, y) {
      var color = goldColors[Math.floor(Math.random() * goldColors.length)];
      for (var n = 0; n < 70; n++) {
        var ang = (n / 70) * Math.PI * 2;
        var spd = 2 + Math.random() * 4.5;
        particles.push({
          x: x, y: y,
          vx: Math.cos(ang) * spd * (0.7 + Math.random() * 0.6),
          vy: Math.sin(ang) * spd * (0.7 + Math.random() * 0.6),
          alpha: 1, color: color,
          r: 1.5 + Math.random() * 2,
          ttl: 80 + Math.floor(Math.random() * 40)
        });
      }
    }
 
    // Auto-firework interval
    setInterval(function () {
      explode(
        window.innerWidth  * (0.2 + Math.random() * 0.6),
        window.innerHeight * (0.1 + Math.random() * 0.45)
      );
    }, isNYD ? 2200 : 8000);
    setTimeout(function () {
      explode(window.innerWidth * 0.5, window.innerHeight * 0.25);
    }, 600);
 
    document.addEventListener("click", function (e) { explode(e.clientX, e.clientY); });
 
    (function animateFW() {
      // Clear fully each frame — NO semi-transparent fill that dims the page
      fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
 
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.vy += 0.06; p.vx *= 0.98;
        p.x += p.vx; p.y += p.vy;
        p.ttl--;
        p.alpha = Math.max(0, p.ttl / 100);
        if (p.ttl <= 0) { particles.splice(i, 1); continue; }
 
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle   = p.color;
        fwCtx.fill();
      }
      fwCtx.globalAlpha = 1;
      requestAnimationFrame(animateFW);
    })();
 
    /* ── Confetti (gold/silver/black) ───────────────────────── */
    var confCanvas = document.createElement("canvas");
    confCanvas.id = "ny-confetti";
    document.body.appendChild(confCanvas);
    confCanvas.width  = window.innerWidth;
    confCanvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      confCanvas.width = window.innerWidth; confCanvas.height = window.innerHeight;
    });
    var cCtx = confCanvas.getContext("2d");
    var confetti = [];
    var cColors = ["#f0c040","#c0c0c0","#0a0818","#ffd700","#fff","#b8860b"];
    for (var j = 0; j < 80; j++) {
      confetti.push({
        x: Math.random() * window.innerWidth,
        y: -Math.random() * window.innerHeight,
        w: 5 + Math.random()*7, h: 9 + Math.random()*5,
        color: cColors[Math.floor(Math.random()*cColors.length)],
        rot: Math.random()*Math.PI*2, vr: (Math.random()-0.5)*0.12,
        vx: (Math.random()-0.5)*1.5, vy: 0.8 + Math.random()*1.5,
        life: 1
      });
    }
    var cFrames = 0;
    (function animateConf() {
      cFrames++;
      cCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      var alive = false;
      confetti.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > confCanvas.height + 10) {
          if (cFrames < 300) { p.y = -10; p.x = Math.random() * confCanvas.width; }
          else p.life = 0;
        }
        if (p.life > 0) {
          alive = true;
          cCtx.save(); cCtx.globalAlpha = p.life;
          cCtx.fillStyle = p.color;
          cCtx.translate(p.x, p.y); cCtx.rotate(p.rot);
          cCtx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
          cCtx.restore();
        }
      });
      if (alive) requestAnimationFrame(animateConf);
      else confCanvas.remove();
    })();
 
    /* ── NYE countdown clock ────────────────────────────────── */
    if (isNYE) {
      var clockEl = document.createElement("div");
      clockEl.id  = "ny-clock";
      var nextYear = now.getFullYear() + 1;
      var midnight = new Date(nextYear, 0, 1, 0, 0, 0, 0);
      clockEl.innerHTML = `
        <div id="ny-clock-label">countdown to ${nextYear}</div>
        <div id="ny-clock-time">--:--:--</div>
        <div id="ny-clock-sub">✦ &nbsp; ✦ &nbsp; ✦</div>`;
      document.body.appendChild(clockEl);
 
      var cdOverlay = document.createElement("div"); cdOverlay.id = "ny-countdown-overlay";
      cdOverlay.innerHTML = '<div id="ny-countdown-number"></div>';
      document.body.appendChild(cdOverlay);
      var lastCdNum = -1;
 
      function showCdNum(n) {
        if (n === lastCdNum) return;
        lastCdNum = n;
        var el = document.getElementById("ny-countdown-number");
        el.style.animation = "none"; el.offsetHeight;
        el.style.animation = "";
        el.textContent = n > 0 ? n : "🎆";
        cdOverlay.classList.add("show");
        if (n <= 0) setTimeout(function () { cdOverlay.classList.remove("show"); }, 3000);
      }
 
      setInterval(function () {
        var diff = midnight - new Date();
        if (diff <= 0) {
          document.getElementById("ny-clock-time").textContent = "🎆 " + nextYear + "!";
          for (var q = 0; q < 8; q++) setTimeout(function () {
            explode(Math.random()*window.innerWidth, Math.random()*window.innerHeight*0.5);
          }, q * 250);
          playMidnightChime();
          return;
        }
        var h   = Math.floor(diff / 3600000);
        var min = Math.floor((diff % 3600000) / 60000);
        var sec = Math.floor((diff % 60000) / 1000);
        document.getElementById("ny-clock-time").textContent =
          String(h).padStart(2,"0") + ":" + String(min).padStart(2,"0") + ":" + String(sec).padStart(2,"0");
        if (diff < 4000) showCdNum(Math.ceil(diff / 1000));
      }, 1000);
    }
 
    /* ── NYD melody ─────────────────────────────────────────── */
    if (isNYD) {
      var alsBurst = false;
      document.addEventListener("click", function () {
        if (alsBurst) return;
        alsBurst = true;
        playAuld();
        for (var q = 0; q < 5; q++) setTimeout(function () {
          explode(Math.random()*window.innerWidth, Math.random()*window.innerHeight*0.4);
        }, q * 350);
      }, { once: true });
    }
 
    function playAuld() {
      var notes = [[392,0],[392,0.45],[523,0.9],[392,1.35],[523,1.8],[659,2.25],
                   [523,3.15],[523,3.6],[659,4.05],[784,4.5],[698,5.4]];
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        notes.forEach(function (n) {
          var o = ac.createOscillator(), g = ac.createGain();
          o.connect(g); g.connect(ac.destination);
          o.type = "triangle"; o.frequency.value = n[0];
          var t = ac.currentTime + n[1];
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.07, t + 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          o.start(t); o.stop(t + 0.42);
        });
      } catch(e) {}
    }
 
    function playMidnightChime() {
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        for (var i = 0; i < 12; i++) {
          (function(i) {
            var o = ac.createOscillator(), g = ac.createGain();
            o.connect(g); g.connect(ac.destination);
            o.type = "sine"; o.frequency.value = 523;
            var t = ac.currentTime + i * 0.5;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.14, t + 0.05);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
            o.start(t); o.stop(t + 0.85);
          })(i);
        }
      } catch(e) {}
    }
 
    /* ── Marquee ─────────────────────────────────────────────── */
    var marq = document.createElement("div"); marq.id = "ny-marquee";
    var inner = document.createElement("span"); inner.id = "ny-marquee-inner";
    inner.textContent = isNYD
      ? "🥂 Happy New Year! ✦ Wishing you joy, health, and prosperity ✦ 🎆 Cheers to a brilliant new year ✦ 🥂 Happy New Year! ✦ "
      : "✦ New Year's Eve ✦ 🥂 The countdown begins ✦ Make tonight unforgettable ✦ 🎆 One last night of this year ✦ ";
    inner.textContent += inner.textContent; // duplicate for seamless loop
    marq.appendChild(inner);
    document.body.appendChild(marq);
 
    /* ── Toasts ──────────────────────────────────────────────── */
    var nyToasts = isNYD
      ? [
          "🥂 Here's to a spectacular " + now.getFullYear() + "!",
          "🎆 The year is fresh. Anything is possible.",
          "✨ New year, same you — but with better intentions.",
          "🎊 Resolution #1: More confetti.",
        ]
      : [
          "🥂 Tonight is your night. Make it count.",
          "⏳ Every second brings you closer to the new year.",
          "🎆 Fireworks are loaded. Click to launch.",
          "✦ The last hours of the year are precious ones.",
        ];
    var nyToastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("ny-toast");
      if (!t) { t = document.createElement("div"); t.id = "ny-toast"; document.body.appendChild(t); }
      t.textContent = nyToasts[nyToastIdx++ % nyToasts.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 5000);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 18000); }, 3500);
 
    console.log("%c🥂 " + (isNYD ? "Happy New Year!" : "Happy New Year's Eve!"),
      "font-family:'Georgia',serif; font-size:18px; color:#f0c040;");
  }
 
  run();
})();
/* ── End New Years  code ── */


/* ── Start St Patricks Day code ── */
(function () {
 
  function run() {
    var now = new Date();
    var isSPD = now.getMonth() === 2 && now.getDate() === 17;
    // var isSPD = true; // ← TEST MODE
    if (!isSPD) return;
 
    /* ── Styles ──────────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Uncial+Antiqua&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🍀%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      #spd-overlay {
        position: fixed; inset: 0;
        background: radial-gradient(ellipse at 50% 0%,
          rgba(0,80,20,0.14) 0%, rgba(0,40,10,0.06) 60%, transparent 100%);
        pointer-events: none; z-index: 89990;
      }
 
      #spd-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89991;
      }
 
      h1, h2, h3 {
        font-family: 'Uncial Antiqua', cursive !important;
        background: linear-gradient(90deg, #1a6b1a, #d4af37, #1a6b1a) !important;
        background-size: 200% auto !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: spdGoldShimmer 3s linear infinite !important;
      }
      @keyframes spdGoldShimmer {
        0%   { background-position: 0% center; }
        100% { background-position: 200% center; }
      }
 
      #spd-banner {
        position: fixed; top: 0; left: 0; right: 0;
        background: #1a5c1a; border-bottom: 3px solid #d4af37;
        padding: 10px 0; text-align: center;
        font-family: 'Uncial Antiqua', cursive;
        font-size: 18px; color: #d4af37;
        z-index: 89995; letter-spacing: 3px;
        box-shadow: 0 3px 16px rgba(0,0,0,0.4);
      }
 
      #spd-leprechaun {
        position: fixed; bottom: 48px; right: -80px;
        font-size: 44px; pointer-events: none; z-index: 89993;
        transition: right 4s cubic-bezier(0.2, 0, 0.8, 1);
      }
      #spd-leprechaun.run { right: 110%; }
 
      #spd-toast {
        position: fixed; bottom: 48px; left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: #0d3d12; border: 2px solid #d4af37;
        border-radius: 50px; padding: 12px 24px;
        font-family: 'Lora', serif;
        font-size: 14px; font-style: italic; color: #d4af37;
        z-index: 89996; white-space: nowrap;
        box-shadow: 0 6px 24px rgba(0,0,0,0.4);
        transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.4s ease;
        opacity: 0;
      }
      #spd-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
 
      #spd-footer {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: #0d2e10; border-top: 2px solid #d4af37;
        padding: 7px 0; text-align: center;
        font-size: 22px; letter-spacing: 5px; z-index: 89993;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "46px";
    document.body.style.paddingBottom = "44px";
 
    /* ── DOM ─────────────────────────────────────────────────── */
    var banner = document.createElement("div"); banner.id = "spd-banner";
    banner.textContent = "☘️  Lá Fhéile Pádraig Sona Duit  —  Happy St. Patrick's Day  ☘️";
    document.body.prepend(banner);
 
    var footer = document.createElement("div"); footer.id = "spd-footer";
    footer.textContent = "🍀 ☘️ 🌈 🏺 🍺 ☘️ 🍀 ☘️ 🌈 🏺 🍺 ☘️ 🍀";
    document.body.appendChild(footer);
 
    var overlay = document.createElement("div"); overlay.id = "spd-overlay";
    document.body.appendChild(overlay);
 
    /* ── Raining shamrocks canvas ────────────────────────────── */
    var canvas = document.createElement("canvas"); canvas.id = "spd-canvas";
    document.body.appendChild(canvas);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    });
 
    var ctx = canvas.getContext("2d");
    var rItems = ["☘️","🍀","🪙","💚","🌿","🍀","☘️"];
    var drops = [];
    for (var i = 0; i < 40; i++) {
      drops.push({
        x:    Math.random() * window.innerWidth,
        y:   -Math.random() * window.innerHeight,
        sym:  rItems[Math.floor(Math.random() * rItems.length)],
        size: 14 + Math.random() * 16,
        vy:   0.5 + Math.random() * 1.0,
        vx:   (Math.random() - 0.5) * 0.6,
        rot:  Math.random() * Math.PI * 2,
        vr:  (Math.random() - 0.5) * 0.05
      });
    }
 
    (function animateDrops() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach(function (f) {
        f.y += f.vy; f.x += f.vx; f.rot += f.vr;
        if (f.y > canvas.height + 20) { f.y = -20; f.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(f.x, f.y); ctx.rotate(f.rot);
        ctx.font = f.size + "px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(f.sym, 0, 0);
        ctx.restore();
      });
      requestAnimationFrame(animateDrops);
    })();
 
    /* ── Irish fiddle chime + burst on click ─────────────────── */
    function playChime() {
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        [[523,0],[659,0.12],[784,0.24],[1047,0.36],[784,0.5],[659,0.62]].forEach(function(n){
          var o = ac.createOscillator(), g = ac.createGain();
          o.connect(g); g.connect(ac.destination);
          o.type = "triangle"; o.frequency.value = n[0];
          var t = ac.currentTime + n[1];
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.09, t + 0.04);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          o.start(t); o.stop(t + 0.12);
        });
      } catch(e) {}
    }
 
    var burstSyms = ["☘️","🍀","🌈","🪙","💚"];
    document.addEventListener("click", function (e) {
      playChime();
      for (var i = 0; i < 8; i++) {
        (function(i) {
          var span = document.createElement("span");
          span.textContent = burstSyms[Math.floor(Math.random() * burstSyms.length)];
          span.style.cssText = "position:fixed;pointer-events:none;z-index:999999;font-size:" +
            (14 + Math.random()*13) + "px;left:" + e.clientX + "px;top:" + e.clientY +
            "px;transition:all 0.7s ease-out;opacity:1;transform:translate(-50%,-50%)";
          document.body.appendChild(span);
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            var ang = (i / 8) * Math.PI * 2, d = 50 + Math.random() * 55;
            span.style.left = (e.clientX + Math.cos(ang)*d) + "px";
            span.style.top  = (e.clientY + Math.sin(ang)*d) + "px";
            span.style.opacity = "0";
          }); });
          setTimeout(function () { span.remove(); }, 800);
        })(i);
      }
    });
 
    /* ── Leprechaun run ──────────────────────────────────────── */
    var lep = document.createElement("div"); lep.id = "spd-leprechaun";
    lep.textContent = "🧙‍♂️";
    document.body.appendChild(lep);
 
    function runLep() {
      lep.style.right = "-80px"; lep.style.transition = "none";
      setTimeout(function () {
        lep.style.transition = "right 4s cubic-bezier(0.2, 0, 0.8, 1)";
        lep.classList.add("run");
        setTimeout(function () { lep.classList.remove("run"); }, 4500);
      }, 60);
    }
    setTimeout(runLep, 6000);
    setInterval(runLep, 35000);
 
    /* ── Rainbow on double-click ─────────────────────────────── */
    document.addEventListener("dblclick", function (e) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
      Object.assign(svg.style, {
        position:"fixed", left:"0", top:"0",
        width:"100%", height:"100%",
        pointerEvents:"none", zIndex:"89992", opacity:"0",
        transition:"opacity 0.5s ease"
      });
      svg.setAttribute("viewBox","0 0 " + window.innerWidth + " " + window.innerHeight);
      ["#FF0000","#FF7700","#FFFF00","#00AA00","#0000FF","#8B00FF"].forEach(function(color,idx){
        var r = 60 + idx * 28;
        var arc = document.createElementNS("http://www.w3.org/2000/svg","path");
        arc.setAttribute("d","M "+(e.clientX-r)+" "+e.clientY+" A "+r+" "+r+" 0 0 1 "+(e.clientX+r)+" "+e.clientY);
        arc.setAttribute("stroke",color); arc.setAttribute("stroke-width","18");
        arc.setAttribute("fill","none"); arc.setAttribute("stroke-opacity","0.7");
        svg.appendChild(arc);
      });
      document.body.appendChild(svg);
      requestAnimationFrame(function () {
        svg.style.opacity = "1";
        setTimeout(function () {
          svg.style.opacity = "0";
          setTimeout(function () { svg.remove(); }, 600);
        }, 2000);
      });
    });
 
    /* ── Irish proverb toasts ────────────────────────────────── */
    var proverbs = [
      "🍀 \"May your troubles be as few as your grandmother's teeth.\"",
      "🍺 \"Here's to a long life and a merry one.\" — Irish toast",
      "☘️ \"May you be in heaven before the devil knows you're dead.\"",
      "🌈 \"Laughter is brightest where food is best.\" — Irish proverb",
      "🪙 \"A good laugh and a long sleep are the two best cures.\"",
      "🍀 Today is the luckiest day of the year. Act accordingly.",
    ];
    var spdToastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("spd-toast");
      if (!t) { t = document.createElement("div"); t.id = "spd-toast"; document.body.appendChild(t); }
      t.textContent = proverbs[spdToastIdx++ % proverbs.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 6000);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 20000); }, 2500);
 
    console.log("%c☘️ Top o' the mornin'! Happy St. Patrick's Day!",
      "font-size:16px; color:#1a6b1a; font-weight:bold;");
  }
 
  run();
})();
/* ── End St Patricks Day code ── */


/* ── Start Valentines  code ── */
(function () {
 
  function run() {
    var now = new Date();
    var isVDay = now.getMonth() === 1 && now.getDate() === 14;
    // var isVDay = true; // ← TEST MODE
    if (!isVDay) return;
 
    /* ── Styles ──────────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Caveat:wght@400;700&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🌹%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      #vday-overlay {
        position: fixed; inset: 0;
        background: radial-gradient(ellipse at 50% 100%,
          rgba(220,20,60,0.09) 0%, rgba(255,105,130,0.05) 50%, transparent 100%);
        pointer-events: none; z-index: 89990;
      }
 
      #vday-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89991;
      }
 
      h1, h2, h3 {
        font-family: 'Cormorant Garamond', serif !important;
        color: #c0143c !important;
        animation: vdayHeartbeat 1.5s ease-in-out infinite !important;
      }
      @keyframes vdayHeartbeat {
        0%,100% { transform: scale(1); }
        14%     { transform: scale(1.05); }
        28%     { transform: scale(1); }
        42%     { transform: scale(1.03); }
        70%     { transform: scale(1); }
      }
 
      /* Love note on click */
      .vday-note {
        position: fixed;
        background: #fff5f7; border: 2px solid #ffb3c1;
        border-radius: 12px 12px 12px 2px;
        padding: 13px 17px;
        font-family: 'Caveat', cursive;
        font-size: 17px; color: #8b1a3a;
        max-width: 200px; pointer-events: none; z-index: 89996;
        box-shadow: 4px 4px 12px rgba(192,20,60,0.15);
        animation: vdayNoteIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) forwards,
                   vdayNoteOut 0.4s ease 2.4s forwards;
        transform: scale(0) rotate(-4deg); transform-origin: bottom left;
      }
      @keyframes vdayNoteIn  { to { transform: scale(1) rotate(-2deg); } }
      @keyframes vdayNoteOut { to { transform: scale(0) rotate(4deg); opacity: 0; } }
 
      /* Love letter panel */
      #vday-letter {
        position: fixed; top: 50%; right: -320px;
        transform: translateY(-50%);
        width: 280px;
        background: linear-gradient(180deg, #fff9fb, #fff0f4);
        border: 2px solid #e8a0b0; border-radius: 4px;
        padding: 26px 26px 22px;
        font-family: 'Caveat', cursive;
        font-size: 16px; color: #6b1030; line-height: 1.8;
        z-index: 89994;
        box-shadow: -8px 8px 40px rgba(0,0,0,0.2);
        transition: right 0.8s cubic-bezier(0.175,0.885,0.32,1.275);
      }
      #vday-letter.open { right: 16px; }
      #vday-letter h4 {
        font-family: 'Cormorant Garamond', serif !important;
        font-size: 19px; color: #c0143c !important;
        margin: 0 0 12px; border-bottom: 1px solid #e8a0b0;
        padding-bottom: 10px;
        animation: none !important;
      }
      #vday-letter-close {
        position: absolute; top: 10px; right: 14px;
        background: none; border: none;
        font-size: 18px; cursor: pointer; color: #c0143c;
      }
 
      #vday-banner {
        position: fixed; top: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #c0143c, #e84068, #c0143c);
        background-size: 200% auto;
        animation: vdayBannerShift 4s ease infinite;
        padding: 10px 0; text-align: center;
        font-family: 'Cormorant Garamond', serif;
        font-size: 17px; color: #fff; letter-spacing: 3px;
        z-index: 89995;
        box-shadow: 0 3px 14px rgba(192,20,60,0.4);
      }
      @keyframes vdayBannerShift {
        0%,100% { background-position: 0% center; }
        50%     { background-position: 100% center; }
      }
 
      #vday-toast {
        position: fixed; top: 56px; left: 50%;
        transform: translateX(-50%) translateY(-70px);
        background: linear-gradient(135deg, #c0143c, #e84068);
        border-radius: 50px; padding: 12px 28px;
        font-family: 'Caveat', cursive;
        font-size: 17px; color: #fff;
        z-index: 89996; white-space: nowrap;
        box-shadow: 0 8px 30px rgba(192,20,60,0.4);
        transition: transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.5s ease;
        opacity: 0;
      }
      #vday-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
 
      #vday-footer {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #c0143c, #e84068, #c0143c);
        background-size: 200% auto;
        animation: vdayBannerShift 4s ease infinite;
        padding: 7px 0; text-align: center;
        font-size: 20px; letter-spacing: 5px; z-index: 89993;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "46px";
    document.body.style.paddingBottom = "40px";
 
    /* ── DOM ─────────────────────────────────────────────────── */
    var banner = document.createElement("div"); banner.id = "vday-banner";
    banner.textContent = "💝  Happy Valentine's Day  •  Spreading love one click at a time  •  🌹";
    document.body.prepend(banner);
 
    var footer = document.createElement("div"); footer.id = "vday-footer";
    footer.textContent = "❤️ 🩷 💕 💖 💗 🌹 💝 ❤️ 🩷 💕 💖 💗 🌹 💝";
    document.body.appendChild(footer);
 
    var overlay = document.createElement("div"); overlay.id = "vday-overlay";
    document.body.appendChild(overlay);
 
    /* ── Floating hearts canvas ──────────────────────────────── */
    var canvas = document.createElement("canvas"); canvas.id = "vday-canvas";
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    });
 
    var ctx = canvas.getContext("2d");
    var heartSyms = ["❤️","🩷","💕","💖","💗","💓","🌹","💝"];
    var hearts = [];
    for (var i = 0; i < 35; i++) {
      hearts.push({
        x:    Math.random() * window.innerWidth,
        y:    window.innerHeight + Math.random() * window.innerHeight,
        sym:  heartSyms[Math.floor(Math.random() * heartSyms.length)],
        size: 14 + Math.random() * 16,
        vy: -(0.4 + Math.random() * 0.9),
        vx:   (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2
      });
    }
 
    (function animateHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(function (h) {
        h.phase += 0.02; h.y += h.vy; h.x += h.vx + Math.sin(h.phase) * 0.4;
        if (h.y < -30) { h.y = canvas.height + 10; h.x = Math.random() * canvas.width; }
        ctx.font = h.size + "px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(h.sym, h.x, h.y);
      });
      requestAnimationFrame(animateHearts);
    })();
 
    /* ── Love notes on click ─────────────────────────────────── */
    var loveNotes = [
      "You had me at 'Hello World' 💻❤️",
      "Are you a 404? Because I can't find anyone like you.",
      "You're the CSS to my HTML. Without you I'm unstyled.",
      "My heart has a memory leak — it's full of you.",
      "You must be made of copper and tellurium, because you're CuTe.",
      "Life without you is like a broken pencil — pointless.",
      "I mustache you a question: be my valentine?",
      "You warm my heart like a fresh hot beverage ☕",
    ];
 
    var harpPlayed = false;
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("#vday-letter")) return;
      if (!harpPlayed) { playHarp(); harpPlayed = true; }
      var note = document.createElement("div");
      note.className = "vday-note";
      note.textContent = loveNotes[Math.floor(Math.random() * loveNotes.length)];
      note.style.left = Math.min(e.clientX + 10, window.innerWidth - 220) + "px";
      note.style.top  = Math.max(e.clientY - 80, 50) + "px";
      document.body.appendChild(note);
      setTimeout(function () { note.remove(); }, 3000);
    });
 
    /* ── Harp glissando ──────────────────────────────────────── */
    function playHarp() {
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        [261,294,330,349,392,440,494,523,587,659].forEach(function (freq, i) {
          var o = ac.createOscillator(), g = ac.createGain();
          o.connect(g); g.connect(ac.destination);
          o.type = "triangle"; o.frequency.value = freq;
          var t = ac.currentTime + i * 0.06;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.07, t + 0.04);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          o.start(t); o.stop(t + 0.52);
        });
      } catch(e) {}
    }
 
    /* ── Love letter ─────────────────────────────────────────── */
    var letter = document.createElement("div"); letter.id = "vday-letter";
    letter.innerHTML = `
      <button id="vday-letter-close">×</button>
      <h4>💌 A Note for You</h4>
      <p>Dearest visitor,</p>
      <p>On this Valentine's Day, you are appreciated more than any stylesheet can express.</p>
      <p>The internet is a better place with you in it. 🌹</p>
      <p>With love,<br><em>Your Faithful Page</em> ♥</p>`;
    document.body.appendChild(letter);
    setTimeout(function () { letter.classList.add("open"); }, 1500);
    document.getElementById("vday-letter-close").addEventListener("click", function () {
      letter.style.right = "-320px";
    });
 
    /* ── Candy heart toasts ──────────────────────────────────── */
    var candyHearts = [
      "💘 BE MINE",
      "💝 TRUE LOVE",
      "💕 KISS ME",
      "🩷 YOU'RE SWEET",
      "❤️ MY PERSON",
      "💖 FOREVER",
      "🌹 SAY YES",
      "💗 FIRST LOVE",
    ];
    var vdayToastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("vday-toast");
      if (!t) { t = document.createElement("div"); t.id = "vday-toast"; document.body.appendChild(t); }
      t.textContent = candyHearts[vdayToastIdx++ % candyHearts.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 3500);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 10000); }, 2000);
 
    console.log("%c💝 Happy Valentine's Day! 🌹", "font-family:Georgia,serif; font-size:15px; color:#c0143c;");
  }
 
  run();
})();
/* ── End Valentines  code ── */


/* ── Start Thanksgiving  code ── */
(function () {
 
  function getThanksgiving(year) {
    var nov1 = new Date(year, 10, 1);
    var first = 1 + ((4 - nov1.getDay() + 7) % 7);
    return new Date(year, 10, first + 21);
  }
 
  function run() {
    var now  = new Date();
    var tday = getThanksgiving(now.getFullYear());
    var isThanksgiving = now.getMonth() === tday.getMonth() && now.getDate() === tday.getDate();
    // var isThanksgiving = true; // ← TEST MODE
    if (!isThanksgiving) return;
 
    /* ── Styles ──────────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Pacifico&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🦃%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      #tg-overlay {
        position: fixed; inset: 0;
        background: linear-gradient(180deg,
          rgba(80,30,5,0.10) 0%, rgba(160,70,10,0.06) 50%, rgba(80,20,5,0.12) 100%);
        pointer-events: none; z-index: 89990;
      }
 
      #tg-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89991;
      }
 
      h1, h2, h3 {
        font-family: 'Pacifico', cursive !important;
        background: linear-gradient(90deg, #8b2500, #d4700a, #8b4513, #d4700a, #8b2500) !important;
        background-size: 300% auto !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: tgWarmShimmer 5s linear infinite !important;
      }
      @keyframes tgWarmShimmer {
        0%   { background-position: 0% center; }
        100% { background-position: 300% center; }
      }
 
      #tg-banner {
        position: fixed; top: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #4a1500, #8b3800, #4a1500);
        border-bottom: 3px solid #d4700a;
        padding: 10px 0; text-align: center;
        font-family: 'Pacifico', cursive;
        font-size: 17px; color: #f5c66e; letter-spacing: 2px;
        z-index: 89995; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      }
 
      /* Thankful note on click */
      .tg-note {
        position: fixed;
        background: linear-gradient(135deg, #fffbf0, #fff3dc);
        border: 2px solid #d4700a; border-radius: 4px 16px 16px 16px;
        padding: 11px 15px;
        font-family: 'Libre Baskerville', serif;
        font-size: 14px; font-style: italic; color: #4a1800;
        max-width: 200px; pointer-events: none; z-index: 89996;
        box-shadow: 3px 3px 12px rgba(80,30,5,0.2);
        animation: tgNoteIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards,
                   tgNoteOut 0.4s ease 2.6s forwards;
        transform: scale(0) rotate(3deg);
      }
      @keyframes tgNoteIn  { to { transform: scale(1) rotate(2deg); } }
      @keyframes tgNoteOut { to { transform: scale(0.8) rotate(-2deg); opacity: 0; } }
 
      /* Turkey runner */
      #tg-turkey {
        position: fixed; bottom: 48px; left: -80px;
        font-size: 44px; pointer-events: none; z-index: 89993;
        transition: left 5s cubic-bezier(0.2, 0.6, 0.8, 1);
      }
      #tg-turkey.run { left: 110%; }
 
      #tg-toast {
        position: fixed; bottom: 48px; left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: linear-gradient(135deg, #4a1500, #6b2a00);
        border: 2px solid #d4700a; border-radius: 50px;
        padding: 12px 24px;
        font-family: 'Libre Baskerville', serif;
        font-size: 14px; font-style: italic; color: #f5c66e;
        z-index: 89994; white-space: nowrap;
        box-shadow: 0 6px 24px rgba(0,0,0,0.4);
        transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.4s ease;
        opacity: 0;
      }
      #tg-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
 
      #tg-footer {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: #2a0c00; border-top: 2px solid #d4700a;
        padding: 7px 0; text-align: center;
        font-size: 20px; letter-spacing: 5px; z-index: 89993;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "46px";
    document.body.style.paddingBottom = "40px";
 
    /* ── DOM ─────────────────────────────────────────────────── */
    var banner = document.createElement("div"); banner.id = "tg-banner";
    banner.textContent = "🦃  Happy Thanksgiving!  •  Giving thanks, one page at a time  •  🍂";
    document.body.prepend(banner);
 
    var footer = document.createElement("div"); footer.id = "tg-footer";
    footer.textContent = "🍂 🦃 🌽 🥧 🍁 🍂 🦃 🌽 🥧 🍁 🍂";
    document.body.appendChild(footer);
 
    var overlay = document.createElement("div"); overlay.id = "tg-overlay";
    document.body.appendChild(overlay);
 
    /* ── Falling leaves canvas ───────────────────────────────── */
    var canvas = document.createElement("canvas"); canvas.id = "tg-canvas";
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    });
 
    var ctx = canvas.getContext("2d");
    var leafSyms = ["🍂","🍁","🍃","🌾","🍂","🍁"];
    var leaves = [];
    for (var i = 0; i < 45; i++) {
      leaves.push({
        x:    Math.random() * window.innerWidth,
        y:   -Math.random() * window.innerHeight,
        sym:  leafSyms[Math.floor(Math.random() * leafSyms.length)],
        size: 14 + Math.random() * 18,
        vy:   0.6 + Math.random() * 1.0,
        vx:   (Math.random() - 0.5) * 1.0,
        rot:  Math.random() * Math.PI * 2,
        vr:  (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2
      });
    }
 
    (function animateLeaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(function (l) {
        l.phase += 0.015; l.y += l.vy; l.x += l.vx + Math.sin(l.phase) * 0.6; l.rot += l.vr;
        if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(l.x, l.y); ctx.rotate(l.rot);
        ctx.font = l.size + "px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(l.sym, 0, 0);
        ctx.restore();
      });
      requestAnimationFrame(animateLeaves);
    })();
 
    /* ── Thankful notes on click ─────────────────────────────── */
    var thankfuls = [
      "Thankful for warm soup 🍲",
      "Grateful for this website 💻",
      "Thankful for autumn leaves 🍁",
      "Grateful for extra pie 🥧",
      "Thankful for cozy blankets 🍂",
      "Grateful for elastic waistbands 🙏",
      "Thankful for leftovers 🦃",
      "Grateful for good company 🫂",
    ];
 
    document.addEventListener("click", function (e) {
      var note = document.createElement("div");
      note.className = "tg-note";
      note.textContent = thankfuls[Math.floor(Math.random() * thankfuls.length)];
      note.style.left = Math.min(e.clientX + 12, window.innerWidth - 220) + "px";
      note.style.top  = Math.max(e.clientY - 70, 50) + "px";
      document.body.appendChild(note);
      setTimeout(function () { note.remove(); }, 3300);
    });
 
    /* ── Turkey run ──────────────────────────────────────────── */
    var turkey = document.createElement("div"); turkey.id = "tg-turkey";
    turkey.textContent = "🦃";
    document.body.appendChild(turkey);
 
    function runTurkey() {
      turkey.style.left = "-80px"; turkey.style.transition = "none";
      setTimeout(function () {
        turkey.style.transition = "left 5s cubic-bezier(0.2, 0.6, 0.8, 1)";
        turkey.classList.add("run");
        setTimeout(function () { turkey.classList.remove("run"); }, 5500);
      }, 60);
    }
    setTimeout(runTurkey, 7000);
    setInterval(runTurkey, 40000);
 
    /* ── Toast messages ──────────────────────────────────────── */
    var tgToasts = [
      "🥧 Fun fact: Americans eat 46 million turkeys on Thanksgiving.",
      "🍁 The first Thanksgiving feast lasted three days.",
      "🛋️ Turkey and tryptophan making you sleepy? It's actually the carbs.",
      "🦃 Ben Franklin wanted the turkey as the national bird.",
      "🌽 Thanksgiving has been a US holiday since Lincoln declared it in 1863.",
      "🙏 Today's reminder: gratitude is the original holiday spirit.",
    ];
    var tgToastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("tg-toast");
      if (!t) { t = document.createElement("div"); t.id = "tg-toast"; document.body.appendChild(t); }
      t.textContent = tgToasts[tgToastIdx++ % tgToasts.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 5500);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 20000); }, 3000);
 
    console.log("%c🦃 Happy Thanksgiving! Grateful for every console.log.",
      "font-family:Georgia,serif; font-size:16px; color:#8b2500;");
  }
 
  run();
})();
/* ── End Thanksgivng  code ── */


/* ── Start July 4th  code ── */
(function () {
 
  function run() {
    var now = new Date();
    var isJuly4 = now.getMonth() === 6 && now.getDate() === 4;
    // var isJuly4 = true; // ← TEST MODE
    if (!isJuly4) return;
 
    /* ── Styles ──────────────────────────────────────────────── */
    var style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Serif+4:wght@300;600&display=swap');
 
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext y='28' font-size='26'%3E🦅%3C/text%3E%3C/svg%3E") 16 16, auto !important; }
 
      /* Both canvases sit behind the page with pointer-events off */
      #j4-fw-canvas, #j4-star-canvas {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 89990;
      }
      #j4-star-canvas { z-index: 89991; }
 
      h1, h2, h3 {
        font-family: 'Bebas Neue', cursive !important;
        letter-spacing: 4px !important;
        background: linear-gradient(180deg,
          #b22234 0%, #b22234 33%,
          #fff    33%, #fff    66%,
          #3c3b6e 66%, #3c3b6e 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }
 
      #j4-banner {
        position: fixed; top: 0; left: 0; right: 0;
        height: 40px; overflow: hidden;
        display: flex; align-items: center; justify-content: center;
        z-index: 89995;
      }
      .j4-bg-stripe {
        position: absolute; top: 0; bottom: 0;
        background: #b22234;
      }
      #j4-banner-text {
        position: relative; z-index: 1;
        font-family: 'Bebas Neue', cursive;
        font-size: 19px; letter-spacing: 5px; color: #fff;
        text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
      }
 
      #j4-ticker {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: #3c3b6e; border-top: 3px solid #b22234;
        padding: 9px 0; overflow: hidden; white-space: nowrap;
        font-family: 'Bebas Neue', cursive;
        font-size: 15px; letter-spacing: 3px; color: #fff;
        z-index: 89995;
      }
      #j4-ticker-inner { display: inline-block; animation: j4Scroll 24s linear infinite; }
      @keyframes j4Scroll {
        0%   { transform: translateX(100vw); }
        100% { transform: translateX(-100%); }
      }
 
      #j4-eagle {
        position: fixed; top: 18%; left: -130px;
        font-size: 48px; pointer-events: none; z-index: 89993;
        transition: left 6.5s cubic-bezier(0.2, 0, 0.7, 1);
      }
      #j4-eagle.fly { left: 115%; }
 
      #j4-toast {
        position: fixed; top: 56px; right: 20px;
        background: #3c3b6e; border: 2px solid #b22234;
        border-radius: 6px; padding: 14px 20px;
        font-family: 'Source Serif 4', serif;
        font-size: 14px; color: #fff;
        z-index: 89996; max-width: 280px;
        box-shadow: 5px 5px 0 #b22234;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
      }
      #j4-toast.show { transform: translateX(0); }
 
      .j4-star-pop {
        position: fixed; pointer-events: none;
        z-index: 89997; font-size: 18px;
        transition: all 0.65s ease-out; opacity: 1;
      }
    `;
    document.head.appendChild(style);
    document.body.style.paddingTop    = "44px";
    document.body.style.paddingBottom = "40px";
 
    /* ── Banner ──────────────────────────────────────────────── */
    var banner = document.createElement("div"); banner.id = "j4-banner";
    for (var s = 0; s < 7; s++) {
      var stripe = document.createElement("div");
      stripe.className = "j4-bg-stripe";
      stripe.style.left  = (s * 14.28) + "%";
      stripe.style.width = "7.14%";
      banner.appendChild(stripe);
    }
    var bText = document.createElement("div"); bText.id = "j4-banner-text";
    bText.textContent = "★  HAPPY 4TH OF JULY  ★  INDEPENDENCE DAY  ★";
    banner.appendChild(bText);
    document.body.prepend(banner);
 
    /* ── Fireworks canvas ────────────────────────────────────── */
    var fwCanvas = document.createElement("canvas"); fwCanvas.id = "j4-fw-canvas";
    document.body.appendChild(fwCanvas);
    fwCanvas.width  = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      fwCanvas.width  = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    });
 
    var fwCtx = fwCanvas.getContext("2d");
    var particles = [];
    var colors = ["#b22234","#fff","#3c3b6e","#ffd700","#ff8888","#aaaaff","#fffacd"];
 
    function explode(x, y) {
      var col = colors[Math.floor(Math.random() * colors.length)];
      for (var n = 0; n < 80; n++) {
        var ang = (n / 80) * Math.PI * 2;
        var spd = 2 + Math.random() * 4.5;
        particles.push({
          x: x, y: y,
          vx: Math.cos(ang) * spd * (0.6 + Math.random() * 0.8),
          vy: Math.sin(ang) * spd * (0.6 + Math.random() * 0.8),
          color: col,
          r: 1.3 + Math.random() * 2,
          ttl: 70 + Math.floor(Math.random() * 40)
        });
      }
    }
 
    setInterval(function () {
      explode(
        window.innerWidth  * (0.15 + Math.random() * 0.7),
        window.innerHeight * (0.08 + Math.random() * 0.45)
      );
    }, 2800);
    setTimeout(function () { explode(window.innerWidth * 0.5, window.innerHeight * 0.28); }, 700);
 
    document.addEventListener("click", function (e) {
      explode(e.clientX, e.clientY);
      playDrum();
      // Star burst at click point
      for (var q = 0; q < 6; q++) {
        (function(q) {
          var sp = document.createElement("div");
          sp.className = "j4-star-pop";
          sp.textContent = ["⭐","✦","★","🌟"][Math.floor(Math.random() * 4)];
          sp.style.left = e.clientX + "px";
          sp.style.top  = e.clientY + "px";
          document.body.appendChild(sp);
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            var ang = (q / 6) * Math.PI * 2;
            sp.style.left    = (e.clientX + Math.cos(ang) * 65) + "px";
            sp.style.top     = (e.clientY + Math.sin(ang) * 65) + "px";
            sp.style.opacity = "0";
            sp.style.transform = "scale(0.3)";
          }); });
          setTimeout(function () { sp.remove(); }, 750);
        })(q);
      }
    });
 
    // Use TTL-based alpha — no fillRect tint that darkens the page
    (function animateFW() {
      fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.vy += 0.07; p.vx *= 0.98;
        p.x += p.vx; p.y += p.vy;
        p.ttl--;
        if (p.ttl <= 0) { particles.splice(i, 1); continue; }
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        fwCtx.globalAlpha = p.ttl / 100;
        fwCtx.fillStyle   = p.color;
        fwCtx.fill();
      }
      fwCtx.globalAlpha = 1;
      requestAnimationFrame(animateFW);
    })();
 
    /* ── Falling stars canvas ────────────────────────────────── */
    var stCanvas = document.createElement("canvas"); stCanvas.id = "j4-star-canvas";
    document.body.appendChild(stCanvas);
    stCanvas.width  = window.innerWidth;
    stCanvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      stCanvas.width = window.innerWidth; stCanvas.height = window.innerHeight;
    });
    var stCtx = stCanvas.getContext("2d");
    var stars = [];
    for (var i = 0; i < 40; i++) {
      stars.push({
        x:    Math.random() * window.innerWidth,
        y:   -Math.random() * window.innerHeight,
        size: 8 + Math.random() * 8,
        vy:   0.4 + Math.random() * 0.8,
        vx:   (Math.random() - 0.5) * 0.5,
        rot:  Math.random() * Math.PI * 2,
        vr:  (Math.random() - 0.5) * 0.05,
        color: ["#fff","#fff","#b22234","#ffd700"][Math.floor(Math.random() * 4)]
      });
    }
 
    function drawStar(cx, cy, r, color, alpha) {
      stCtx.save();
      stCtx.globalAlpha = alpha;
      stCtx.beginPath();
      for (var n = 0; n < 5; n++) {
        var a = (n * 4 * Math.PI / 5) - Math.PI / 2;
        var b = a + 2 * Math.PI / 5;
        stCtx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        stCtx.lineTo(cx + r * 0.4 * Math.cos(b), cy + r * 0.4 * Math.sin(b));
      }
      stCtx.closePath();
      stCtx.fillStyle = color;
      stCtx.fill();
      stCtx.restore();
    }
 
    (function animateStars() {
      stCtx.clearRect(0, 0, stCanvas.width, stCanvas.height);
      stars.forEach(function (s) {
        s.y += s.vy; s.x += s.vx; s.rot += s.vr;
        if (s.y > stCanvas.height + 20) { s.y = -20; s.x = Math.random() * stCanvas.width; }
        stCtx.save();
        stCtx.translate(s.x, s.y); stCtx.rotate(s.rot);
        drawStar(0, 0, s.size, s.color, 0.75);
        stCtx.restore();
      });
      requestAnimationFrame(animateStars);
    })();
 
    /* ── Drum sound ──────────────────────────────────────────── */
    function playDrum() {
      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        var buf = ac.createBuffer(1, ac.sampleRate * 0.18, ac.sampleRate);
        var data = buf.getChannelData(0);
        for (var n = 0; n < data.length; n++) {
          data[n] = (Math.random() * 2 - 1) * Math.exp(-n / (ac.sampleRate * 0.04));
        }
        var src = ac.createBufferSource(), g = ac.createGain();
        src.buffer = buf; src.connect(g); g.connect(ac.destination);
        g.gain.value = 0.28; src.start();
      } catch(e) {}
    }
 
    /* ── Eagle flyby ─────────────────────────────────────────── */
    var eagle = document.createElement("div"); eagle.id = "j4-eagle";
    eagle.textContent = "🦅";
    document.body.appendChild(eagle);
 
    function flyEagle() {
      eagle.style.left = "-130px"; eagle.style.transition = "none";
      setTimeout(function () {
        eagle.style.transition = "left 6.5s cubic-bezier(0.2, 0, 0.7, 1)";
        eagle.classList.add("fly");
        setTimeout(function () { eagle.classList.remove("fly"); }, 7000);
      }, 60);
    }
    setTimeout(flyEagle, 4000);
    setInterval(flyEagle, 38000);
 
    /* ── Ticker ──────────────────────────────────────────────── */
    var ticker = document.createElement("div"); ticker.id = "j4-ticker";
    var tInner = document.createElement("span"); tInner.id = "j4-ticker-inner";
    tInner.textContent = "★  HAPPY 4TH OF JULY  ★  INDEPENDENCE DAY 1776  ★  LAND OF THE FREE  ★  HOME OF THE BRAVE  ★  GOD BLESS AMERICA  ★  ";
    tInner.textContent += tInner.textContent;
    ticker.appendChild(tInner);
    document.body.appendChild(ticker);
 
    /* ── Trivia toasts ───────────────────────────────────────── */
    var toasts = [
      "🇺🇸 The Declaration was adopted on July 4, 1776 — click to launch fireworks!",
      "🎆 The US spends ~$1 billion on fireworks every 4th of July.",
      "🌭 Americans eat 150 million hot dogs on Independence Day.",
      "🦅 The bald eagle became the national bird in 1782.",
      "🔔 The Liberty Bell last rang on July 4, 1846.",
      "🎇 John Adams predicted illuminations — he was right.",
    ];
    var toastIdx = 0;
 
    function showToast() {
      var t = document.getElementById("j4-toast");
      if (!t) { t = document.createElement("div"); t.id = "j4-toast"; document.body.appendChild(t); }
      t.textContent = toasts[toastIdx++ % toasts.length];
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(function () { t.classList.remove("show"); }, 6000);
    }
    setTimeout(function () { showToast(); setInterval(showToast, 18000); }, 3000);
 
    console.log("%c🇺🇸 Happy Independence Day! Land of the free, home of the developer.",
      "font-family:Georgia,serif; font-size:15px; color:#b22234; font-weight:bold;");
  }
 
  run();
})();
/* ── End July 4th  code ── */