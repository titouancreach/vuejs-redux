import { createStore, bindActionCreators } from 'redux';
import Provider from '../../../../bundle.js';
import * as Actions from '../Actions';
import Counter from './Counter.vue';
import { counter } from '../Reducers/Counter';

export default {

  methods: {
    mapStateToProps(state) {
      return {counterValue: state}
    },

    mapDispatchToProps(dispatch) {
      return {actions: bindActionCreators(Actions, dispatch)}
    }
  },

  components: {
    Counter,
    Provider
  },

  render(h) {
    return (
      <Provider mapDispatchToProps={this.mapDispatchToProps} mapStateToProps={this.mapStateToProps} store={this.store}>
        {({actions, counterValue}) => (
          <Counter counterValue={counterValue} actions={actions} title={this.title} />
        )}
      </Provider>
    );
  },

  data: () => ({
    store: createStore(counter),
    title: 'Counter using vuejs-redux'
  })

}

