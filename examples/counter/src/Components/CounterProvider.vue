<template>
  <Provider
    :mapDispatchToProps="mapDispatchToProps"
    :mapStateToProps="mapStateToProps"
    :store="store"
  >
    <template #default="{ counterValue, actions }">
      <Counter :counterValue="counterValue" :actions="actions" :title="title" />
    </template>
  </Provider>
</template>

<script>
import { createStore, bindActionCreators } from 'redux'
import Provider from '../../../../bundle.js'
import * as Actions from '../Actions'
import Counter from './Counter.vue'
import { counter } from '../Reducers/Counter'

export default {
  methods: {
    mapStateToProps(state) {
      return { counterValue: state }
    },

    mapDispatchToProps(dispatch) {
      return { actions: bindActionCreators(Actions, dispatch) }
    },
  },

  components: {
    Counter,
    Provider,
  },

  data: () => ({
    store: createStore(counter),
    title: 'Counter using vuejs-redux',
  }),
}
</script>
