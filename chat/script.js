document.addEventListener("DOMContentLoaded", () => {
    const peer = new Peer();
    const urlParams = new URLSearchParams(window.location.search);
    const connectPeerId = urlParams.get("id");

    const usernameInput = document.getElementById("username");
    const avatarInput = document.getElementById("avatar");
    const saveSettingsButton = document.getElementById("saveSettings");
    const peerIdInput = document.getElementById("peerIdInput");
    const connectButton = document.getElementById("connectButton");
    const peerIdDisplay = document.getElementById("peerIdDisplay");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatBox = document.getElementById("chat");

    let currentUsername = localStorage.getItem("username") || "Anonymous";
    let currentAvatar = localStorage.getItem("avatar") || "https://i.ibb.co/gynZfsZ/user.webp";

    // Load settings from localStorage
    usernameInput.value = currentUsername;
    avatarInput.value = currentAvatar;

    const saveSettings = () => {
        const newUsername = usernameInput.value || "Anonymous";
        const newAvatar = avatarInput.value || "https://i.ibb.co/gynZfsZ/user.webp";

        if (newUsername !== currentUsername) {
            broadcastSystemMessage(`${currentUsername} changed name to ${newUsername}`);
            currentUsername = newUsername;
        }

        if (newAvatar !== currentAvatar) {
            broadcastSystemMessage(`${currentUsername} changed their avatar`);
            currentAvatar = newAvatar;
        }

        localStorage.setItem("username", currentUsername);
        localStorage.setItem("avatar", currentAvatar);
    };

    saveSettingsButton.addEventListener("click", saveSettings);

    peer.on("open", (id) => {
        peerIdDisplay.textContent = id;
        // Update URL with Peer ID
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${id}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
        if (connectPeerId) {
            connectToPeer(connectPeerId);
        }
    });

    const connections = {};

    const connectToPeer = (id) => {
        if (connections[id]) return; // Avoid duplicate connections
        const conn = peer.connect(id);
        connections[id] = conn;

        conn.on("open", () => {
            console.log(`Connected to ${id}`);
            broadcastSystemMessage(`${currentUsername} joined chat`);

            conn.on("data", (data) => {
                console.log("Received data:", data);
                if (data.type === "message") {
                    addMessage(data.username, data.avatar, data.message, data.timestamp);
                } else if (data.type === "system") {
                    addSystemMessage(data.message);
                }
            });

            conn.on("close", () => {
                console.log(`Connection to ${id} closed`);
                broadcastSystemMessage(`${currentUsername} left chat`);
                delete connections[id];
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });
        });
    };

    connectButton.addEventListener("click", () => {
        const id = peerIdInput.value;
        connectToPeer(id);
    });

    const sendMessage = (conn) => {
        const message = messageInput.value;
        if (!message) return;

        const data = {
            type: "message",
            username: currentUsername,
            avatar: currentAvatar,
            message,
            timestamp: new Date().toLocaleTimeString()
        };
        console.log("Sending data:", data);
        conn.send(data);
        addMessage(currentUsername, currentAvatar, message, data.timestamp);
        messageInput.value = "";
    };

    const addMessage = (username, avatar, message, timestamp) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        messageElement.innerHTML = `
            <img src="${avatar}" alt="Avatar">
            <div class="content">
                <div class="username">${username}</div>
                <div class="text">${message}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
        `;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const addSystemMessage = (message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("system-message");
        messageElement.textContent = message;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const broadcastSystemMessage = (message) => {
        addSystemMessage(message);
        // Send system message to all connected peers
        Object.values(connections).forEach(conn => {
            conn.send({ type: "system", message });
        });
    };

    // Handle incoming connections
    peer.on("connection", (conn) => {
        const id = conn.peer;
        connections[id] = conn;

        conn.on("open", () => {
            console.log("Incoming connection from", conn.peer);
            broadcastSystemMessage(`${currentUsername} joined chat`);

            conn.on("data", (data) => {
                console.log("Received data:", data);
                if (data.type === "message") {
                    addMessage(data.username, data.avatar, data.message, data.timestamp);
                } else if (data.type === "system") {
                    addSystemMessage(data.message);
                }
            });

            conn.on("close", () => {
                console.log(`Connection to ${id} closed`);
                broadcastSystemMessage(`${currentUsername} left chat`);
                delete connections[id];
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });
        });
    });

    peer.on("error", (err) => {
        console.error("Peer error:", err);
    });
});
