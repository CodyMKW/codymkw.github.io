document.addEventListener("DOMContentLoaded", () => {
    const peer = new Peer();
    const urlParams = new URLSearchParams(window.location.search);
    const connectPeerId = urlParams.get("id");

    const usernameInput = document.getElementById("username");
    const avatarInput = document.getElementById("avatar");
    const saveSettingsButton = document.getElementById("saveSettings");
    const peerIdInput = document.getElementById("peerIdInput");
    const connectButton = document.getElementById("connectButton");
    const disconnectButton = document.getElementById("disconnectButton");
    const peerIdDisplay = document.getElementById("peerIdDisplay");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatBox = document.getElementById("chat");
    const userListElement = document.getElementById("userList");

    let currentUsername = localStorage.getItem("username") || "Anonymous";
    let currentAvatar = localStorage.getItem("avatar") || "https://i.ibb.co/gynZfsZ/user.webp";

    const userMap = new Map();

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

        updateUserList();
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
                if (data.type === "message") {
                    addMessage(data.username, data.avatar, data.message, data.timestamp);
                } else if (data.type === "system") {
                    addSystemMessage(data.message);
                } else if (data.type === "userInfo") {
                    userMap.set(id, data.username || "Anonymous");
                    updateUserList();
                }
            });

            conn.on("close", () => {
                broadcastSystemMessage(`${userMap.get(id) || 'Anonymous'} left chat`);
                delete connections[id];
                userMap.delete(id);
                updateUserList();
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });

            // Send user info to the connected peer
            conn.send({
                type: "userInfo",
                username: currentUsername,
                avatar: currentAvatar,
            });
        });
    };

    connectButton.addEventListener("click", () => {
        const id = peerIdInput.value;
        connectToPeer(id);
    });

    disconnectButton.addEventListener("click", () => {
        Object.values(connections).forEach(conn => conn.close());
        userMap.clear();
        updateUserList();
        broadcastSystemMessage(`${currentUsername} left chat`);
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
            <div class="header">
                <div class="username">${username}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
            <div class="text">${message}</div>
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

    const updateUserList = () => {
        userListElement.innerHTML = '';
        userMap.forEach((username, id) => {
            const li = document.createElement('li');
            li.textContent = username || "Anonymous";
            userListElement.appendChild(li);
        });
    };

    // Handle incoming connections
    peer.on("connection", (conn) => {
        const id = conn.peer;
        connections[id] = conn;

        conn.on("open", () => {
            broadcastSystemMessage(`${currentUsername} joined chat`);

            conn.on("data", (data) => {
                if (data.type === "message") {
                    addMessage(data.username, data.avatar, data.message, data.timestamp);
                } else if (data.type === "system") {
                    addSystemMessage(data.message);
                } else if (data.type === "userInfo") {
                    userMap.set(id, data.username || "Anonymous");
                    updateUserList();
                }
            });

            conn.on("close", () => {
                broadcastSystemMessage(`${userMap.get(id) || 'Anonymous'} left chat`);
                delete connections[id];
                userMap.delete(id);
                updateUserList();
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });

            // Send user info to the connected peer
            conn.send({
                type: "userInfo",
                username: currentUsername,
                avatar: currentAvatar,
            });
        });
    });

    peer.on("error", (err) => {
        console.error("Peer error:", err);
    });
});
