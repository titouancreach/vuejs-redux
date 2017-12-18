import Vue from 'vue/dist/vue.js'
import StoreProvider from './StoreProvider.vue';
import TwoStoreProvider from './TwoStoreProvider.vue';

test('Test wrapper component', () => {
  const testProvider = {
    components: { StoreProvider },
    render: (h) => h(StoreProvider),
  };

   const vm = new Vue(testProvider).$mount();
});

test('Test wrapper component', () => {
  const testProvider = {
    components: { TwoStoreProvider },
    render: (h) => h(TwoStoreProvider),
  };

  const vm = new Vue(testProvider).$mount();
});


