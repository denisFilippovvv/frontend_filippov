var CardManager = /** @class */ (function () {
    function CardManager() {
        this.DEFAULT_CARDS = [
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
    }
    CardManager.prototype.renderCardsAndSlides = function (cards) {
        var columnsContainer = document.querySelector('.columns');
        var swiperWrapper = document.querySelector('.swiper-wrapper');
        if (!columnsContainer || !swiperWrapper) {
            console.error('Контейнеры .columns или .swiper-wrapper не найдены.');
            return;
        }
        columnsContainer.innerHTML = '';
        swiperWrapper.innerHTML = '';
        cards.forEach(function (card, index) {
            columnsContainer.insertAdjacentHTML('beforeend', "\n                <div class=\"feature ".concat(index === 0 ? 'active' : '', "\" data-index=\"").concat(index, "\">\n                    <h3>").concat(card.name, "</h3>\n                    <p>").concat(card.body, "</p>\n                </div>\n            "));
            swiperWrapper.insertAdjacentHTML('beforeend', "\n                <div class=\"swiper-slide\">\n                    <img src=\"".concat(card.image, "\" \n                         class=\"swiper-lazy\"\n                         loading=\"lazy\"\n                         alt=\"").concat(card.name, "\">\n                    <div class=\"swiper-lazy-preloader\"></div>\n                </div>\n            "));
        });
        document.querySelectorAll('.feature').forEach(function (feature, index) {
            feature.addEventListener('click', function () {
                document.querySelectorAll('.feature').forEach(function (f) {
                    f.classList.remove('active');
                });
                feature.classList.add('active');
                // Проверка и вызов swiperAPI
                if (window.swiperAPI) {
                    window.swiperAPI.slideTo(index);
                }
            });
        });
    };
    CardManager.prototype.renderCards = function () {
        this.renderCardsAndSlides(this.DEFAULT_CARDS);
    };
    return CardManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    var cardManager = new CardManager();
    cardManager.renderCards();
});
