import { createStore, bindActionCreators } from 'redux';
import { connect } from '../../../../bundle.js';
import * as Actions from '../Actions';
import Counter from './Counter.vue';
import { counter } from '../Reducers/Counter';

function mapStateToProps(state) {
  return { counterValue: state };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

const store = createStore(counter);

export default connect(store)(mapStateToProps, mapDispatchToProps)(Counter);