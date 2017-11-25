# vuejs-redux
[![npm version](https://badge.fury.io/js/vuejs-redux.svg)](https://badge.fury.io/js/vuejs-redux)

Simple binding between Vue and Redux.
This allow to use multiple store if needed.
This binding is inpired by [react-redux](https://github.com/reactjs/react-redux).
This work in inserting a High Order Component that is able to pass down the state, existing props and bounded actions to the child component.

Why you should use it:

  - 37 lines of code (Easy to read/understand), easy to extend.
  - Same API as ̀[react-redux](https://github.com/reactjs/react-redux).
  - Combine multiple connect to be hydrated from multiple sources.
  - No hard coded dependencies between 'Vue' and the store, so more composable.
  - 0 dependency
  - Not polluated `data`
  

I'm aware that we should use one store to manage the whole state of our app. But in some specific cases, we need multi store.
  
# Install
  
  ```
  npm install --save vuejs-redux
  ```

# Example

ComponentContainer.js

```javascript
import { createStore, bindActionCreators } from 'redux';

import ChildComponent from 'child';

// for the exemple purpose, create dummy reducer and dummy store here.

function reducer(state = { foo: 'bar' }, action) {
  return state;
}

const store = createStore(reducer);

// like redux, create mapStateToProps and mapDispatchToProps
// the role of mapStateToProps is to map a part of the state to the child props.

// return an object where the keys are the prop name passed down to the child with its value.
function mapStateToProps(state) {
  return { propName: state };
}

// create our actions here (or import them from an other file)
function dummyAction1() {
  return { type: 'DUMMY1' };
}

function dummyAction2() {
  return { type: 'DUMMY2' };
}


// since we don't want to have a store instance into our component,
// we bind our actions with the dispatch function.

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ dummy1, dummy2 }, dispatch);
}

export default connect(store)(mapStateToProps, mapDispatchToProps)(Child);
```

and our child

```vue


export default {
  props: ['actions', 'propName'],

  mounted() {
    this.propName; // contain our state
    this.actions.dummy1(); // action available
    
    // state is updated when props change (e.g when component is re-render
    this.$nextTick(() => {
      this.propName; // <- here
    });
  }
}

```

Since the High Order Component pass down the props to the child, we can create multiple ̀`High Order Component` in order for the child to be hydrated with different sources.

```
export default
  connect(store2)(mapStateToProps2, mapDispatchToProps2)(
    connect(store)(mapStateToProps, mapDispatchToProps)(Child));
```

or 

```
const f = compose(
  connect(store2)(mapStateToProps2, mapDispatchToProps2), 
  connect(store)(mapStateToProps, mapDispatchToProps)
);

export default f(Child);
```

If you don't want to export the store you can simply currying the connect method

```
const store = createStore(...); 
export default connect(store);
```
and voilà


