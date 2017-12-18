<template>
  <Provider
    :store=store
    :mapStateToProps=mapStateToProps
    :mapDispatchToProps=mapDispatchToProps>

    <template slot-scope="{myState}">
      <test-component :myState="myState"></test-component>
    </template>

  </Provider>
</template>

<script>
  import { createStore, bindActionCreators } from 'redux';
  import Provider from '../bundle.js';
  import testComponent from './test.vue';

  const exampleReducer = (state = { foo: 'bar' }, actions) => state;

  export default {

    methods: {
      mapStateToProps: (state) => ({ myState: state }),
      mapDispatchToProps: (dispatch) => ({})
    },

    data: (ctx) => ({
      store: createStore(exampleReducer)
    }),

    components: { Provider, testComponent }
  };
</script>