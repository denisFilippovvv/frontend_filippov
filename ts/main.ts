// Объявление расширения для Window
interface Window {
    swiperAPI?: {
        slideTo: (index: number) => void;
        getRealIndex: () => number;
    };
}

interface Card {
    name: string;
    body: string;
    image: string;
}

class CardManager {
    private readonly DEFAULT_CARDS: Card[] = [
        {
            name: "Professional Profile",
            body: "We know finding the right job is stressful...",
            image: "img/professional-profil.png"
        },
        {
            name: "Best Portfolio",
            body: "Create a free portfolio...",
            image: "img/best-portfolio.jpg"
        },
        {
            name: "Powerful Resume", 
            body: "Stand out with our resume builder...",
            image: "img/powerful-resume.jpg"
        }
    ];

    private renderCardsAndSlides(cards: Card[]): void {
        const columnsContainer = document.querySelector<HTMLDivElement>('.columns');
        const swiperWrapper = document.querySelector<HTMLDivElement>('.swiper-wrapper');

        if (!columnsContainer || !swiperWrapper) {
            console.error('Контейнеры .columns или .swiper-wrapper не найдены.');
            return;
        }

        columnsContainer.innerHTML = '';
        swiperWrapper.innerHTML = '';

        cards.forEach((card, index) => {
            columnsContainer.insertAdjacentHTML('beforeend', `
                <div class="feature ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <h3>${card.name}</h3>
                    <p>${card.body}</p>
                </div>
            `);

            swiperWrapper.insertAdjacentHTML('beforeend', `
                <div class="swiper-slide">
                    <img src="${card.image}" 
                         class="swiper-lazy"
                         loading="lazy"
                         alt="${card.name}">
                    <div class="swiper-lazy-preloader"></div>
                </div>
            `);
        });

        document.querySelectorAll<HTMLDivElement>('.feature').forEach((feature, index) => {
            feature.addEventListener('click', () => {
                document.querySelectorAll<HTMLDivElement>('.feature').forEach((f) => {
                    f.classList.remove('active');
                });
                feature.classList.add('active');
                
                // Проверка и вызов swiperAPI
                if (window.swiperAPI) {
                    window.swiperAPI.slideTo(index);
                }
            });
        });
    }

    public renderCards(): void {
        this.renderCardsAndSlides(this.DEFAULT_CARDS);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cardManager = new CardManager();
    cardManager.renderCards();
});