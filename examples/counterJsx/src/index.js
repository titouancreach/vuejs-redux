import Vue from 'vue';
import CounterProvider from './Components/CounterProvider.jsx';

new Vue({
  components: {CounterProvider},
  render: h => h(CounterProvider)
}).$mount('#app');