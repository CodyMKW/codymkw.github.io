document.addEventListener("DOMContentLoaded", async () => {
    let points = parseInt(localStorage.getItem("userPoints")) || 0;
    let ownedFlairs = JSON.parse(localStorage.getItem("ownedFlairs")) || [];
    let redeemedCodes = JSON.parse(localStorage.getItem("redeemedCodes")) || [];
    
    const pointsDisplay = document.getElementById("points-display");
    const checkboxes = document.querySelectorAll("#flair-options input[type='checkbox']");
    const message = document.getElementById("flair-message");
    const message2 = document.getElementById("flair-message2");
    const promoInput = document.getElementById("promo-input");
    const redeemButton = document.getElementById("redeem-button");
    const promoMessage = document.getElementById("promo-message");

    pointsDisplay.textContent = points;

    function savePoints() {
        localStorage.setItem("userPoints", points);
        pointsDisplay.textContent = points;
    }

    function saveFlairs() {
        localStorage.setItem("ownedFlairs", JSON.stringify(ownedFlairs));
    }

    async function getEventBonus() {
        try {
            const response = await fetch("https://api.npoint.io/0cd5a97ecc2b0d608505"); // Update with actual URL
            const data = await response.json();
            const now = new Date();
            let activeEvent = null;

            for (let event of data.events) {
                let start = new Date(event.start.replace(" ", "T"));
                let end = new Date(event.end.replace(" ", "T"));

                if (now >= start && now <= end) {
                    activeEvent = event;
                    break;
                }
            }

            if (activeEvent) {
                document.getElementById("event-message").style.display = "block";
                document.getElementById("event-text").textContent = `🔥 Event Active: ${activeEvent.name}! Earn ${activeEvent.pointsPerMinute} points per minute! 🔥`;
                return activeEvent.pointsPerMinute;
            } else {
                document.getElementById("event-message").style.display = "none";
            }
        } catch (error) {
            console.error("Failed to fetch event data:", error);
        }
        return 3; // Default points per minute
    }

    let pointsPerMinute = await getEventBonus();

    setInterval(async () => {
        pointsPerMinute = await getEventBonus();
        points += pointsPerMinute;
        savePoints();
    }, 60000);

    checkboxes.forEach(checkbox => {
        const label = checkbox.parentElement;
        const cost = parseInt(label.getAttribute("data-cost"));
        const flair = checkbox.value;

        if (ownedFlairs.includes(flair)) {
            checkbox.disabled = false;
            label.style.color = "gold";
        } else {
            checkbox.disabled = true;
        }

        label.addEventListener("click", () => {
            if (!ownedFlairs.includes(flair) && points >= cost) {
                points -= cost;
                ownedFlairs.push(flair);
                checkbox.disabled = false;
                label.style.color = "gold";
                savePoints();
                saveFlairs();
            } else if (!ownedFlairs.includes(flair)) {
                message2.style.display = "block";
                setTimeout(() => message2.style.display = "none", 2000);
            }
        });

        checkbox.addEventListener("change", function () {
            checkboxes.forEach(cb => cb.checked = false);
            this.checked = true;
            chattable.setFlair(this.value);
            message.style.display = "block";
            setTimeout(() => message.style.display = "none", 2000);
        });
    });

    // PROMO CODE HANDLING
    async function getPromoData() {
        try {
            const response = await fetch("https://api.npoint.io/0cd5a97ecc2b0d608505"); // Update with actual JSON URL
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch promo data:", error);
            return { promoCodes: {} };
        }
    }

    redeemButton.addEventListener("click", async () => {
        const promoCode = promoInput.value.trim().toUpperCase();
        const promoData = await getPromoData();

        if (!promoCode) {
            promoMessage.textContent = "⚠️ Please enter a promo code!";
            promoMessage.style.color = "red";
        } else if (redeemedCodes.includes(promoCode)) {
            promoMessage.textContent = "❌ You have already redeemed this promo code!";
            promoMessage.style.color = "red";
        } else if (promoData.promoCodes && promoData.promoCodes[promoCode]) {
            let bonusPoints = promoData.promoCodes[promoCode].points;
            points += bonusPoints;
            redeemedCodes.push(promoCode);
            savePoints();
            localStorage.setItem("redeemedCodes", JSON.stringify(redeemedCodes));
            promoMessage.textContent = `✅ Success! You earned ${bonusPoints} points.`;
            promoMessage.style.color = "green";
        } else {
            promoMessage.textContent = "⚠️ Invalid promo code!";
            promoMessage.style.color = "red";
        }

        promoMessage.style.display = "block";
        setTimeout(() => { promoMessage.style.display = "none"; }, 3000);
    });
});
document.getElementById("remove-flair").addEventListener("click", (e) => {
    const removeflairmessage = document.getElementById("remove-flair-message");
    e.preventDefault();
    chattable.setFlair("none");
    removeflairmessage.style.display = "block";
    setTimeout(() => removeflairmessage.style.display = "none", 2000);
});