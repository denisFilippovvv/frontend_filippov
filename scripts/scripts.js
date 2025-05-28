'use strict';

const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});
window.swiperAPI = {
    slideTo: (index) => swiper.slideToLoop(index),
    getRealIndex: () => swiper.realIndex
};


document.addEventListener('DOMContentLoaded', () => {
  // FORM
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

  // PRELOADER
  window.addEventListener('load', function() {
    setTimeout(function() {
      const preloader = document.querySelector('.preloader');
      preloader.classList.add('hidden');
    }, 1000);
  });

  // SCROLLBAR PROBLEM
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

  let scrollbarWidth;
  scrollbarWidth = measureScrollbar();

  // Создаём контейнеры для карточек и слайдера, если их нет в разметке
  if (!document.querySelector('.columns')) {
      const columnsDiv = document.createElement('div');
      columnsDiv.className = 'columns';
      // Вставляем columns перед swiper, если он есть, иначе в main
      const swiper = document.querySelector('.swiper');
      if (swiper && swiper.parentNode) {
          swiper.parentNode.insertBefore(columnsDiv, swiper);
      } else {
          document.querySelector('main')?.appendChild(columnsDiv);
      }
  }
  if (!document.querySelector('.swiper')) {
      const swiperHtml = `
          <div class="swiper">
              <div class="swiper-wrapper"></div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
          </div>
      `;
      document.querySelector('main')?.insertAdjacentHTML('beforeend', swiperHtml);
  }
});