// ============ PRELOADER ============
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 800);
        setTimeout(() => preloader.remove(), 1400);
    }
});

// ============ BURGER MENU ============
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');
if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    });
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// ============ HEADER SCROLL ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

// ============ REVEAL ANIMATIONS ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ TYPEWRITER EFFECT ============
const heroSubtitle = document.getElementById('heroSubtitle');
if (heroSubtitle) {
    const text = 'Более 10 лет профессионального ремонта пластиковых судов в Приморском крае. Работаем с полиэфирными и эпоксидными смолами, восстанавливаем геометрию и воплощаем любые идеи по переделке.';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 6);
        }
    }
    setTimeout(typeWriter, 600);
}

// ============ WAVE CANVAS ============
const waveCanvas = document.getElementById('waveCanvas');
if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let w, h, time = 0;
    function resizeCanvas() {
        w = waveCanvas.width = waveCanvas.offsetWidth;
        h = waveCanvas.height = waveCanvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawWave(yOff, amp, freq, speed, alpha) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
            const y = h * yOff + Math.sin(x * freq + time * speed) * amp + Math.sin(x * freq * 0.5 + time * speed * 1.3) * amp * 0.5;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(197, 160, 89, ${alpha})`;
        ctx.fill();
    }

    function animateWaves() {
        ctx.clearRect(0, 0, w, h);
        drawWave(0.5, 15, 0.008, 1.5, 0.08);
        drawWave(0.6, 12, 0.01, 2, 0.06);
        drawWave(0.7, 10, 0.012, 2.5, 0.04);
        time += 0.02;
        requestAnimationFrame(animateWaves);
    }
    animateWaves();
}

// ============ BEFORE/AFTER SLIDER ============
const baSlider = document.getElementById('baSlider');
const baBefore = document.getElementById('baBefore');
const baHandle = document.getElementById('baHandle');
if (baSlider && baBefore && baHandle) {
    let isDragging = false;
    function setPosition(x) {
        const rect = baSlider.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        pos = Math.max(5, Math.min(95, pos));
        baBefore.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
        baHandle.style.left = pos + '%';
    }
    baSlider.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); document.body.style.userSelect = 'none'; });
    baSlider.addEventListener('touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); document.body.style.userSelect = 'none'; }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; document.body.style.userSelect = ''; });
    window.addEventListener('touchend', () => { isDragging = false; document.body.style.userSelect = ''; });
}

// ============ ANIMATED COUNTERS ============
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '+';
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + suffix;
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-number').forEach(el => counterObserver.observe(el));

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// ============ FLOATING MESSENGER ============
const fmBtn = document.getElementById('fmBtn');
const fmOptions = document.getElementById('fmOptions');
if (fmBtn && fmOptions) {
    fmBtn.addEventListener('click', () => {
        fmBtn.classList.toggle('active');
        fmOptions.classList.toggle('active');
    });
}

// ============ SCROLL TO TOP ============
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ CONFIGURATION ============
let config = {
    basePrice: (typeof TG_CONFIG !== 'undefined' && TG_CONFIG.basePrice) ? TG_CONFIG.basePrice : 5000,
    botToken: (typeof TG_CONFIG !== 'undefined' && TG_CONFIG.botToken) ? TG_CONFIG.botToken : '',
    chatId: (typeof TG_CONFIG !== 'undefined' && TG_CONFIG.chatId) ? TG_CONFIG.chatId : ''
};

const savedConfig = localStorage.getItem('marineRepairConfig');
if (savedConfig) {
    const parsed = JSON.parse(savedConfig);
    if (parsed.basePrice) config.basePrice = parsed.basePrice;
    if (parsed.botToken) config.botToken = parsed.botToken;
    if (parsed.chatId) config.chatId = parsed.chatId;
}

// ============ DYNAMIC CALCULATOR INIT ============
function initCalculator() {
    if (typeof TG_CONFIG === 'undefined') return;

    const populate = (id, data, isPrice = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '';
        data.forEach(item => {
            const opt = document.createElement('option');
            opt.value = isPrice ? item.price : item.multiplier;
            opt.textContent = item.name;
            el.appendChild(opt);
        });
    };

    if (TG_CONFIG.vesselTypes) populate('vesselType', TG_CONFIG.vesselTypes);
    if (TG_CONFIG.damageTypes) populate('damageType', TG_CONFIG.damageTypes, true);
    if (TG_CONFIG.materialTypes) populate('materialType', TG_CONFIG.materialTypes);
    if (TG_CONFIG.repairZones) populate('repairZone', TG_CONFIG.repairZones);

    calculatePrice(true);
}

// ============ CALCULATOR ============
const vesselType = document.getElementById('vesselType');
const damageType = document.getElementById('damageType');
const materialType = document.getElementById('materialType');
const repairZone = document.getElementById('repairZone');
const area = document.getElementById('area');
const totalPriceDisplay = document.getElementById('totalPrice');

let lastCalculatorData = null;
let hasInteractedWithCalculator = false;

function calculatePrice(isInitial = false) {
    if (!vesselType || !damageType || !materialType || !repairZone || !area) return;
    if (!isInitial) hasInteractedWithCalculator = true;

    const vesselVal = parseFloat(vesselType.value);
    const damageVal = parseFloat(damageType.value);
    const materialVal = parseFloat(materialType.value);
    const zoneVal = parseFloat(repairZone.value);
    const areaVal = parseFloat(area.value) || 0;
    const base = config.basePrice || 5000;
    const total = (damageVal + (areaVal * base)) * vesselVal * materialVal * zoneVal;
    const formattedPrice = Math.round(total).toLocaleString('ru-RU') + ' ₽';
    animateValue(totalPriceDisplay, parseInt(totalPriceDisplay.innerText.replace(/\s/g, '')) || 0, Math.round(total), 1000);

    lastCalculatorData = {
        vessel: vesselType.options[vesselType.selectedIndex].text,
        damage: damageType.options[damageType.selectedIndex].text,
        price: formattedPrice
    };
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * (end - start) + start);
        obj.innerHTML = current.toLocaleString('ru-RU') + ' <span>₽</span>';
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

[vesselType, damageType, materialType, repairZone, area].forEach(el => {
    if (el) {
        el.addEventListener('change', () => calculatePrice(false));
        el.addEventListener('input', () => calculatePrice(false));
    }
});

// Запускаем инициализацию калькулятора из конфига
initCalculator();

// ============ PARALLAX ============
window.addEventListener('scroll', () => {
    const calcBg = document.querySelector('.calc-parallax-bg');
    if (calcBg) calcBg.style.transform = `translate3d(0, ${window.pageYOffset * 0.1}px, 0)`;

    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${50 + (scrolled * 0.05)}%`;
            heroContent.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }
});

// ============ TOAST NOTIFICATIONS ============
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============ TELEGRAM ============
async function sendToTelegram(message) {
    if (!config.botToken || !config.chatId) {
        showToast('Токен бота или Chat ID не настроены', 'error');
        return false;
    }
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: config.chatId, text: message, parse_mode: 'HTML' })
        });
        if (response.ok) {
            showToast('Заявка успешно отправлена!');
            return true;
        } else {
            showToast('Ошибка отправки. Попробуйте позже.', 'error');
            return false;
        }
    } catch (error) {
        console.error('Telegram Error:', error);
        showToast('Сетевая ошибка', 'error');
        return false;
    }
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('contactSubmitBtn');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const phone = document.getElementById('contactPhone').value;
        const msg = document.getElementById('contactMessage').value;

        // Validation
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
            showToast('Введите корректный номер телефона', 'error');
            return;
        }

        // Loader state
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка... ⏳';

        // Time formatting
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('ru-RU');

        // Phone formatting for link
        const cleanPhone = '+' + phoneDigits;

        let text = `<b>🚀 Новая заявка с сайта!</b>\n` +
            `🕒 <b>Время:</b> ${dateString} ${timeString}\n\n` +
            `👤 <b>Имя:</b> ${name}\n` +
            `📞 <b>Телефон:</b> ${cleanPhone}\n`;

        if (msg) text += `📝 <b>Сообщение:</b> ${msg}\n`;

        if (hasInteractedWithCalculator && lastCalculatorData) {
            text += `\n<b>📊 Данные расчета:</b>\n` +
                `🚤 <b>Тип:</b> ${lastCalculatorData.vessel}\n` +
                `💥 <b>Повреждение:</b> ${lastCalculatorData.damage}\n` +
                `💰 <b>Ориентировочная цена:</b> ${lastCalculatorData.price}`;
        }

        const success = await sendToTelegram(text);

        if (success) {
            contactForm.reset();
            lastCalculatorData = null;
            submitBtn.innerText = '✅ Отправлено';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }, 3000);
        } else {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}

// ============ BOOKING BUTTON ============
const bookConsultationBtn = document.getElementById('bookConsultation');
if (bookConsultationBtn) {
    bookConsultationBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => document.getElementById('contactName').focus(), 800);
        }
    });
}

// ============ PHONE MASK ============
const phoneInput = document.getElementById('contactPhone');
if (phoneInput) {
    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) phoneInput.value = '+7 (';
    });
    phoneInput.addEventListener('input', () => {
        let val = phoneInput.value.replace(/\D/g, '');
        if (val.startsWith('7')) val = val.substring(1);
        if (val.startsWith('8')) val = val.substring(1);
        val = val.substring(0, 10);
        let formatted = '+7 ';
        if (val.length > 0) formatted += '(' + val.substring(0, 3);
        if (val.length >= 3) formatted += ') ' + val.substring(3, 6);
        if (val.length >= 6) formatted += '-' + val.substring(6, 8);
        if (val.length >= 8) formatted += '-' + val.substring(8, 10);
        phoneInput.value = formatted;
    });
    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && phoneInput.value.length <= 4) e.preventDefault();
    });
}

// ============ GALLERY MODAL ============
const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalBefore = document.getElementById('modalBefore');
const modalAfter = document.getElementById('modalAfter');
const closeModalBtn = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        modalTitle.innerText = item.getAttribute('data-title');
        modalDescription.innerText = item.getAttribute('data-description');
        modalBefore.src = item.getAttribute('data-before');
        modalAfter.src = item.getAttribute('data-after');
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


// ============ ROBUST SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const header = document.getElementById('header');
            const offset = (header ? header.offsetHeight : 80) + 20;

            const scrollToTarget = () => {
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            };

            scrollToTarget();
            // Removed multiple setTimeouts that caused the "snap back" bug
        }
    });
});

// ============ 2GIS MAP DYNAMIC LOADER ============
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const apiKey = (typeof TG_CONFIG !== 'undefined' && TG_CONFIG.mapsApiKey) ? TG_CONFIG.mapsApiKey : '';
    const script = document.createElement('script');
    script.src = `https://maps.api.2gis.ru/2.0/loader.js?pkg=full&key=${apiKey}`;

    script.onload = () => {
        if (typeof DG !== 'undefined') {
            DG.then(function () {
                const map = DG.map('map', {
                    center: [43.091544, 131.957283], // Улица Катерная, 2
                    zoom: 16,
                    scrollWheelZoom: false
                });

                const myIcon = DG.divIcon({
                    className: 'custom-map-marker',
                    html: '<div style="width: 24px; height: 24px; background: #c5a059; border-radius: 50%; border: 4px solid #050a14; box-shadow: 0 0 15px rgba(197,160,89,0.8);"></div>',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });

                DG.marker([43.091544, 131.957283], { icon: myIcon })
                    .addTo(map)
                    .bindPopup('<div style="color: #050a14; font-weight: 800; font-family: Outfit, sans-serif; padding: 5px;">ООО "Море Т"<br><span style="font-weight: 400; color: #666;">Мастерская</span></div>');
            });
        }
    };
    document.head.appendChild(script);
}

// Запускаем загрузку карты
initMap();
