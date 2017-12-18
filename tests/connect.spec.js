import Vue from 'vue/dist/vue.js'
import StoreProvider from './StoreProvider.vue';

test('Test wrapper component', () => {
  const testProvider = {
    components: { StoreProvider },
    render: (h) => h(StoreProvider),
  };

   const vm = new Vue(testProvider).$mount();
});

