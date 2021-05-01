'use strict';

// Задание 1) Переделайте makeGETRequest() так, чтобы она использовала промисы
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };


// let getRequest = function(url) {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     });
// };


// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

class Cart {
    constructor(container = '.cart-box') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._render();
        this._init();
    }

    _init() {
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('show');
        });
    };
    
    
    addProduct(element) {
        let productId = +element.dataset['id'];
        let find = this._allProducts.find(product => product.id_product === productId);
        if(find){
            find.quantity++;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +element.dataset['price'],
                product_name: element.dataset['name'],
                quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this._goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this._render();
        }
    };

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    };

    _render() {
        const block = document.querySelector(this.container);

        for(const good of this._goods) {
            const item = new CartItem(good);
            this._allProducts.push(item);
            block.insertAdjacentHTML('afterbegin', item.render());
        }
    }
}

class CartItem {
    constructor(product, img = "https://place-hold.it/100") {
        this.img = img;
        this.title = product.title;
        this.price = product.price;
        this.quantity = product.quantity;
        this.id = product.id;
    }

    render() {
        return `<div class="cart-item" data-id=${this.id}>
                    <img class="product-img" src=${this.img} alt="Product">
                    <h3 class="product-title">${this.title}</h3>
                    <p class="product-price">${this.price} rub.</p>
                    <p class="product-quantity">${this.quantity}</p>
                    <button class="del-btn">x</button>
                </div>`;
    }
}


class ProductList {
    constructor(cart, container = '.products') {
        this.cart = cart;
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._fetchGoods();
        this._render();
        this._init();
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        });
    }

    _fetchGoods() {
        this._goods = [
                {id: 1, title: 'Dress', price: 2000},
                {id: 2, title: 'T-shirt', price: 1500},
                {id: 3, title: 'Dress', price: 5000},
                {id: 4, title: 'T-shirt', price: 2500},
            ];
    }
    _render() {
        const block = document.querySelector(this.container);

        for(const good of this._goods) {
            const productObject = new ProductItem(good);
            console.log(productObject);
            // this.allProducts.push(new ProductItem(good));
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
    getTotalSum() {
        let sum = 0;
        this._goods.forEach((good) => {
            sum += good.price;
        });
        // console.log(`Total sum: ${sum}`);
        return sum;
    }

}
class ProductItem {
    constructor(product, img = "https://place-hold.it/205/211") {
        this.img = img;
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
    }

    render() {
        return `<div class="product-item" data-id=${this.id}>
                    <img class="product-img" src=${this.img} alt="Product">
                    <h3 class="product-title">${this.title}</h3>
                    <p class="product-price">${this.price} rub.</p>
                    <button class="buy-btn" data-id="${this.id}" data-name="${this.title}" data-price="${this.price}">Add to cart</button>
                </div>`;
    }
}

new ProductList(new Cart());


