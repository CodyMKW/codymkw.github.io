let flairPrices = {};
let flairDataMap = {};
const currencyName = "$"; // Update this to change the currency display

function formatCurrency(cents) {
    return `${currencyName}${(cents / 100).toFixed(2)}`;
}

async function fetchFlairData() {
    try {
        const response = await fetch("https://api.npoint.io/0cd5a97ecc2b0d608505");
        const data = await response.json();
        if (data.flairs) {
            data.flairs.forEach(f => {
                flairPrices[f.value] = f.cost; // cost is now in cents
                flairDataMap[f.value] = f;
            });
        }
        return data;
    } catch (error) {
        console.error("Failed to fetch flair data:", error);
        return {};
    }
}

async function initFlairShop() {
    let points = parseInt(localStorage.getItem("userPoints")) || 0;
    let ownedFlairs = JSON.parse(localStorage.getItem("ownedFlairs")) || [];
    let redeemedCodes = JSON.parse(localStorage.getItem("redeemedCodes")) || [];

    const pointsDisplay = document.getElementById("points-display");
    const flairOptions = document.getElementById("flair-options");
    const message = document.getElementById("flair-message");
    const message2 = document.getElementById("flair-message2");
    const promoInput = document.getElementById("promo-input");
    const redeemButton = document.getElementById("redeem-button");
    const promoMessage = document.getElementById("promo-message");

    function savePoints() {
        localStorage.setItem("userPoints", points);
        pointsDisplay.textContent = formatCurrency(points);
    }

    function saveFlairs() {
        localStorage.setItem("ownedFlairs", JSON.stringify(ownedFlairs));
    }

    async function getEventBonus() {
        try {
            const response = await fetch("https://api.npoint.io/0cd5a97ecc2b0d608505");
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
                document.getElementById("event-text").textContent = `🔥 Event Active: ${activeEvent.name}! Earn ${formatCurrency(activeEvent.pointsPerMinute)} per 3 minutes! 🔥`;
                return activeEvent.pointsPerMinute;
            } else {
                document.getElementById("event-message").style.display = "none";
            }
        } catch (error) {
            console.error("Failed to fetch event data:", error);
        }
        return 100; // default: 100 cents = $1.00 per minute
    }

    let pointsPerMinute = await getEventBonus();

    setInterval(async () => {
        pointsPerMinute = await getEventBonus();
        points += pointsPerMinute;
        savePoints();
    }, 180000); // 3 minutes

    await fetchFlairData();

    const checkboxes = flairOptions.querySelectorAll("input[type='checkbox']");
    const defaultTariffReason = [
        "📈 Price adjusted due to tariffs imposed by Princess Peach"
    ];

    checkboxes.forEach(checkbox => {
        const label = checkbox.parentElement;
        const flair = checkbox.value;
        let cost = flairPrices[flair] || 0;
        const flairData = flairDataMap[flair];
        let originalCost = cost;

        if (flairData && flairData.tariff) {
            const { type, amount } = flairData.tariff;
            if (type === "percent") {
                cost += Math.ceil(cost * (amount / 100));
            } else if (type === "flat") {
                cost += amount;
            }

            label.classList.add("tariffed");
            const tooltip = flairData.tariff.tooltip || defaultTariffReason[Math.floor(Math.random() * defaultTariffReason.length)];
            label.title = tooltip;
        }

        const costText = label.querySelector(".cost-text");
        if (costText) {
            if (ownedFlairs.includes(flair)) {
                costText.textContent = "Purchased";
                label.classList.add("purchased");
            } else if (flairData && flairData.tariff) {
                costText.innerHTML = `<span style="text-decoration: line-through; opacity: 0.6;">${formatCurrency(originalCost)}</span> → <strong>${formatCurrency(cost)}</strong>`;
            } else {
                costText.textContent = formatCurrency(cost);
            }
        }

        label.addEventListener("click", () => {
            if (!ownedFlairs.includes(flair) && points >= cost) {
                points -= cost;
                ownedFlairs.push(flair);
                checkbox.disabled = false;
                label.classList.add("purchased");
                if (costText) costText.textContent = "Purchased";
                savePoints();
                saveFlairs();
            } else if (!ownedFlairs.includes(flair)) {
                message2.style.display = "block";
                setTimeout(() => message2.style.display = "none", 2000);
            }
        });

        checkbox.addEventListener("change", function () {
            if (!ownedFlairs.includes(this.value)) {
                this.checked = false;
                message2.style.display = "block";
                setTimeout(() => message2.style.display = "none", 2000);
                return;
            }

            checkboxes.forEach(cb => cb.checked = false);
            this.checked = true;
            chattable.setFlair(this.value);
            message.style.display = "block";
            setTimeout(() => message.style.display = "none", 2000);
        });
    });

    redeemButton.addEventListener("click", async () => {
        const promoCode = promoInput.value.trim();
        const promoData = await fetchFlairData();

        if (!promoCode) {
            promoMessage.textContent = "⚠️ Please enter a promo code!";
            promoMessage.style.color = "red";
        } else if (redeemedCodes.includes(promoCode)) {
            promoMessage.textContent = "❌ You have already redeemed this promo code!";
            promoMessage.style.color = "red";
        } else if (promoData.promoCodes && promoData.promoCodes[promoCode]) {
            let promoDetails = promoData.promoCodes[promoCode];
            let bonusPoints = promoDetails.points; // should be in cents
            let expirationDate = new Date(promoDetails.expires.replace(" ", "T"));
            let now = new Date();

            if (now > expirationDate) {
                promoMessage.textContent = "⏳ This promo code has expired!";
                promoMessage.style.color = "red";
            } else {
                points += bonusPoints;
                redeemedCodes.push(promoCode);
                savePoints();
                localStorage.setItem("redeemedCodes", JSON.stringify(redeemedCodes));
                promoMessage.textContent = `✅ Success! You earned ${formatCurrency(bonusPoints)}.`;
                promoMessage.style.color = "green";
            }
        } else {
            promoMessage.textContent = "⚠️ Invalid promo code!";
            promoMessage.style.color = "red";
        }

        promoMessage.style.display = "block";
        setTimeout(() => { promoMessage.style.display = "none"; }, 3000);
    });

    pointsDisplay.textContent = formatCurrency(points);
}

document.addEventListener("DOMContentLoaded", () => {
    initFlairShop();

    document.getElementById("remove-flair").addEventListener("click", (e) => {
        const removeflairmessage = document.getElementById("remove-flair-message");
        e.preventDefault();
        chattable.setFlair("none");
        removeflairmessage.style.display = "block";
        setTimeout(() => removeflairmessage.style.display = "none", 2000);
    });

    document.getElementById("reset-purchases").addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to reset all your flair purchases?")) {
            localStorage.removeItem("ownedFlairs");
            localStorage.setItem("ownedFlairs", JSON.stringify([]));

            const flairShop = document.getElementById("flair-shop");
            const originalHTML = flairShop.innerHTML;
            flairShop.innerHTML = originalHTML;

            setTimeout(() => {
                initFlairShop();
                chattable.setFlair("none");
            }, 0);
        }
    });
});