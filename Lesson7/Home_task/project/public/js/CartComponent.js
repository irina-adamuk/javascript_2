Vue.component('cart', {
   template: ` <div>
                  <button class="cart__btn" type="button" @click="showCart = !showCart">
                     <span class="cart__count">{{ cartCount }}</span>
                  </button>
                  <div class="cart__block" v-show="showCart">
                     <p class="cart__message" v-if="!cartItems.length">Корзина пуста</p>
                     <cart-item class="cart__item-wrapper" v-for="item of cartItems"
                     :key="item.id_product"
                     :cart-item="item"
                     :img="imgCart"
                     @remove="remove"></cart-item>
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
         let find = this.cartItems.find(element => element.id_product === product.id_product);
            if (find) {
               this.$parent.putJson(`${API}/api/cart/${find.id_product}`, {quantity: 1, option: "plus"})
               .then(() => {
                  find.quantity++;
                  this.updateCounter();
               });
               
            } else {
               let prod = Object.assign({quantity: 1}, product);
               this.$parent.postJson(`${API}/api/cart`, prod)
                  .then(data => {
                     if (data.result ===1) {
                        this.cartItems.push(prod);
                        this.updateCounter();
                     }
                  });
               
            }
      },
      remove(item) {
         if (item.quantity > 1) {
            this.$parent.putJson(`${API}/api/cart/${item.id_product}`, {quantity: 1, option: "minus"})
            .then(data => {
               if (data.result === 1) {
                  item.quantity--;
                  this.updateCounter();
               }
            })
         } else {
            this.$parent.deleteJson(`${API}/api/cart/${item.id_product}`)
            .then(data => {
               if (data.result === 1) {
                  this.cartItems.splice(this.cartItems.indexOf(item), 1);
                  this.updateCounter();
               }
            });
         };
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
      this.$parent.getJson(`${API}/api/cart`)
         .then(data => {
            for (let el of data.contents) {
               this.cartItems.push(el);
            }
            this.updateCounter();
         });
   }
})

Vue.component('cart-item', {
   props: ['cartItem', 'img'],
   template: `
         <div class="cart__item-wrapper">
            <div class="cart__top"></div>
            <div class="cart__item" >
               <div class="cart__left-block">
                  <img :src="img" alt="Some image">
                  <div class="product__inner">
                     <p class="product__title">{{cartItem.product_name}}</p>
                     <p class="product__quantity">Количество: {{cartItem.quantity}}</p>
                     <p class="product__single-price">{{cartItem.price}}₽ за единицу</p>
                  </div>
               </div>
               <div class="cart__right-block">
                  <p class="product__price">{{cartItem.quantity*cartItem.price}}₽</p>
                  <button class="btn--del" @click="$emit('remove', cartItem)">&times;</button>
               </div>
            </div>
            <div class="cart__bottom"></div>
         </div>
   `
})