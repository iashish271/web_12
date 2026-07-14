/* ===== THE BOOK OF TALAT - SCRIPT ===== */

// ===== STATE =====
let currentChapter = 0;
let musicStarted = false;
let musicPlaying = false;
const chapters = ['cover', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'final'];
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

// ===== MUSIC SYSTEM =====
musicBtn.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
        musicStarted = true;
        musicPlaying = true;
        musicBtn.classList.add('playing');
    } else {
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(() => {});
            musicPlaying = true;
            musicBtn.classList.add('playing');
        }
    }
});

// Start music on first interaction
document.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
        musicStarted = true;
        musicPlaying = true;
        musicBtn.classList.add('playing');
    }
}, { once: true });

// ===== CHAPTER NAVIGATION =====
function openBook() {
    nextChapter();
}

function nextChapter() {
    if (currentChapter >= chapters.length - 1) {
        closeBook();
        return;
    }

    const currentEl = document.getElementById(chapters[currentChapter]);
    currentChapter++;
    const nextEl = document.getElementById(chapters[currentChapter]);

    // Page turn animation
    currentEl.classList.add('turning-out');
    
    setTimeout(() => {
        currentEl.classList.remove('active', 'turning-out');
        nextEl.classList.add('active', 'turning-in');
        
        setTimeout(() => {
            nextEl.classList.remove('turning-in');
        }, 1500);

        // Trigger chapter-specific animations
        initChapterAnimations(currentChapter);
    }, 750);
}

function closeBook() {
    const currentEl = document.getElementById(chapters[currentChapter]);
    const closeOverlay = document.getElementById('book-close');
    
    currentEl.style.transition = 'opacity 3s ease';
    currentEl.style.opacity = '0';
    
    setTimeout(() => {
        closeOverlay.classList.add('active');
    }, 1500);
}

function closeLetterAndNext() {
    const openedLetter = document.getElementById('opened-letter');
    openedLetter.classList.remove('active');
    document.getElementById('folded-letter').style.display = 'flex';
    setTimeout(nextChapter, 500);
}

// ===== CHAPTER-SPECIFIC ANIMATIONS =====
function initChapterAnimations(chapterIndex) {
    switch(chapterIndex) {
        case 1: // Chapter 1: Handwriting
            initHandwriting('ch1-text');
            break;
        case 2: // Chapter 2: Star reveal
            initStarReveal();
            break;
        case 3: // Chapter 3: Polaroids already animated via CSS
            break;
        case 4: // Chapter 4: Wishes
            initWishes();
            break;
        case 5: // Chapter 5: Birthday
            initBirthday();
            break;
        case 6: // Chapter 6: Letter
            initLetter();
            break;
        case 7: // Chapter 7: Reasons
            initReasons();
            break;
        case 8: // Final
            initFinal();
            break;
    }
}

// ===== HANDWRITING ANIMATION =====
function initHandwriting(elementId) {
    const container = document.getElementById(elementId);
    const lines = container.querySelectorAll('.line');
    
    lines.forEach(line => {
        line.style.width = '0';
        line.style.opacity = '0';
        line.classList.remove('typing');
    });

    lines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || (index * 2000);
        setTimeout(() => {
            line.classList.add('typing');
        }, delay);
    });
}

// ===== STAR REVEAL =====
function initStarReveal() {
    const name = document.getElementById('reveal-name');
    name.style.opacity = '0';
    
    setTimeout(() => {
        name.style.opacity = '1';
        name.classList.add('visible');
    }, 500);
}

// ===== WISHES ANIMATION =====
function initWishes() {
    const wishes = document.querySelectorAll('.wish');
    wishes.forEach(wish => {
        wish.classList.remove('visible');
        const delay = parseInt(wish.dataset.delay) || 0;
        setTimeout(() => {
            wish.classList.add('visible');
        }, delay);
    });
}

// ===== BIRTHDAY ANIMATION =====
function initBirthday() {
    const num = document.getElementById('birthday-num');
    const msg = document.getElementById('birthday-msg');
    
    num.style.opacity = '0';
    msg.classList.remove('visible');
    
    setTimeout(() => {
        num.style.opacity = '1';
        num.style.animation = 'numberGlow 2s ease-in-out infinite, fadeInUp 2s ease forwards';
    }, 300);
    
    setTimeout(() => {
        msg.classList.add('visible');
    }, 2500);

    // Launch fireworks
    setTimeout(() => {
        startFireworks();
        launchConfetti();
    }, 1500);
}

// ===== LETTER =====
function openLetter() {
    const folded = document.getElementById('folded-letter');
    const opened = document.getElementById('opened-letter');
    
    folded.style.display = 'none';
    opened.classList.add('active');
    
    // Animate letter lines
    const lines = opened.querySelectorAll('.letter-line');
    lines.forEach(line => {
        line.style.opacity = '0';
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.classList.add('visible');
        }, 800 + delay);
    });
}

function initLetter() {
    const folded = document.getElementById('folded-letter');
    const opened = document.getElementById('opened-letter');
    folded.style.display = 'flex';
    opened.classList.remove('active');
}

// ===== REASONS =====
function initReasons() {
    const reasons = document.querySelectorAll('.reason');
    reasons.forEach(reason => {
        reason.classList.remove('visible');
        const delay = parseInt(reason.dataset.delay) || 0;
        setTimeout(() => {
            reason.classList.add('visible');
        }, delay);
    });
}

// ===== FINAL CHAPTER =====
function initFinal() {
    const lines = document.querySelectorAll('.final-line');
    lines.forEach(line => {
        line.classList.remove('visible');
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.classList.add('visible');
        }, delay);
    });

    // Auto-close book after reading
    setTimeout(() => {
        closeBook();
    }, 18000);
}

// ===== PARTICLE SYSTEM =====
const particlesCanvas = document.getElementById('particles-canvas');
const pCtx = particlesCanvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = window.innerHeight;
    sparklesCanvas.width = window.innerWidth;
    sparklesCanvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.3;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = this.getColor();
    }
    
    getColor() {
        const colors = [
            '255, 215, 0',   // gold
            '255, 182, 193', // pink
            '173, 216, 230', // light blue
            '255, 255, 255', // white
            '221, 160, 221'  // plum
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.001;
        
        if (this.opacity <= 0 || this.y < -10 || this.x < -10 || this.x > particlesCanvas.width + 10) {
            this.reset();
            this.y = particlesCanvas.height + 10;
        }
    }
    
    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        pCtx.shadowBlur = 10;
        pCtx.shadowColor = `rgba(${this.color}, 0.5)`;
        pCtx.fill();
        pCtx.shadowBlur = 0;
    }
}

// Initialize particles
for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// ===== PETAL SYSTEM =====
const petalsCanvas = document.getElementById('petals-canvas');
const petalCtx = petalsCanvas.getContext('2d');
let petals = [];

class Petal {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * petalsCanvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = this.getPetalColor();
    }
    
    getPetalColor() {
        const colors = ['#ffb6c1', '#ffc0cb', '#dda0dd', '#f8c8dc', '#ff69b4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.rotation += this.rotationSpeed;
        
        if (this.y > petalsCanvas.height + 20) {
            this.reset();
        }
    }
    
    draw() {
        petalCtx.save();
        petalCtx.translate(this.x, this.y);
        petalCtx.rotate(this.rotation * Math.PI / 180);
        petalCtx.globalAlpha = this.opacity;
        
        // Draw petal shape
        petalCtx.beginPath();
        petalCtx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        petalCtx.fillStyle = this.color;
        petalCtx.fill();
        
        petalCtx.restore();
    }
}

function animatePetals() {
    petalCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    
    // Only show petals on certain chapters
    if (currentChapter === 4 || currentChapter === 8) {
        // Add new petals occasionally
        if (petals.length < 30 && Math.random() < 0.02) {
            petals.push(new Petal());
        }
        
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
    } else {
        petals = [];
    }
    
    requestAnimationFrame(animatePetals);
}

// ===== SPARKLE SYSTEM =====
const sparklesCanvas = document.getElementById('sparkles-canvas');
const sCtx = sparklesCanvas.getContext('2d');
let sparkles = [];

class Sparkle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * sparklesCanvas.width;
        this.y = Math.random() * sparklesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.maxLife = Math.random() * 100 + 50;
        this.life = this.maxLife;
        this.color = this.getSparkleColor();
    }
    
    getSparkleColor() {
        const colors = ['255, 215, 0', '255, 255, 255', '255, 183, 178'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.life--;
        this.y -= 0.3;
        
        if (this.life <= 0) {
            this.reset();
        }
    }
    
    draw() {
        const opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.8;
        sCtx.beginPath();
        sCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(${this.color}, ${opacity})`;
        sCtx.shadowBlur = 8;
        sCtx.shadowColor = `rgba(${this.color}, 0.8)`;
        sCtx.fill();
        sCtx.shadowBlur = 0;
    }
}

for (let i = 0; i < 40; i++) {
    sparkles.push(new Sparkle());
}

function animateSparkles() {
    sCtx.clearRect(0, 0, sparklesCanvas.width, sparklesCanvas.height);
    sparkles.forEach(s => {
        s.update();
        s.draw();
    });
    requestAnimationFrame(animateSparkles);
}

// ===== FIREWORKS SYSTEM =====
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
let fireworks = [];
let fireworksActive = false;

fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

class Firework {
    constructor(x, targetY) {
        this.x = x;
        this.y = window.innerHeight;
        this.targetY = targetY;
        this.speed = Math.random() * 4 + 6;
        this.exploded = false;
        this.particles = [];
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff69b4', '#00ced1', '#ff8c00', '#da70d6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            this.particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= 0.008;
                
                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            });
        }
    }
    
    explode() {
        this.exploded = true;
        const particleCount = Math.random() * 30 + 50;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 4 + 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1,
                color: this.color
            });
        }
    }
    
    draw() {
        if (!this.exploded) {
            fwCtx.beginPath();
            fwCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fwCtx.fillStyle = this.color;
            fwCtx.fill();
            
            // Trail
            fwCtx.beginPath();
            fwCtx.moveTo(this.x, this.y);
            fwCtx.lineTo(this.x, this.y + 15);
            fwCtx.strokeStyle = this.color;
            fwCtx.lineWidth = 2;
            fwCtx.stroke();
        } else {
            this.particles.forEach(p => {
                fwCtx.beginPath();
                fwCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                fwCtx.fillStyle = p.color;
                fwCtx.globalAlpha = p.alpha;
                fwCtx.fill();
                fwCtx.globalAlpha = 1;
            });
        }
    }
    
    isDead() {
        return this.exploded && this.particles.length === 0;
    }
}

function startFireworks() {
    fireworksActive = true;
    fireworks = [];
    
    // Launch fireworks periodically
    let count = 0;
    const interval = setInterval(() => {
        if (count > 15 || !fireworksActive) {
            clearInterval(interval);
            return;
        }
        
        const x = Math.random() * fwCanvas.width * 0.8 + fwCanvas.width * 0.1;
        const targetY = Math.random() * fwCanvas.height * 0.4 + 50;
        fireworks.push(new Firework(x, targetY));
        count++;
    }, 400);
    
    animateFireworks();
}

function animateFireworks() {
    if (!fireworksActive && fireworks.length === 0) return;
    
    fwCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
    
    fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        
        if (fw.isDead()) {
            fireworks.splice(i, 1);
        }
    });
    
    if (fireworks.length > 0 || fireworksActive) {
        requestAnimationFrame(animateFireworks);
    } else {
        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    }
}

function stopFireworks() {
    fireworksActive = false;
}

// ===== CONFETTI =====
function launchConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff69b4', '#00ced1', '#ff8c00', '#da70d6', '#7fff00'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 6 + 4 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 6000);
        }, i * 30);
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextChapter();
    }
});

// ===== TOUCH SUPPORT =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            if (currentChapter === 6) return; // Don't swipe past letter
            nextChapter();
        }
    }
}

// ===== INIT =====
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();
animateSparkles();
animatePetals();

// Make openLetter globally accessible
window.openLetter = openLetter;
window.closeLetterAndNext = closeLetterAndNext;
window.nextChapter = nextChapter;
window.openBook = openBook;

console.log('The Book of Talat is ready. Open the book to begin the journey.');
