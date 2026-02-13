const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const wrapper = document.getElementById('main-wrapper');
const backBtn = document.querySelector('.btn-small');
const warning = document.getElementById('no-backsies-warning');
const warningModal = document.getElementById('warning-modal');
const stubbornModal = document.getElementById('stubborn-modal');

// The "No" button will only become fixed and move after the first hover
noBtn.addEventListener('mouseover', () => {
    if (!noBtn.classList.contains('no-btn-runaway')) {
        noBtn.classList.add('no-btn-runaway');
    }

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

yesBtn.addEventListener('click', () => {
    // 1. Fire Confetti from the bottom for 2 seconds
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 }, // Bottom left
            colors: ['#7B1FA2', '#CE93D8', '#FFB74D']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 }, // Bottom right
            colors: ['#7B1FA2', '#CE93D8', '#FFB74D']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 2. Start dropping roses from the top
    setTimeout(() => {
        const roseInterval = setInterval(() => {
            const rose = document.createElement('div');
            rose.innerHTML = '🌹';
            rose.className = 'rose';
            rose.style.left = Math.random() * 100 + 'vw';
            rose.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5 seconds fall
            document.body.appendChild(rose);

            // Clean up rose element after it falls
            setTimeout(() => rose.remove(), 5000);
        }, 150); // Create a new rose every 150ms

        // 3. After 3 seconds of roses, slide to the journey section
        setTimeout(() => {
            clearInterval(roseInterval);
            wrapper.style.transform = "translateY(-100vh)";
            
            setTimeout(() => {
                backBtn.classList.add('visible');
                document.body.style.overflowY = "auto";
            }, 1000);
        }, 3000);

    }, 1000); // Start roses 1 second after confetti begins
});

// Show the warning if she scrolls up while the memory section is active
window.addEventListener('scroll', () => {
    // Only check this if the back button is visible (meaning she clicked YES)
    if (backBtn.classList.contains('visible')) {
        // If she scrolls back up toward the proposal section
        if (window.scrollY < (window.innerHeight * 0.4)) {
            warning.classList.remove('hidden');
        } else {
            warning.classList.add('hidden');
        }
    }
});

// Update the goBack function to hide the warning when she manually clicks back
function goBack() {
    // Show the warning modal instead of sliding immediately
    warningModal.classList.remove('hidden');
}
// Step 2: Updated - When she clicks "Take me back anyway" in the FIRST warning
function executeBackNavigation() {
    // Hide the first warning
    warningModal.classList.add('hidden');
    
    // Show the second, even more stubborn warning
    setTimeout(() => {
        stubbornModal.classList.remove('hidden');
    }, 300);
}

// Step 3: When she finally gives up and clicks the button in the second modal
function finalAcceptance() {
    stubbornModal.classList.add('hidden');
    
    // Smoothly scroll her back down to the memories just in case she scrolled up
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
    
    // Playful alert (Optional)
    console.log("Persistence level: Ammu. Result: Still no backsies.");
}

function closeStubbornModal() {
    stubbornModal.classList.add('hidden');
}

function openModal(title, text) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    overlay.classList.remove('hidden');
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
}

function updateCounter() {
    const startDate = new Date('2023-01-06T06:30:00');
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const timeString = `
        ${years} Years, ${months} Months, ${days} Days<br>
        ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds
    `;

    // Update the card on the journey page
    const mainCounter = document.getElementById('live-counter');
    if (mainCounter) mainCounter.innerHTML = timeString;

    // Update the modal if it's open
    const modalCounter = document.getElementById('modal-live-counter');
    if (modalCounter) modalCounter.innerHTML = timeString;
}

// Functions to open/close this specific modal
function openTimeModal() {
    document.getElementById('time-modal').classList.remove('hidden');
}

function closeTimeModal() {
    document.getElementById('time-modal').classList.add('hidden');
}

// Start the clock
setInterval(updateCounter, 1000);
updateCounter();

function openDistanceModal() {
    const modal = document.getElementById('distance-modal');
    const plane = document.getElementById('plane');
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Reset and then animate the plane
    plane.style.left = '0%';
    setTimeout(() => {
        plane.style.left = '100%';
    }, 500);
}

function closeDistanceModal() {
    document.getElementById('distance-modal').classList.add('hidden');
}

function openMeetingModal() {
    document.getElementById('meeting-modal').classList.remove('hidden');
}

function closeMeetingModal() {
    document.getElementById('meeting-modal').classList.add('hidden');
}

function openDateModal() {
    const modal = document.getElementById('date-modal');
    modal.classList.remove('hidden');
    // Force the scroll to the top of the comic when it opens
    const container = modal.querySelector('.comic-container');
    if (container) container.scrollTop = 0;
}
function closeDateModal() {
    document.getElementById('date-modal').classList.add('hidden');
}

function triggerFlowerShower() {
    const container = document.getElementById('flower-shower-container');
    const flowerEmojis = ['🌸', '🌹', '🌺', '🌻', '🌷', '🌼'];
    
    // 1. Start the shower (Creating 150 flowers rapidly)
    let count = 0;
    const interval = setInterval(() => {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.left = Math.random() * 100 + 'vw';
        
        // Randomize speed so they "fill" the screen at different times
        const duration = Math.random() * 2 + 1; 
        flower.style.animationDuration = duration + 's';
        
        container.appendChild(flower);
        count++;

        // Stop creating after 150 flowers
        if (count > 150) clearInterval(interval);
        
        // Remove individual flower after animation
        setTimeout(() => flower.remove(), duration * 1000);
    }, 20); // Create every 20ms for a "filling" effect

    // 2. Wait 2 seconds (Screen is full), then clear and show Modal
    setTimeout(() => {
        // Fade out the container
        container.style.transition = "opacity 1s ease";
        container.style.opacity = "0";
        
        // Show the actual modal
        openFlowerModal();
        
        // Reset container for next time
        setTimeout(() => {
            container.innerHTML = '';
            container.style.opacity = "1";
        }, 1000);
    }, 2500);
}

function openFlowerModal() {
    document.getElementById('flower-modal').classList.remove('hidden');
}

function closeFlowerModal() {
    document.getElementById('flower-modal').classList.add('hidden');
}

function openBirthdayModal() {
    document.getElementById('birthday-modal').classList.remove('hidden');
}

function closeBirthdayModal() {
    document.getElementById('birthday-modal').classList.add('hidden');
}

function openSurpriseModal() {
    document.getElementById('surprise-modal').classList.remove('hidden');
}

function closeSurpriseModal() {
    document.getElementById('surprise-modal').classList.add('hidden');
}

let currentIdx = 0;

function moveSlide(direction) {
    const slide = document.querySelector('.carousel-slide');
    const totalItems = document.querySelectorAll('.carousel-slide > *').length;
    
    currentIdx += direction;

    if (currentIdx >= totalItems) currentIdx = 0;
    if (currentIdx < 0) currentIdx = totalItems - 1;

    slide.style.transform = `translateX(${-currentIdx * 100}%)`;
}

function openGiftModal() {
    document.getElementById('gift-modal').classList.remove('hidden');
    currentIdx = 0; // Reset to first image
    document.querySelector('.carousel-slide').style.transform = 'translateX(0)';
}

function closeGiftModal() {
    document.getElementById('gift-modal').classList.add('hidden');
    // Stop video if it's playing
    const video = document.querySelector('.carousel-slide video');
    if (video) video.pause();
}

function showerHearts(event) {
    // Create 10 hearts per click for a "shower" effect
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        // Randomize starting position near the button
        const rect = event.target.getBoundingClientRect();
        heart.style.left = (rect.left + Math.random() * 40) + 'px';
        heart.style.top = rect.top + 'px';
        
        // Set a random X-axis drift for the CSS animation
        heart.style.setProperty('--random-x', Math.random());
        
        // Randomize duration and size slightly
        const duration = Math.random() * 1 + 1.5;
        heart.style.animationDuration = duration + 's';
        
        document.body.appendChild(heart);
        
        // Cleanup
        setTimeout(() => heart.remove(), duration * 1000);
    }
}

function celebrateProposal() {
    // 1. Show the Modal
    document.getElementById('celebration-modal').classList.remove('hidden');

    // 2. Continuous Heart Shower for 5 seconds
    const duration = 5000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);

        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.setProperty('--random-x', Math.random());
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }, 50);
}

// Fun trick: The 'No' button moves away when she tries to click it!
function moveNoButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// Run this as soon as the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('locked');
    
    // Block Right Click
    document.oncontextmenu = () => false;

    // Block F12 and Shortcuts
    document.onkeydown = (e) => {
        if (e.keyCode == 123 || (e.ctrlKey && (e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || e.keyCode == 85)) {
            return false;
        }
    };
});

function checkAccess() {
    const input = document.getElementById('secret-date-input').value;
    const overlay = document.getElementById('gatekeeper-overlay');
    const content = document.getElementById('main-content');

    if (input === "06012023") {
        overlay.style.display = 'none';
        content.style.visibility = 'visible';
        content.style.opacity = '1';
        document.body.classList.remove('locked');
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}