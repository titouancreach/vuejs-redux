<template>
  <Provider
    :mapDispatchToProps="mapDispatchToProps"
    :mapStateToProps="mapStateToProps"
    :store="store"
  >
    <template
      #default="{ counterValue, counterValue2, counterValue3, actions }"
    >
      <Counter
        :counterValue="counterValue"
        :counterValue2="counterValue2"
        :counterValue3="counterValue3"
        :actions="actions"
        :title="title"
      />
    </template>
  </Provider>
</template>

<script>
import { bindActionCreators } from 'redux'
import Provider from '../../../../bundle.js'
import Counter from './Counter.vue'
import * as Actions from '../Actions'
import store from '../configure_store'

export default {
  methods: {
    mapStateToProps(state) {
      return {
        counterValue: state.counter.count,
        counterValue2: state.counter.count2,
        counterValue3: state.counter2.count6,
      }
    },

    mapDispatchToProps(dispatch) {
      return { actions: bindActionCreators(Actions, dispatch) }
    },
  },
  components: {
    Counter,
    Provider,
  },
  data() {
    return {
      store,
      title: 'Counter using vuejs-redux',
    }
  },
}
</script>
