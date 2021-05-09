'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
   el: '#app',
   data: {
      catalogUrl: '/catalogData.json',
      userSearch: '',
      showCart: false,
      cartUrl: '/getBasket.json',
      products: [],
      cartItems: [],
      filtered: [],
      imgCatalog: 'https://place-hold.it/200x150/D7B399',
      imgCart: 'https://place-hold.it/50x70/D7B399',
      cartCount: 0
   },
   methods: {
      getJson(url) {
         return fetch(url)
         .then(result => result.json())
         .catch(error => {
            console.log(error);
         })
      },
      addProduct(product) {
         this.getJson(`${API}/addToBasket.json`)
            .then(data => {
               if (data.result === 1) {
                  let find = this.cartItems.find(element => element.id_product === product.id_product);
                  if (find) {
                     find.quantity++;
                  } else {
                     let prod = Object.assign({quantity: 1}, product);
                     this.cartItems.push(prod)
                  }
                  this.updateCounter();
               } else {
                  alert ('Error');
               }
         })
         
      },

      updateCounter() {
         let counter = 0;
         this.cartItems.forEach(item => {
            counter += item.quantity;
         });
         this.cartCount = counter;
      },

      remove(item) {
         this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
               if (data.result === 1) {
                  if (item.quantity > 1) {
                     item.quantity--;
                  } else {
                     this.cartItems.splice(this.cartItems.indexOf(item), 1)
                  }
                  this.updateCounter();
               }
         })
      },

      filter() {
         let regexp = new RegExp(this.userSearch, 'i');
         this.filtered = this.products.filter(el => regexp.test(el.product_name));
      },
   },
   created() {
      this.getJson(`${API + this.cartUrl}`)
         .then(data => {
            for (let el of data.contents) {
               this.cartItems.push(el);
            }
            this.updateCounter();
      });
      this.getJson(`${API + this.catalogUrl}`)
         .then(data => {
            for (let el of data) {
               this.products.push(el);
               this.filtered.push(el);
            }
      });
   },
});


