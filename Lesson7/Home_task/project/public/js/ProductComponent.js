Vue.component('products', {
   template: `
         <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
         </div>
         `,
   data () {
      return {
         catalogUrl: '',
         products: [],
         filtered: [],
         imgCatalog: 'https://place-hold.it/200x150/D7B399',         
      }
   },
   methods: {
      filter(value) {
         let regexp = new RegExp(value, 'i');
         this.filtered = this.products.filter(el => regexp.test(el.product_name));
      },
   },
   mounted () {
      this.$parent.getJson(`${API}/api/products`)
         .then(data => {
            for (let el of data) {
               this.products.push(el);
               this.filtered.push(el);
            }
      });
   }
})

Vue.component('product', {
   props: ['product', 'img'],
   template: `
         <div class="product__item">
            <img :src="img" alt=" Some img">
            <div class="product__inner">
               <h3 class="product__title">{{ product.product_name}}</h3>
               <p class="product__price">{{ product.price }}₽</p>
               <button class="btn--buy" @click="cartAPI.addProduct(product)">Купить</button>                            
            </div>
         </div> `,
   data () {
      return {
         cartAPI: this.$root.$refs.cart,
      };
   }
})