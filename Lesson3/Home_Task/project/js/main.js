'use strict';

// Задание 1) Переделайте makeGETRequest() так, чтобы она использовала промисы
let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('Error');
            } else {
                cb(xhr.responseText);
            }
        }
    };
    xhr.send();
};

// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.






class Cart {
    // Методы которые могут понадобиться:
    // add();
    // delete();
    // clear();
    // getTotalSum();
    // getTotalCount();
    // proceedToCheckout();
    // render();
}

class CartItem {
    // Методы которые могут понадобиться:
    // getItemSum()
}


class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._fetchGoods();
        this._render();
        this.getTotalSum();

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
                    <button class="buy-btn">Add to cart</button>
                </div>`;
    }
}

new ProductList();

