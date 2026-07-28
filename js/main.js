document.addEventListener('DOMContentLoaded', () => {
    console.log("Unified Namo Bharat Engine Initialised.");
    
    // Core Module 1: Universal Synchronized Clock Loop
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const updateClock = () => { clockElement.textContent = new Date().toLocaleTimeString(); };
        setInterval(updateClock, 1000);
        updateClock();
    }

    // Core Module 2: Interactive Station Quick Select Pills
    const pills = document.querySelectorAll('.station-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('selected'));
            pill.classList.add('selected');
            
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
});

// Authentication Validation Router Hook
function loginUser() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    if (user === "Namo" && pass === "1234") {
        window.location.href = "home.html";
    } else {
        alert("Access Denied: Invalid Credentials.");
    }
    return false;
}

// Booking Tracker View Swapper Toggle
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

// Fare Matrix Processor
function processFareEstimation() {
    const fromSelect = document.getElementById("fromStation");
    const toSelect = document.getElementById("toStation");
    const selectedClassOpt = document.querySelector('input[name="classType"]:checked');

    if (!fromSelect || !toSelect || !selectedClassOpt) return;
    
    const fromText = fromSelect.options[fromSelect.selectedIndex].text;
    const toText = toSelect.options[toSelect.selectedIndex].text;
    const fromVal = fromSelect.value;
    const toVal = toSelect.value;

    if (fromVal === toVal) {
        alert("Error: Origin and Destination locations must be distinct terminals.");
        return;
    }

    const classType = selectedClassOpt.value;
    const baseRate = 40;
    const upgradeCost = (classType === "Premium") ? 30 : 0;
    
    const distanceDelta = Math.abs(fromVal.charCodeAt(fromVal.length - 1) - toVal.charCodeAt(toVal.length - 1)) || 3;
    const finalizedFare = baseRate + upgradeCost + (distanceDelta * 10);

    document.getElementById("fromResult").innerText = fromText;
    document.getElementById("toResult").innerText = toText;
    document.getElementById("classResult").innerText = classType;
    document.getElementById("fareResult").innerText = "₹" + finalizedFare;
    document.getElementById("resultDisplayBlock").classList.remove('hidden');

    // Save ticket configuration properties directly in state storage for print execution mapping
    const pendingTicketData = {
        origin: fromText,
        destination: toText,
        travelClass: classType,
        fare: finalizedFare,
        timestamp: new Date().toLocaleString(),
        pnr: "PNR" + Math.floor(10000000 + Math.random() * 90000000)
    };
    localStorage.setItem('pendingTicket', JSON.stringify(pendingTicketData));
}

// Automated 5-Second QR Payment Cycle Loader & Dynamic Boarding Pass Printer Engine
function initializeTransactionProcess() {
    const calculationUIBlock = document.getElementById('resultDisplayBlock');
    const paymentProcessingCard = document.getElementById('paymentProcessingCard');
    const printedTicketCard = document.getElementById('printedTicketCard');
    
    // Hide standard results block and open loading QR view container
    calculationUIBlock.classList.add('hidden');
    paymentProcessingCard.classList.remove('hidden');

    // Trigger sequential 5.5 second automatic timeout delay handler loops
    setTimeout(() => {
        paymentProcessingCard.classList.add('hidden');
        
        // Fetch and load cached metadata out from localized runtime configuration strings
        const sourceData = JSON.parse(localStorage.getItem('pendingTicket'));
        if (sourceData) {
            document.getElementById('tktPnr').innerText = sourceData.pnr;
            document.getElementById('tktFrom').innerText = sourceData.origin;
            document.getElementById('tktTo').innerText = sourceData.destination;
            document.getElementById('tktClass').innerText = sourceData.travelClass;
            document.getElementById('tktDate').innerText = sourceData.timestamp;
            document.getElementById('tktFare').innerText = "₹" + sourceData.fare;
            document.getElementById('tktBarcode').innerText = "||||| " + sourceData.pnr + " |||||";
            
            // Push active entry into ongoing tracking arrays securely for bookings tab synchronization
            localStorage.setItem('activeBookingProfile', JSON.stringify(sourceData));
        }
        
        printedTicketCard.classList.remove('hidden');
    }, 5500);
}

// Utility Navigation UI Tab Swapper Logic Hooks
function openUtilitySubSection(targetSubPanelId) {
    const sections = ['defaultServicesBlock', 'busSchedulePanel', 'routeMapPanel', 'trainTimingsPanel'];
    sections.forEach(id => {
        const block = document.getElementById(id);
        if (block) block.classList.add('hidden');
    });
    
    const activeBlock = document.getElementById(targetSubPanelId);
    if (activeBlock) activeBlock.classList.remove('hidden');
}
