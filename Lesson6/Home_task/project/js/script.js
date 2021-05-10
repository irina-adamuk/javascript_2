'use strict';

Vue.component('product-filter', {
   template: `<form action="#" class="search__form" @submit.prevent="$parent.filter(userSearch)">
                  <input type="text" class="search__field" v-model="userSearch">
                  <button class="search__btn" type="submit">
                     <i class="fas fa-search"></i>
                  </button>
               </form>`,
   data () {
      return {
         userSearch: ''
      }
   }
})

Vue.component('cart', {
   template: ` <div>
                  <button class="cart__btn" type="button" @click="showCart = !showCart">
                     <span class="cart__count">{{ cartCount }}</span>
                  </button>
                  <div class="cart__block" v-show="showCart">
                     <p class="cart__message" v-if="!cartItems.length">Корзина пуста</p>
                     <div class="cart__item-wrapper" v-for="item of cartItems" :key="item.id_product">
                        <div class="cart__top"></div>
                           <div class="cart__item" >
                              <div class="cart__left-block">
                                 <img :src="imgCart" alt="Some image">
                                 <div class="product__inner">
                                    <p class="product__title">{{item.product_name}}</p>
                                    <p class="product__quantity">Количество: {{item.quantity}}</p>
                                    <p class="product__single-price">{{item.price}}₽ за единицу</p>
                                 </div>
                              </div>
                              <div class="cart__right-block">
                                 <p class="product__price">{{item.quantity*item.price}}₽</p>
                                 <button class="btn--del" @click="remove(item)">&times;</button>
                              </div>
                           </div>
                        <div class="cart__bottom"></div>
                     </div>
                  </div>
               </div>`,
   data () {
      return {
         imgCart: 'https://place-hold.it/50x70/D7B399',
         cartUrl: '/getBasket.json',
         cartItems: [],
         showCart: false,
         cartCount: 0
      }
   },
   methods: {
      addProduct(product) {
         this.$parent.getJson(`${API}/addToBasket.json`)
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
      remove(item) {
         this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
      updateCounter() {
         let counter = 0;
         this.cartItems.forEach(item => {
            counter += item.quantity;
         });
         this.cartCount = counter;
      }
   },
   mounted() {
      this.$parent.getJson(`${API + this.cartUrl}`)
         .then(data => {
         for (let el of data.contents) {
            this.cartItems.push(el);
         }
         this.updateCounter();
   });
   }
})

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
   el: '#app',
   data: {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
      imgCatalog: 'https://place-hold.it/200x150/D7B399',
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
         this.$refs.cart.addProduct(product);         
      },
      filter(value) {
         let regexp = new RegExp(value, 'i');
         this.filtered = this.products.filter(el => regexp.test(el.product_name));
      },
   },
   mounted () {
      this.getJson(`${API + this.catalogUrl}`)
         .then(data => {
            for (let el of data) {
               this.products.push(el);
               this.filtered.push(el);
            }
      });
   },
});


