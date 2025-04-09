'use strict';
document.addEventListener('DOMContentLoaded', () => {
  
let swiper; //инициализировал свайпер, чтобы в дальнешем можно было задавать ему функции при его "объявлении"

//FORM
document.querySelector('.header_button2').addEventListener('click', () => {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
});
document.querySelector('.header_button1').addEventListener('click', () => {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
});

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
}

document.querySelector('.cancel-button').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
      closeModal();
  }
});

document.querySelector('.modal-form').addEventListener('submit', (event) => {
  event.preventDefault();
  closeModal();
});



//SLIDER
swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 10000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
  },
  on: {
    slideChange: function () {
      if (swiper && typeof swiper.realIndex !== 'undefined') {
        const activeIndex = swiper.realIndex;
        const columns = document.querySelectorAll('.columns .feature');
        columns.forEach((col, index) => {
          if (index === activeIndex) {
            col.classList.add('active');
          } else {
            col.classList.remove('active');
          }
        });
      } else {
        console.error('Ошибка: объект swiper не инициализирован или realIndex недоступен.');
      }
    },
  },
});


//работа с карточками
const cards = {
  "card-1": {
    title: "Professional Profile",
    description: "We know finding the right job is stressful, so we’ve made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter",
    image: "../img/professional-profil.png"
  },
  "card-2": {
    title: "Best Portfolio",
    description: "We know finding the right job is stressful, so we’ve made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter",
    image: "../img/best-portfolio.jpg"
  },
  "card-3": {
    title: "Powerful Resume",
    description: "We know finding the right job is stressful, so we’ve made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by",
    image: "../img/powerful-resume.jpg"
  }
};


function insertCards(cards) {
  const columnsContainer = document.querySelector('.columns');
  if (!columnsContainer) {
    console.error('Контейнер .columns не найден в HTML.');
    return;
  }
  columnsContainer.innerHTML = '';
  Object.keys(cards).forEach(cardId => {
    const card = cards[cardId];
    const cardHTML = `
      <div class="feature" data-card-id="${cardId}">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
      </div>
    `;
    columnsContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}
insertCards(cards);

swiper.slideToLoop(0);


const columns = document.querySelectorAll('.columns .feature');
  columns.forEach((column, index) => {
    column.addEventListener('click', () => {
      columns.forEach(col => col.classList.remove('active'));
      column.classList.add('active');
      swiper.slideToLoop(index);
    });
  });

  if (columns.length > 0) {
    columns[0].classList.add('active');
  }


//PRELOADER
window.addEventListener('load', function() {
  setTimeout(function() {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('hidden');
  }, 1000);
  });



//SCROLLBAR PROBLEM
function measureScrollbar() {
  const div = document.createElement('div');
  div.style.overflow = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  
  document.body.appendChild(div);
  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  
  return scrollbarWidth;
}

let scrollbarWidth;// Переменная для хранения ширины скроллбара


document.addEventListener('DOMContentLoaded', () => {
  scrollbarWidth = measureScrollbar();  // Измеряем ширину скроллбара сразу при загрузке
  document.querySelector('.header_button2').addEventListener('click', handleLoginClick);
  document.querySelector('.header_button1').addEventListener('click', handleLoginClick);
});
//раюота с модальным окном
function handleLoginClick(event) {
  event.preventDefault();
  const modalOverlay = document.getElementById('modalOverlay');
    document.body.classList.add('modal-open');
    modalOverlay.style.display = 'flex';
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
}
document.querySelector('.cancel-button').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});



});
