<template>
  <Provider
    :store=storeOne
    :mapStateToProps=mapStateToPropsOne
    :mapDispatchToProps=mapDispatchToProps>

    <template slot-scope="{myStateOne}">
      <Provider
        :store=storeTwo
        :mapStateToProps=mapStateToPropsTwo
        :mapDispatchToProps=mapDispatchToProps>
          <template slot-scope="{myStateTwo}">
            <test-component :myStateOne="myStateOne" :myStateTwo="myStateTwo"></test-component>
          </template>
      </Provider>
    </template>
  </Provider>
</template>

<script>
  import { createStore, bindActionCreators } from 'redux';
  import Provider from '../bundle.js';
  import testComponent from './testTwoStore.vue';

  const exampleReducerOne = (state = { foo: 'bar' }, actions) => state;
  const exampleReducerTwo = (state = { foo: 'baz' }, actions) => state;

  export default {

    methods: {
      mapStateToPropsOne: (state) => ({myStateOne: state}),
      mapStateToPropsTwo: (state) => ({myStateTwo: state}),
      mapDispatchToProps: (dispatch) => ({})
    },

    data: (ctx) => ({
      storeOne: createStore(exampleReducerOne),
      storeTwo: createStore(exampleReducerTwo)
    }),

    components: { Provider, testComponent }
  };
</script>