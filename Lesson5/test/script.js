let app = new Vue ({
   el: '#app',
   data: {
      product: 'Socks',
      description: 'A pair of warm fuzzy socks',
      image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inStock: false,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
         {
            variantId: 2234,
            variantColor: "green",
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
         },
         {
            variantId: 2235,
            variantColor: "blue",
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'   
         }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      cart: 0,
   },
   methods: {
      addToCart() {
         this.cart += 1
      },
      removeFromCart() {
         this.cart -= 1
      },
      updateProduct(variantImage) {
         this.image = variantImage
      }
   }
})