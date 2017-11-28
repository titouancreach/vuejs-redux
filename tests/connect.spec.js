import Vue from 'vue/dist/vue.js'
import { createStore, bindActionCreators } from 'redux';
import { connect } from '../bundle.js';
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

test('Test if default slots are passed', () => {

  // create dummy store
  const exampleReducer = (state = { foo: 'bar' }, actions) => actions;
  const store = createStore(exampleReducer);
  const mapStateToProps = (state) => ({ myState: state });
  const mapDispatchToProps = (dispatch) => ({});

  // Child component with a slot in
  const testComponentWithSlot = {
    template: '<div><slot></slot></div>'
  };

  // create our highOrderComponent
  const highOrderComponent = connect(store)(mapStateToProps, mapDispatchToProps)(testComponentWithSlot);

  // Render our high order component with a div (which should be considered as the default slot
  const vm = new Vue({
    template: '<high-order-component><div></div></high-order-component>',
    components: {
      highOrderComponent
    }
  }).$mount();

  expect(vm.$children[0].$children[0].$slots.default).toBeTruthy();
});

test('Test if a named slots are passed', () => {

  // create dummy store
  const exampleReducer = (state = { foo: 'bar' }, actions) => actions;
  const store = createStore(exampleReducer);
  const mapStateToProps = (state) => ({ myState: state });
  const mapDispatchToProps = (dispatch) => ({});

  // Child component with a slot in
  const testComponentWithSlot = {
    template: '<div><slot></slot><slot name="myname"></slot></div>'
  };

  // create our highOrderComponent
  const highOrderComponent = connect(store)(mapStateToProps, mapDispatchToProps)(testComponentWithSlot);

  // Render our high order component with a div (which should be considered as the default slot
  const vm = new Vue({
    template: '<high-order-component><div></div><div slot="myname"></div></high-order-component>',
    components: {
      highOrderComponent
    }
  }).$mount();

  expect(vm.$children[0].$children[0].$slots.myname).toBeTruthy();
});

test('Test if a scoped slots are passed', () => {

  // create dummy store
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const mapStateToProps = (state) => ({});
  const mapDispatchToProps = (dispatch) => ({});

  // Child component with a slot in
  const testComponentWithSlot = {
    template: '<div><slot></slot><slot name="myname"></slot><slot name="myscoped" text="vuejs-redux"></slot></div>'
  };

  // create our highOrderComponent
  const highOrderComponent = connect(store)(mapStateToProps, mapDispatchToProps)(testComponentWithSlot);

  // Render our high order component with a div (which should be considered as the default slot
  const vm = new Vue({
    template: `
      <high-order-component>
        <div></div>
        <div slot="myname"></div>
        <div slot="myscoped" slot-scope="props" id="test">{{ props.text }}</div>
      </high-order-component>`,
    components: {
      highOrderComponent
    }
  }).$mount();

  expect(vm.$children[0].$children[0].$el.textContent.trim()).toBe('vuejs-redux');
  expect(vm.$children[0].$children[0].$slots.myname).toBeTruthy();
  expect(vm.$children[0].$children[0].$scopedSlots.myscoped).toBeTruthy();
  expect(vm.$children[0].$children[0].$slots.default).toBeTruthy();
});

test('All scope with composed connect', () => {

  // create dummy store
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const store2 = createStore(reducer);
  const mapStateToProps = (state) => ({});
  const mapDispatchToProps = (dispatch) => ({});

  // Child component with a slot in
  const testComponentWithSlot = {
    template: '<div><slot></slot><slot name="myname"></slot><slot name="myscoped" text="vuejs-redux"></slot></div>'
  };

  // create our highOrderComponent
  const highOrderComponent = connect(store2)(mapStateToProps, mapDispatchToProps)(connect(store)(mapStateToProps, mapDispatchToProps)(testComponentWithSlot));

  // Render our high order component with a div (which should be considered as the default slot
  const vm = new Vue({
    template: `
        <high-order-component>
          <div></div>
          <div slot="myname"></div>
          <div slot="myscoped" slot-scope="props" id="test">{{ props.text }}</div>
        </high-order-component>`,
    components: {
      highOrderComponent
    }
  }).$mount();

  expect(vm.$children[0].$children[0].$children[0].$el.textContent.trim()).toBe('vuejs-redux');
  expect(vm.$children[0].$children[0].$children[0].$slots.default).toBeTruthy();
  expect(vm.$children[0].$children[0].$children[0].$slots.myname).toBeTruthy();
  expect(vm.$children[0].$children[0].$children[0].$scopedSlots.myscoped).toBeTruthy();
});


test('default mapStateToProps and mapDispatchToProps default parameter', () => {
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const child = {
    template: '<div></div>'
  };
  const highOrderComponent = connect(store)()(child);
  const vm = new Vue({
    render: h => h(highOrderComponent),
    components: {
      highOrderComponent
    }
  }).$mount();
  expect(vm.$children[0].$attrs).toEqual({});
})

test('default mapStateToProps and mapDispatchToProps default parameter', () => {
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const child = {
    template: '<div></div>'
  };
  const highOrderComponent = connect(store)(null, null)(child);
  const vm = new Vue({
    render: h => h(highOrderComponent),
    components: {
      highOrderComponent
    }
  }).$mount();
  expect(vm.$children[0].$children[0].$attrs).toEqual({});
});


test('default mapStateToProps parameter', () => {
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const actionCreator = { foo: () => ({}) };
  const dispatchDispatchToProps = dispatch => ({ actions: bindActionCreators(actionCreator) })
  const child = {
    template: '<div></div>',
    props: ['actions']
  };
  const highOrderComponent = connect(store)(null, dispatchDispatchToProps)(child);
  const vm = new Vue({
    render: h => h(highOrderComponent),
    components: {
      highOrderComponent
    }
  }).$mount();
  expect(vm.$children[0].$children[0].actions).not.toEqual({});
});


test('default mapDispatchToProps parameter', () => {
  const reducer = (state = {}) => state;
  const store = createStore(reducer);
  const mapStateToProps = state => ({ myState: state });
  const child = {
    template: '<div></div>',
    props: ['myState']
  };
  const highOrderComponent = connect(store)(mapStateToProps)(child);
  const vm = new Vue({
    render: h => h(highOrderComponent),
    components: {
      highOrderComponent
    }
  }).$mount();
  expect(vm.$children[0].$children[0].myState).toEqual({});
});