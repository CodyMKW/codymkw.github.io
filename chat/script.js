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

    const isValidImageUrl = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    const saveSettings = async () => {
        const newUsername = usernameInput.value || "Anonymous";
        const newAvatar = avatarInput.value || "https://i.ibb.co/gynZfsZ/user.webp";
        const isAvatarValid = await isValidImageUrl(newAvatar);

        if (!isAvatarValid) {
            alert("Invalid avatar URL. Please provide a valid image URL.");
            return;
        }

        if (newUsername !== currentUsername) {
            broadcastSystemMessage(`${currentUsername} changed name to ${newUsername}`, true);
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
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${id}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
        if (connectPeerId) {
            connectToPeer(connectPeerId);
        }
    });

    const connections = {};

    const connectToPeer = (id) => {
        if (connections[id]) return;
        const conn = peer.connect(id);
        connections[id] = conn;

        conn.on("open", () => {
            console.log(`Connected to ${id}`);
            broadcastSystemMessage(`${currentUsername} joined chat`);

            conn.on("data", (data) => {
                handleIncomingData(id, data);
            });

            conn.on("close", () => {
                handlePeerDisconnect(id);
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });

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
            <img src="${avatar}" alt="Avatar" onerror="this.onerror=null;this.src='https://i.ibb.co/gynZfsZ/user.webp';">
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

    const broadcastSystemMessage = (message, usernameUpdate = false) => {
        addSystemMessage(message);
        Object.values(connections).forEach(conn => {
            conn.send({ type: "system", message });
            if (usernameUpdate) {
                conn.send({ type: "updateUsername", newUsername: currentUsername });
            }
        });
    };

    const updateUserList = () => {
        userListElement.innerHTML = '';
        const selfLi = document.createElement('li');
        selfLi.textContent = currentUsername;
        userListElement.appendChild(selfLi);
        userMap.forEach((username, id) => {
            const li = document.createElement('li');
            li.textContent = username || "Anonymous";
            userListElement.appendChild(li);
        });
    };

    const handleIncomingData = (id, data) => {
        if (data.type === "message") {
            addMessage(data.username, data.avatar, data.message, data.timestamp);
        } else if (data.type === "system") {
            addSystemMessage(data.message);
        } else if (data.type === "userInfo") {
            userMap.set(id, data.username || "Anonymous");
            updateUserList();
        } else if (data.type === "updateUsername") {
            userMap.set(id, data.newUsername || "Anonymous");
            updateUserList();
            Object.values(connections).forEach(conn => {
                if (conn.peer !== id) {
                    conn.send({ type: "updateUsername", newUsername: data.newUsername });
                }
            });
        }
    };

    const handlePeerDisconnect = (id) => {
        broadcastSystemMessage(`${userMap.get(id) || 'Anonymous'} left chat`);
        delete connections[id];
        userMap.delete(id);
        updateUserList();
    };

    peer.on("connection", (conn) => {
        const id = conn.peer;
        connections[id] = conn;

        conn.on("open", () => {
            broadcastSystemMessage(`${currentUsername} joined chat`);

            conn.on("data", (data) => {
                handleIncomingData(id, data);
            });

            conn.on("close", () => {
                handlePeerDisconnect(id);
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

            sendButton.addEventListener("click", () => sendMessage(conn));
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") sendMessage(conn);
            });

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
