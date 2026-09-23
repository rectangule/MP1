/* Your JS here. */
console.log('Hello World!')


const navbar = document.getElementById('navbar');
const NAV_SCROLL_THRESHOLD = 60;

function updateNavbarSize() {
  if (window.scrollY > NAV_SCROLL_THRESHOLD) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}


const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function updateActiveLink() {
  const navHeight = navbar.getBoundingClientRect().height;
  const scrollBottom = window.scrollY + document.documentElement.clientHeight;
  const pageBottom = document.documentElement.scrollHeight;

  
  if (scrollBottom >= pageBottom - 2) {
    setActiveLink(sections[sections.length - 1].id);
    return;
  }

 
  let currentId = sections[0].id;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navHeight + 5) {
      currentId = section.id;
    }
  }
  setActiveLink(currentId);
}

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === id);
  });
}


navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  updateNavbarSize();
  updateActiveLink();
});

window.addEventListener('load', () => {
  updateNavbarSize();
  updateActiveLink();
});


const track = document.getElementById('carouselThings');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('forward');
const prevBtn = document.getElementById('back');
const indicatorsContainer = document.querySelector('.carousel_indicators');

let currentSlide = 0;


slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('carousel_indicator');
  if (index === 0) dot.classList.add('active');
  dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
  dot.addEventListener('click', () => goToSlide(index));
  indicatorsContainer.appendChild(dot);
});
const dots = Array.from(indicatorsContainer.children);

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));


const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const thingBios = {
  mudkip: {
    name: 'Mudkip',
    bio: 'Known for its balanced stats and the reliable Water Gun / Ice Beam combo. But it is mid at best.',
  },
  torchic: {
    name: 'Torchic',
    bio: 'Evolves into the Fire/Fighting dual-type Blaziken. The best pokemon (totally unbiased).',
  },
  treecko: {
    name: 'Treecko',
    bio: 'Prized for its Speed stat and the Overgrow ability that boosts Grass moves in a pinch. But who actually picks this?',
  },
};

document.querySelectorAll('.modal_button').forEach((button) => {
  button.addEventListener('click', () => {

    const key = button.dataset.thing || button.dataset.things;
    const thing = thingBios[key];
    if (!thing) return;
    modalContent.innerHTML = `<h3>${thing.name}</h3><p>${thing.bio}</p>`;
    modalOverlay.classList.add('open');
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
