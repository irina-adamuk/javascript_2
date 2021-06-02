Vue.component('error', {
   template: `
         <div class="error__block" v-if="isVisible"> 
            <p class="error__message">
               <button class="btn--close" @click="setError('')">&times;</button>
               {{ text }}
            </p>
         </div>
   `,
   data () {
      return {
         text: ''
      }
   },
   methods: {
      setError(error) {
         this.text = error
      }
   },
   computed: {
      isVisible() {
         return this.text !== ''
      }
   }
})