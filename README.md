# vuejs-redux
[![npm version](https://badge.fury.io/js/vuejs-redux.svg)](https://badge.fury.io/js/vuejs-redux)

## Description
Simple integration between Vue.js and Redux. Helps to use multiple store if and when needed. Works in the same way as Render Props does in React. It uses Scoped Slot. [Reade my article about it](https://medium.com/@titouan.creach_44544/emulate-render-props-in-vuejs-c14086dc8dfa)

Note:
The previous version was made using HOC. This version uses Scoped slots instead.
No more magic with the connect methods. Everything is explicit and will prevent props collision
and an [ugly bug with the render function](https://github.com/vuejs/vue/issues/6201).

Why you should use it:

  - 45 lines of code (Easy to read/understand), easy to extend.
  - Same API as [react-redux](https://github.com/reactjs/react-redux).
  - Combine multiple Provider to be hydrated from multiple sources.
  - No hard coded dependencies between 'Vue' and the store, so more composable.
  - No dependencies at all
  - Not polluted `data` (you can use the power of the `functional component`)
  - Debuggable in the vue devtool browser extension.
  - Elegant JSX syntax
    
# Install
  
  ```
  npm install --save vuejs-redux
  ```

# Counter example

Let's build a simple counter app. (The full code can be found in the `example/` directory.

Start with a reducer:

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
 And create the action creators in order to update our state:

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

We can now create the CounterProvider Component. It act as a Provider for our CounterComponent:

```vue
<template>
  <Provider :mapDispatchToProps="mapDispatchToProps" :mapStateToProps="mapStateToProps" :store="store">
    <template slot-scope="{counterValue, actions}"> <!-- We our state via slot-scope. Passing down the props to the component is no more hidden -->
      <Counter :counterValue="counterValue" :actions="actions" :title="title" /> <!-- explicitly pass other props (title) -->
    </template>
  </Provider>
</template>
```
```javascript
import { createStore, bindActionCreators } from 'redux';
import Provider from 'vuejs-redux';
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

  data: () => ({
    store: createStore(counter),
    title: 'Counter using vuejs-redux'
  })

}
```

And finally our Counter component:

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
    props: ['actions', 'counterValue'] // provided by our Provider
  };
</script>
```

Our Counter component is not aware we are using redux.

If you use JSX, you can use the same syntax as React render props. (More elegant IMO)
```jsx
render(h) {
    return (
      <Provider mapDispatchToProps={this.mapDispatchToProps} mapStateToProps={this.mapStateToProps} store={this.store}>
        {({actions, counterValue}) => (
          <Counter counterValue={counterValue} actions={actions} title={this.title} />
        )}
      </Provider>
    );
  },
```

# Multiple store

You can combine multiple store if needed. Just use the Provider component multiple time.
You can obviously create a helper component to compose this.

```vue
<template>
  <Provider
    :store=storeOne
    :mapStateToProps=mapStateToPropsOne
    :mapDispatchToProps=mapDispatchToPropsOne>
      <template slot-scope="{myStateOne, myActionOne}">
        <!-- Use our second provider -->
        <Provider
          :store=storeTwo
          :mapStateToProps=mapStateToPropsTwo
          :mapDispatchToProps=mapDispatchToPropsTwo>
          <template slot-scope="{myStateTwo, myActionTwo}">
            <!-- render our component here -->
            <Child :stateOne=myStateOne :stateTwo=myStateTwo .../>
          </template>
        </Provider>
      </template>
    </Provider
</template>
```

This is plugin is compatible with [rematch](https://github.com/rematch/rematch): [live example](https://codesandbox.io/s/n3373olqo0)


# CONTRIBUTING

Feel free to create issues or pull requests if needed.
