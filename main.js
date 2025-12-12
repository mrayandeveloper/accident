// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate feature cards on hover
    const featureCards = document.querySelectorAll('.col');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Particle effect on button click
function createParticles(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = `hsl(${Math.random() * 60 + 190}, 100%, 60%)`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '1';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 2 + Math.random() * 2;
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity + 0.5;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

function sendAlert() {
    const statusEl = document.getElementById("status");
    const btn = event.currentTarget;
    
    createParticles(event);
    
    statusEl.className = "loading";
    statusEl.innerHTML = "⏳ Sending test alert...";
    statusEl.style.animation = 'fadeIn 0.3s ease';

    // Replace with your actual bot token and chat ID
    let botToken = "8396392800:AAH5MOLu18otgl1ulPVNlldh7Kk21mCpa8s";
    let chatId = "7775563692";

    let message = "🚨 Test Alert from Smart Accident Detection System%0A%0A✅ System is operational%0A📍 Location: Test Mode%0A⏰ Time: " + new Date().toLocaleString();
    let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

    fetch(url)
        .then(r => r.json())
        .then(d => {
            if (d.ok) {
                statusEl.className = "success";
                statusEl.innerHTML = "✅ Alert sent successfully! Check your Telegram.";
            } else {
                statusEl.className = "error";
                statusEl.innerHTML = "❌ Error: Please check your bot token and chat ID.";
            }
        })
        .catch(err => {
            statusEl.className = "error";
            statusEl.innerHTML = "❌ Network error. Please check your connection.";
        });
}

