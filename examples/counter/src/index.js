import Vue from 'vue';
import Counter from './Components/CounterContainer';

new Vue({
  components: { Counter },
  render: h => h(Counter)
}).$mount('#app');