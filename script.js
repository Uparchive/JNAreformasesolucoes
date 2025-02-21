document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // MENU MOBILE RESPONSIVO
  // =======================
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("active");
    });
  }

  // =======================
  // SCROLL SUAVE NOS LINKS DO MENU
  // =======================
  const menuLinks = document.querySelectorAll("nav ul li a");

  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 70, // Ajuste para compensar o header fixo
          behavior: "smooth"
        });
        navUl.classList.remove("active");
      }
    });
  });

  // =======================
  // BOTÃO WHATSAPP FLUTUANTE
  // =======================
  const whatsappButton = document.createElement("div");
  whatsappButton.innerHTML = `
    <a href="https://wa.me/5511982879526" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
      <img src="whatsapplogo.png" alt="WhatsApp">
    </a>
  `;
  whatsappButton.classList.add("whatsapp-container");
  document.body.appendChild(whatsappButton);

  // =======================
  // ANIMAÇÃO DE FADE-IN (INTERSECTION OBSERVER)
  // =======================
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // =======================
  // EFEITO DE DIGITAÇÃO - SEÇÃO "SOBRE"
  // =======================
  function typeText(element, text, speed, callback) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  const textoSobre = document.getElementById("texto-sobre");
  const descricaoSobre = document.getElementById("descricao-sobre");
  let typingStarted = false;

  if (textoSobre && descricaoSobre) {
    const typingObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typingStarted) {
          typingStarted = true;
          textoSobre.classList.add("digitando");
          typeText(textoSobre, "Sobre a JNA Reformas", 50, () => {
            typeText(
              descricaoSobre,
              "Com anos de experiência, a JNA Reformas e Soluções oferece serviços de reforma, manutenção de telhados e desentupimentos com o compromisso de qualidade, segurança e eficiência. Nossa equipe é treinada para oferecer soluções personalizadas e inovadoras, garantindo a satisfação de nossos clientes.",
              30
            );
          });
          observer.unobserve(textoSobre);
        }
      });
    }, { threshold: 0.1 });
    typingObserver.observe(textoSobre);
  }

  // =======================
  // SLIDER RESPONSIVO E AUTOMÁTICO
  // =======================
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const indicatorsContainer = document.querySelector(".slider-indicators");
  let currentSlide = 0;
  let slideInterval;

  // Cria indicadores
  slides.forEach((_, i) => {
    const indicator = document.createElement("button");
    indicator.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    indicator.addEventListener("click", () => {
      clearInterval(slideInterval);
      currentSlide = i;
      updateSlider();
      startSlideShow();
    });
    indicatorsContainer.appendChild(indicator);
  });
  const indicators = indicatorsContainer.querySelectorAll("button");

  function updateSlider() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      prevSlide();
      startSlideShow();
    });
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      nextSlide();
      startSlideShow();
    });
  }

  // Suporte a swipe no slider para mobile
  const slider = document.querySelector(".slider");
  let touchStartX = 0;
  let touchEndX = 0;

  if (slider) {
    slider.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    slider.addEventListener("touchend", e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        clearInterval(slideInterval);
        nextSlide();
        startSlideShow();
      } else if (touchEndX > touchStartX + 50) {
        clearInterval(slideInterval);
        prevSlide();
        startSlideShow();
      }
    });
  }

  updateSlider();
  startSlideShow();

  // =======================
  // INDICADOR DE SCROLL (clicável)
  // =======================
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("sobre");
      if (aboutSection) {
        const pos = aboutSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: pos - 70, behavior: "smooth" });
      }
    });
  }
});
