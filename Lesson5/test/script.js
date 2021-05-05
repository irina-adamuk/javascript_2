Vue.component('product-details', {
   props: {
      details: {
         type: Array,
         required: true
      }
   },
   template: `
      <ul>
         <li v-for="detail in details">{{ detail }}</li>
      </ul>
   `
})


Vue.component('product', {
   props: {
      premium: {
         type: Boolean,
         required: true
      }
   },
   template: `
      <div class="product">

         <div class="product-image">
            <img :src="image" alt="image">
         </div>

         <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <a href="link" target="_blank">More products like this</a>
            <p v-if="inStock">In Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p>{{ sale }}</p>

            <product-details :details="details"></product-details>

            <ul>
               <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <div v-for=" (variant, index) in variants" 
               :key="variant.variantId"
               class="color-box"
               :style="{ backgroundColor: variant.variantColor}"
               @mouseover="updateProduct(index)">
            </div>
      

            <button @click="addToCart"
               :disabled="!inStock"
               :class="{ disabledButton: !inStock}">Add to Cart
            </button>

            <button @click="removeFromCart"
               :disabled="!inStock"
               :class="{ disabledButton: !inStock}"
               >Remove from cart
            </button>

         </div><!-- /.product-info -->
      </div>
   `,
   data() {
      return {
         product: 'Socks',
         brand: 'Veu Mastery',
         description: 'A pair of warm fuzzy socks',
         selectedVariant: 0,
         link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
         onSale: true,
         details: ["80% cotton", "20% polyester", "Gender-neutral"],
         variants: [
            {
               variantId: 2234,
               variantColor: "green",
               variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
               variantQuantity: 10
            },
            {
               variantId: 2235,
               variantColor: "blue",
               variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
               variantQuantity: 0   
            }
         ],
         sizes: ['S', 'M', 'L', 'XL', 'XXL'],
         onSale: true,
      }
   },
   methods: {
      addToCart() {
         this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      removeFromCart() {
         this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct(index) {
         this.selectedVariant = index
         console.log(index)
      }
   },
   computed: {
      title() {
         return this.brand + ' ' + this.product
      },
      image() {
         return this.variants[this.selectedVariant].variantImage
      },
      inStock() {
         return this.variants[this.selectedVariant].variantQuantity
      },
      sale() {
         if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale'
         }
            return this.brand + ' ' + this.product + ' are not on sale'
      },
      shipping() {
         if (this.premium) {
            return "Free"
         }
            return 2.99
      }
   }
})

let app = new Vue ({
   el: '#app',
   data: {
      premium: true,
      cart: []
   },
   methods: {
      updateCart (id) {
         this.cart.push(id)
      },
      removeItem (id) {
         for(let i = this.cart.length - 1; i>= 0; i--) {
            if (this.cart[i] === id) {
               this.cart.splice(i, 1);
            }
         }
      }
   }
})