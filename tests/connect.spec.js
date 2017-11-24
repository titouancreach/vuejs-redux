import Vue from 'vue';
import { createStore, bindActionCreators } from 'redux';
import connect from '../index.js';
import testComponent from './test.vue';

test('Test wrapper component', () => {
   const exampleReducer = (state = { foo: 'bar' }, actions) => actions;
   const store = createStore(exampleReducer);
   const mapStateToProps = (state) => ({ myState: state });
   const mapDispatchToProps = (dispatch) => ({});
   const highOrderComponent = connect(store)(mapStateToProps, mapDispatchToProps)(testComponent);

   // if the component mount, that mean the prop is passed
   const vm = new Vue(highOrderComponent).$mount();

   // test if our component have a children
   expect(vm.$children).toBeTruthy();
});