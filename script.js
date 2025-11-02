let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');

};
 

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                  .querySelector(`header nav a[href*="#${id}"]`)
                  .classList.add('active');
            });
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);


    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};



ScrollReveal({ 
    // reset: true ,//
     distance: '80px',
     duration:2000,
     delay:200
 });
 
 ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
 ScrollReveal().reveal('.home-img, .skill-conteiner, .projects-box, .contact form ', { origin: 'bottom' });
 ScrollReveal().reveal('.home-content h1, .about-img ', { origin: 'left' });
 ScrollReveal().reveal('.home-content p, .about-content ', { origin: 'right' });
 





 (function () {
  // 1) Определи езика от <html lang="...">
  const lang = (document.documentElement.getAttribute('lang') || 'bg').toLowerCase();

  // 2) Думички за всеки език
  const STRINGS = {
    bg: ['От и до летище', 'Междуградски', 'Хотелски'],
    en: ['Airport transfers', 'Intercity', 'Hotel transfers'],
    ru: ['Трансферы в аэропорт', 'Междугородние', 'Отельные трансферы']
  };

  // 3) Избери набора според езика (fallback към BG)
  const words = STRINGS[lang] || STRINGS.bg;

  // 4) Стартирай Typed.js
  if (document.querySelector('.multiple-text')) {
    new Typed('.multiple-text', {
      strings: words,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });
  }
})();



//модал//

(function(){
    const modal = document.getElementById('reservationModal');
    const openBtns = document.querySelectorAll('.skills-box .btn');
  
    // Отваряне на модала
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      });
    });
  
    // Затваряне (бутон или backdrop)
    modal.addEventListener('click', (e) => {
      if (e.target.dataset.close === 'true') closeModal();
    });
  
    // Затваряне с Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
  
    function closeModal(){
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  })();


  (function(){
    const form  = document.getElementById('contactForm');
    const toast = document.getElementById('formToast');

    function showToast(msg, ok=true){
      toast.textContent = msg;
      toast.style.borderColor = ok ? 'rgba(123,247,85,.35)' : 'rgba(255,99,99,.35)';
      toast.classList.add('show');
      setTimeout(()=> toast.classList.remove('show'), 3000);
    }

    function validPhone(value){
      return /^\+?\d[\d\s-]{7,}$/.test(value.trim());
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      const errs = [];

      if(!data.name) errs.push('Моля, въведете име.');
      if(!data.phone || !validPhone(data.phone)) errs.push('Моля, въведете валиден телефон.');
      if(!data.from) errs.push('Моля, въведете начален адрес/летище.');
      if(!data.to) errs.push('Моля, въведете дестинация.');
      if(!data.date) errs.push('Моля, изберете дата.');
      if(!data.time) errs.push('Моля, изберете час.');

      if(errs.length){
        showToast(errs[0], false);
        return;
      }

      // 👉 Вариант 1: отвори готов имейл с попълнени данни (без бекенд)
      const subject = encodeURIComponent('Запитване за трансфер');
      const body = encodeURIComponent(
`Име: ${data.name}
Телефон: ${data.phone}
Имейл: ${data.email || '-'}
Пътници: ${data.passengers || '-'}
От: ${data.from}
До: ${data.to}
Дата: ${data.date}
Час: ${data.time}
Доп. информация: ${data.message || '-'}

-- изпратено от формата в сайта`
      );
      window.location.href = `mailto:info@traveltransfers.bg?subject=${subject}&body=${body}`;

      // 👉 Вариант 2 (по твой избор): изпрати към WhatsApp със сумарно съобщение
      // const waMsg = encodeURIComponent(`Запитване за трансфер: ${data.from} → ${data.to} | Дата ${data.date} ${data.time} | Пътници: ${data.passengers} | Тел: ${data.phone}`);
      // window.open(`https://wa.me/359888123456?text=${waMsg}`, '_blank');

      form.reset();
      showToast('Благодарим! Отваряме имейл с вашето запитване…');
    });
  })();

// езици бутони //


// Скриване на бутона при видим футър
(function(){
  const fab = document.querySelector('.langfab');
  const footer = document.querySelector('footer');
  if(!fab || !footer) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      fab.style.opacity = entry.isIntersecting ? '0' : '1';
      fab.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
      fab.style.transition = 'opacity 0.3s ease';
    });
  }, { threshold: 0.2 });

  observer.observe(footer);
})();



















  














(function(){
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');

  function showToast(msg, ok = true){
    if(!toast){ alert(msg); return; }
    toast.textContent = msg;
    toast.style.borderColor = ok ? 'rgba(123,247,85,.35)' : 'rgba(255,99,99,.35)';
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 4000);
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Progressive enhancement: оставяме action/method за fallback без JS,
    // но тук ще изпратим чрез fetch, за да не напускаме страницата.
    e.preventDefault();

    // HTML5 валидация
    if (!form.reportValidity()) return;

    // Подгответе FormData (добавяме _replyto от полето email ако има)
    const fd = new FormData(form);
    if (form.email && form.email.value) fd.set('_replyto', form.email.value);

    const submitBtn = form.querySelector('button[type=\"submit\"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Изпращане…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showToast('Благодарим! Запитването е изпратено успешно. Ще се свържем с вас скоро.', true);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = Array.isArray(data?.errors) && data.errors.length
          ? data.errors.map(e => e.message).join(', ')
          : 'Възникна грешка при изпращането. Опитайте отново.';
        showToast(msg, false);
      }
    } catch (err) {
      showToast('Няма връзка или сървърна грешка. Опитайте по-късно.', false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Изпрати запитване';
      }
    }
  });
})();

  