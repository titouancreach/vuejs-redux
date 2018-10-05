import Vue from 'vue'
import CounterProvider from './Components/CounterProvider.vue'

new Vue({
  components: {CounterProvider},
  render: h => h(CounterProvider),
}).$mount('#app')
