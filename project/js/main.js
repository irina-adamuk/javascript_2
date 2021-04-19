'use strict';
const products = [
    {id: 1, img: "img/product01.png", title: 'Dress', price: 2000},
    {id: 2, img: "img/product02.png", title: 'T-shirt', price: 1500},
    {id: 3, img: "img/product01.png", title: 'Dress', price: 5000},
    {id: 4, img: "img/product02.png", title: 'T-shirt', price: 2500},
    {id: 5,},
    {id: 6},
    {id: 7},
    {id: 8},
];

const renderProduct = (img = "https://place-hold.it/205/211", title = 'Good', price = 0) => {
    return `<div class="product-item">
                <img class="product-img" src=${img} alt="Product">
                <h3 class="product-title">${title}</h3>
                <p class="product-price">${price} rub.</p>
                <button class="buy-btn">Add to cart</button>
            </div>`;
}

const renderProducts = (list = []) => {
    const productListHTML = list.map((item) => renderProduct(item.img, item.title, item.price)).join('');

    // ? товары были через запятую т.к. map формирует новый массив , чтобы запятой не было используем .join('')
    // console.log(productListHTML);
    document.querySelector('.products').innerHTML = productListHTML;
}

renderProducts(products);
