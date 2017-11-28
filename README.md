# vuejs-redux
[![npm version](https://badge.fury.io/js/vuejs-redux.svg)](https://badge.fury.io/js/vuejs-redux)

Simple binding between Vue and Redux.
This allows to use multiple store if needed.
This binding is inpired by [react-redux](https://github.com/reactjs/react-redux).
This work in inserting a High Order Component that is able to pass down the state, existing props and bounded actions to the child component.

Why you should use it:

  - 37 lines of code (Easy to read/understand), easy to extend.
  - Same API as [react-redux](https://github.com/reactjs/react-redux).
  - Combine multiple connect to be hydrated from multiple sources.
  - No hard coded dependencies between 'Vue' and the store, so more composable.
  - 0 dependency
  - Not polluated `data` (you can use the power of the `functional component`)
    
# Install
  
  ```
  npm install --save vuejs-redux
  ```

# V1.1.0
A new version is in progress. It includes:
  - Slots (default/named/scoped) (see [issue](https://github.com/titouancreach/vuejs-redux/issues/6))
  - Default value for `mapStateToProps` and `mapDispatchToProps`
  - More unit tests
  - Linter/Prettier
  - The build is now included in git and allows: `vuejs-redux: "titouancreach/vuejs-redux#v1.1.0"` in package.json.

# Counter example

Let's build a simple counter app. (The full code can be found in the `example/` directory.

Start with our reducer:

```javascript
export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}
```
 And create the action creators in order to update our state.

```javascript
export function increment() {
  return { 'type': 'INCREMENT' };
}

export function decrement() {
  return { 'type': 'DECREMENT' };
}

export function reset() {
  return { type: 'RESET' }
}
```

We can now create the CounterContainer Component. This is the High Order component that act as a proxy for our Counter component.

```javascript
import { createStore, bindActionCreators } from 'redux';
import { connect } from '../../../../bundle.js';
import * as Actions from '../Actions';
import Counter from './Counter.vue';
import { counter } from '../Reducers/Counter';

// Map the state to the key "counterValue"
function mapStateToProps(state) {
  return { counterValue: state };
}

// Bind the our action with the dispatch method and map them to the key "actions".
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

const store = createStore(counter);

export default connect(store)(mapStateToProps, mapDispatchToProps)(Counter);
```

And finally our Counter component.

```vue
<template functional> <!-- we can use functional component -->
  <div>
    <h1> Counter using vuejs-redux </h1>
    <div> {{ counterValue }} </div>
    <button @click="actions.increment()"> increment </button>
    <button @click="actions.decrement()"> decrement </button>
    <button @click="actions.reset()"> reset </button>
  </div>
</template>

<script>
  export default {
    props: ['actions', 'counterValue'] // provided by vuejs-redux
  };
</script>
```

Our Counter component is not aware we are using redux.

# Multiple store


Since the High Order Component pass down the props to the child, we can compose multiple `High Order Component` in order for the child to be hydrated with different sources.

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

If you don't have an access to the store in your Container components, you can simply curry the connect function:

```
const store = createStore(...); 
export default connect(store);
```
and voilà, you should be abe to use `connect(mapStateToProps, mapDispatchToProps)(Child)` directly.

# CONTRIBUTING

Feel free to create issues or pull requests if needed.


