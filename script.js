// 1. Sticky header przy przewijaniu
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Interakcja w sekcji Hero: Włączanie lamp
const lampsToggle = document.getElementById('lampsToggle');
const heroSection = document.getElementById('heroSection');

if (lampsToggle && heroSection) {
    lampsToggle.addEventListener('click', () => {
        heroSection.classList.toggle('lamp-on');
    });

    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
        lampsToggle.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        lampsToggle.style.transform = 'translate(0px, 0px)';
    });
}

// 3. Slider automatyczny + strzałki
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    let currentSlide = 0;
    const slideDuration = 3000; // 3 sekundy
    let slideInterval;

    function updateSlide(index) {
        // Aktualizacja slajdów
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');

        // Aktualizacja wskaźników
        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[index]) {
            // Resetujemy animację paska postępu
            indicators[index].classList.remove('active');
            void indicators[index].offsetWidth; // Wymuszenie reflow
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    function startSlider() {
        stopSlider();
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Inicjalizacja
    if (slides.length > 0) {
        updateSlide(0);
        startSlider();
    }

    // Obsługa przycisków
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlider(); // Reset timera
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlider(); // Reset timera
        });
    }
});

// 4. WebGL Shader w czasie rzeczywistym (Three.js)
(function initShader() {
    const container = document.getElementById('webgl-shader-container');
    if (!container || !window.THREE) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 480;
    if (width < 10 || height < 10) {
        requestAnimationFrame(initShader);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    container.appendChild(renderer.domElement);

    const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
    `;

    const fragmentShader = `
    uniform float u_time;
    varying vec2 vUv;

    void main() {
        vec2 st = vUv;
        float t = u_time * 0.45;
        float diag = st.x * 0.6 + st.y * 1.0;
        float wave = sin(st.x * 3.0 + t) * 0.15 + cos(st.y * 2.0 - t * 0.8) * 0.1;
        float beamPos = diag + wave + sin(t * 0.6) * 0.2;
        float beam = smoothstep(0.1, 0.6, beamPos) * smoothstep(1.1, 0.6, beamPos);
        float cornerGlow = smoothstep(0.8, 0.0, length(st - vec2(0.1, 0.15)));
        float intensity = beam * 0.9 + cornerGlow * 0.7;
        vec3 colorDark = vec3(0.02, 0.02, 0.02);
        vec3 colorGold = vec3(0.85, 0.65, 0.05);
        vec3 finalColor = mix(colorDark, colorGold, clamp(intensity, 0.0, 1.0));
        float vig = 1.0 - length(st - 0.5) * 0.6;
        finalColor *= clamp(vig, 0.2, 1.0);
        gl_FragColor = vec4(finalColor, 1.0);
    }
    `;

    const uniforms = { u_time: { value: 0.0 } };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w > 0 && h > 0) renderer.setSize(w, h, false);
    });
})();
