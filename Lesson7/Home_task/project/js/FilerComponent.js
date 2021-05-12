Vue.component('product-filter', {
   template: `<form action="#" class="search__form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
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