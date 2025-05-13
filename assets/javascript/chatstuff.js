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

    const flairData = await fetchFlairData();
    
    // Clear existing content in flairOptions
    flairOptions.innerHTML = '';
    
    // Group flairs by their category
    const categories = {};
    
    flairData.flairs.forEach(flair => {
        const category = flair.category || "Other";
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(flair);
    });
    
    // Create fieldsets for each category
    for (const [category, flairs] of Object.entries(categories)) {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = category;
        fieldset.appendChild(legend);
        
        // Add items from this category
        flairs.forEach(flair => {
            const container = document.createElement('div');
            container.className = 'flair-item';
            
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'flair';
            input.value = flair.value;
            
            const costSpan = document.createElement('span');
            costSpan.className = 'cost-text';
            
            label.appendChild(input);
            const displayName = flair.displayName || formatFlairName(flair.value);
            label.appendChild(document.createTextNode(` ${displayName} (`));
            label.appendChild(costSpan);
            label.appendChild(document.createTextNode(')'));
            
            // Add description box if description exists
            if (flair.description) {
                const descriptionBox = document.createElement('div');
                descriptionBox.className = 'flair-description';
                descriptionBox.textContent = flair.description;
                container.appendChild(descriptionBox);
            }
            
            container.appendChild(label);
            fieldset.appendChild(container);
        });
        
        flairOptions.appendChild(fieldset);
    }
    
    // Format flair names for display
    function formatFlairName(value) {
        return value
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([a-zA-Z])(\d+)/g, '$1 $2');
    }

    const defaultTariffReason = [
        "📈 Price adjusted due to tariffs imposed by Princess Peach"
    ];
    
    // Attach event handlers to checkboxes
    const checkboxes = flairOptions.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        const container = checkbox.closest('.flair-item');
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
            label.title = tooltip; // Keep tariff tooltip as regular browser tooltip
        }

        const costText = label.querySelector(".cost-text");
        if (costText) {
            if (ownedFlairs.includes(flair)) {
                costText.textContent = "Purchased";
                container.classList.add("purchased");
            } else if (flairData && flairData.tariff) {
                costText.innerHTML = `<span style="text-decoration: line-through; opacity: 0.6;">${formatCurrency(originalCost)}</span> → <strong>${formatCurrency(cost)}</strong>`;
            } else {
                costText.textContent = formatCurrency(cost);
            }
        }

        container.addEventListener("click", (e) => {
            if (e.target.tagName !== 'INPUT' && !ownedFlairs.includes(flair) && points >= cost) {
                points -= cost;
                ownedFlairs.push(flair);
                checkbox.checked = true;
                container.classList.add("purchased");
                if (costText) costText.textContent = "Purchased";
                savePoints();
                saveFlairs();
            } else if (e.target.tagName !== 'INPUT' && !ownedFlairs.includes(flair)) {
                message2.style.display = "block";
                setTimeout(() => message2.style.display = "none", 2000);
            }
        });

        checkbox.addEventListener("change", function() {
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
            let bonusPoints = promoDetails.points;
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

function exportShopData() {
    const data = {
        userPoints: localStorage.getItem("userPoints"),
        ownedFlairs: localStorage.getItem("ownedFlairs"),
        redeemedCodes: localStorage.getItem("redeemedCodes")
    };

    const encoded = btoa(JSON.stringify(data));
    const blob = new Blob([encoded], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "yourflairshop.savedata";
    a.click();

    URL.revokeObjectURL(url);
}

function importShopData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const decoded = atob(e.target.result);
            const data = JSON.parse(decoded);

            localStorage.setItem("userPoints", data.userPoints);
            localStorage.setItem("ownedFlairs", data.ownedFlairs);
            localStorage.setItem("redeemedCodes", data.redeemedCodes);

            alert("✅ Import successful! Reload the page to see changes.");
        } catch (err) {
            alert("❌ Failed to import data. File might be corrupted.");
            console.error("Import error:", err);
        }
    };
    reader.readAsText(file);
}