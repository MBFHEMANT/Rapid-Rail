// Global execution mapping on dynamic DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("Namo Bharat RRTS Portal Engine Initialised.");
    
    // Core Engine 1: Timekeeper display tracking
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const updateClock = () => {
            clockElement.textContent = new Date().toLocaleTimeString();
        };
        setInterval(updateClock, 1000);
        updateClock();
    }

    // Core Engine 2: Station pill synchronizers
    const pills = document.querySelectorAll('.station-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('selected'));
            pill.classList.add('selected');
            
            // Map pill down directly into the main selector tracking fields
            const targetSelect = document.getElementById('fromStation');
            if (targetSelect) {
                for (let option of targetSelect.options) {
                    if (option.text.includes(pill.textContent)) {
                        targetSelect.value = option.value;
                        break;
                    }
                }
            }
        });
    });

    // Core Engine 3: Key spacebar interceptor 
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            const displayMsg = document.getElementById('spacebarMessage');
            if (displayMsg) {
                displayMsg.textContent = 'System Alert: Spacebar Event Tracked!';
                setTimeout(() => displayMsg.textContent = '', 2000);
            }
        }
    });
});

// Operational Script: Login Validator
function loginUser() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    
    if (user === "Namo" && pass === "1234") {
        alert("Login Validated successfully!");
        window.location.href = "home.html";
    } else {
        alert("Access Denied: Invalid Credentials provided.");
    }
    return false; // Interrupt standard structural pipeline reloads
}

// Operational Script: Active Bookings Toggle System
function switchBookingTab(activeTabId) {
    const activeBtn = document.getElementById('activeBtn');
    const completedBtn = document.getElementById('completedBtn');
    const activeContent = document.getElementById('activeContent');
    const completedContent = document.getElementById('completedContent');

    if (activeTabId === 'active') {
        activeBtn.classList.add('active-tab'); activeBtn.classList.remove('inactive-tab');
        completedBtn.classList.remove('active-tab'); completedBtn.classList.add('inactive-tab');
        activeContent.classList.remove('hidden'); completedContent.classList.add('hidden');
    } else {
        completedBtn.classList.add('active-tab'); completedBtn.classList.remove('inactive-tab');
        activeBtn.classList.remove('active-tab'); activeBtn.classList.add('inactive-tab');
        completedContent.classList.remove('hidden'); activeContent.classList.add('hidden');
    }
}

// Operational Script: Mathematical Fare Matrix Logic Builder
function processFareEstimation() {
    const fromVal = document.getElementById("fromStation").value;
    const toVal = document.getElementById("toStation").value;
    const selectedClassOpt = document.querySelector('input[name="classType"]:checked');

    if (!fromVal || !toVal || !selectedClassOpt) return;

    if (fromVal === toVal) {
        alert("Error: Origin and Destination locations must be distinct terminals.");
        return;
    }

    const classType = selectedClassOpt.value;
    const baseRate = 40;
    const upgradeCost = (classType === "Premium") ? 30 : 0;
    
    // Generates logical programmatic distances safely across structural changes
    const distanceDelta = Math.abs(fromVal.charCodeAt(fromVal.length - 1) - toVal.charCodeAt(toVal.length - 1)) || 3;
    const finalizedFare = baseRate + upgradeCost + (distanceDelta * 10);

    document.getElementById("fromResult").innerText = fromVal.split(',')[0];
    document.getElementById("toResult").innerText = toVal.split(',')[0];
    document.getElementById("classResult").innerText = classType;
    document.getElementById("fareResult").innerText = finalizedFare;
    document.getElementById("resultDisplayBlock").classList.remove('hidden');
}
