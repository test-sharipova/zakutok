//menu
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
    
//корзина
    let products = document.querySelectorAll('.product__card'),
        buttons = document.querySelectorAll('.btn_mini'),
        openBtn = document.querySelectorAll('.open'),
        openBtn2 = document.querySelectorAll('.product__incart');
    

    let field = document.querySelector('.product__field'),
        cart = document.querySelector('.product__cart'),
        overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.product__closeBtn');

    buttons.forEach(function(item, i){
        item.addEventListener('click', function(){
            let item = products[i].cloneNode(true),   //клонировать карточку продукта в переменную item
                btn = item.querySelector('button'),   //найти там кнопку
                btnOrder = products[i].querySelector('button'),   //найти кнопку в карточке, которая на странице
                btnIncart = products[i].querySelector('.product__incart'),   //найти в карточке кнопку, которая показывает, что товар в корзине
                count = document.createElement('input');  //создаем кнопку удаления товара
            //     count.classList.add('product__count');   //добавить класс к кнопке удаления товара
            //     count.setAttribute('value', '1');
            //     count.setAttribute('type', 'number');
            //     count.setAttribute('inputmode', 'numeric');

            // item.appendChild(count);   //добавить кнопку удаления товара к товару в корзине
                
            btn.remove();
            field.appendChild(item);
            btnOrder.remove();
            btnIncart.style.display = 'flex';
        });
    });

    //подсчет суммы товаров
    function openCart() {
        let prices = field.querySelectorAll('.product__card__price');
        let totalSum = 0;
        
        prices.forEach(price => {
            totalSum += parseFloat(price.innerText);
        });
        
        let result0 = document.querySelector('.result__wrap');
        if(result0) {
            result0.remove();
        }
        let result = document.createElement('input'),
            textSum = document.createElement('p'),
            sumWrap = document.createElement('div');

        result.setAttribute('readonly', 'readonly');
        result.setAttribute('name', 'summ');
        result.classList.add('result');

        textSum.textContent = "На сумму:";

        sumWrap.classList.add('result__wrap');

        field.appendChild(sumWrap);
        sumWrap.appendChild(textSum);
        sumWrap.appendChild(result);
        
        result.value = totalSum;
        console.log(totalSum);

        cart.style.display = 'block';
        overlay.style.display = 'block';
    }
    function closeCart() {
        cart.style.display = 'none';
        overlay.style.display = 'none';
    }

    openBtn.forEach(function(item){
        item.addEventListener('click', openCart);
    });
    
    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    openBtn2.forEach(function (item){
        item.addEventListener('click', openCart);
    });


   //яндекс карты
   ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [45.036811, 38.996491],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Фермерский закуток',
            balloonContent: 'Фермерский закуток. Краснодар, Северная улица, 490'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/cart2.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

        

    myMap.geoObjects
        .add(myPlacemark);
});
});