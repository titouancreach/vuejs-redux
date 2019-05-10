# vuejs-redux

[![npm version](https://badge.fury.io/js/vuejs-redux.svg)](https://badge.fury.io/js/vuejs-redux)
[![Build Status](https://travis-ci.com/titouancreach/vuejs-redux.svg?branch=master)](https://travis-ci.com/titouancreach/vuejs-redux)
[![GitHub contributors](https://img.shields.io/github/contributors/titouancreach/vuejs-redux.svg)](https://github.com/titouancreach/vuejs-redux/graphs/contributors/)
[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/titouancreach)

## Description

Simple binding between Vue and Redux, allowing use of multiple stores.
It works, in the same way, like render props does in React. It uses Scoped Slot - [read my article about it](https://medium.com/@titouan.creach_44544/emulate-render-props-in-vuejs-c14086dc8dfa).

_Note:_
The previous version was using Higher Order Components (HOC); this version uses Scoped slots instead.
No more magic with the connect methods. Everything is explicit which will prevent props collision
and an [ugly trick with the render function](https://github.com/vuejs/vue/issues/6201).

Why you should use it:

- Just 45 lines of code.
- No dependencies at all
- Easy to read, understand, and extend.
- Same API as [react-redux](https://github.com/reactjs/react-redux).
- Combine multiple Providers to be populated by multiple sources.
- No hard coded dependencies between 'Vue' and the store, so more composable.
- Doesn't polluate `data`, so you can use the power of the `functional component`
- Debuggable in the [Vue devtool browser extension](https://github.com/vuejs/vue-devtools).
- Elegant JSX syntax.

# Table of Contents

- [vuejs-redux](#vuejs-redux)
  - [Description](#description)
  - [Install](#install)
  - [Counter example](#counter-example)
  - [Multiple stores](#multiple-stores)
  - [Avoid passing the store to every &lt;Provider ...&gt;](#avoid-passing-the-store-to-every-provider-)
  - [Running the examples locally](#running-the-examples-locally)
  - [Testing](#testing)
  - [Rematch](#rematch)
  - [Live examples](#live-examples)
  - [CONTRIBUTING](#contributing)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

## Install

```
npm install --save vuejs-redux
```

## Counter example

Let's build a counter app. The full code can be found in the `example/` directory.

Start with a reducer:

```javascript
export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
```

Create the action creators in order to update our state:

```javascript
export function increment() {
  return { type: 'INCREMENT' }
}

export function decrement() {
  return { type: 'DECREMENT' }
}

export function reset() {
  return { type: 'RESET' }
}
```

We can now create the CounterProvider component. It acts as a Provider for our CounterComponent:

```vue
<template>
  <Provider
    :mapDispatchToProps="mapDispatchToProps"
    :mapStateToProps="mapStateToProps"
    :store="store"
  >
    <template #default="{ counterValue, actions }">
      <!-- the provider calls the default slot with the result of mapStateToProps and mapDispatchToProps -->
      <Counter :counterValue="counterValue" :actions="actions" :title="title" />
      <!-- explicitly pass other props (ex: title) -->
    </template>
  </Provider>
</template>

<script>
import Provider from 'vuejs-redux'

import { createStore, bindActionCreators } from 'redux'
import { counter } from '../Reducers/Counter'
import * as Actions from '../Actions'

import Counter from './Counter.vue'

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
```

And finally our Counter component:

```vue
<template functional>
  <!-- we can use functional component -->
  <div>
    <h1>Counter using vuejs-redux</h1>
    <div>{{ counterValue }}</div>
    <button @click="actions.increment()">increment</button>
    <button @click="actions.decrement()">decrement</button>
    <button @click="actions.reset()">reset</button>
  </div>
</template>

<script>
export default {
  props: ['actions', 'counterValue'],
}
</script>
```

The Counter component is not aware that we are using redux.

If you use JSX, you can use the same syntax as React render props:

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

## Multiple stores

You can combine multiple store if needed, use the Provider component various times.
You can obviously create an helper component or whatever to compose this.

```vue
<template>
  <Provider
    :store=storeOne
    :mapStateToProps=mapStateToPropsOne
    :mapDispatchToProps=mapDispatchToPropsOne>
      <template #default="{ myStateOne, myActionOne }">
        <!-- Use our second provider -->
        <Provider
          :store=storeTwo
          :mapStateToProps=mapStateToPropsTwo
          :mapDispatchToProps=mapDispatchToPropsTwo>
          <template #default="{ myStateTwo, myActionTwo }">
            <!-- render our component here -->
            <Child :stateOne=myStateOne :stateTwo=myStateTwo />
          </template>
        </Provider>
      </template>
    </Provider
</template>
```

## Avoid passing the store to every <Provider ...>

Importing the store and passing it to every Provider can be a pain point. Hopefully,
we can create a custom provider that receive `mapStateToProps` and `mapDispatchToProps` as props,
imports the store, and call the vuejs-redux provider with the right parameters.

Here is an example:

CustomProvider.vue

```vue
<template>
  <Provider
    :mapDispatchToProps="mapDispatchToProps"
    :mapStateToProps="mapStateToProps"
    :store="store"
  >
    <template #default="props">
      <!--Retrieve the data from the provider -->
      <slot v-bind="props"></slot>
      <!-- forward the data to the scoped-slot -->
    </template>
  </Provider>
</template>

<script>
import store from '../configure-store'
import Provider from 'vuejs-redux'

export default {
  props: ['mapDispatchToProps', 'mapStateToProps'],

  components: {
    Provider,
  },

  data: () => ({
    store,
  }),
}
</script>
```

Checkout the [working example](https://codesandbox.io/s/ywr3vpzxnz)

## Running the examples locally

Sometimes, the examples in the repo are more up-to-date than the example in codesandbox.
You can open an issue if you find a broken codesandbox example.

To run the example locally, you need to switch to the example directory:

```bash
cd ./examples/counter
```

Install the dependencies with:

```bash
npm install # (or yarn)
```

Either build the example and serve the `dist` directory or start the dev mode (with hot reloading)

```bash
# Start the development mode
npm start

# Build
npm run build
```

## Testing

Unit testing is done with jest.
To run the test:

```
npm test
```

## Rematch

This plugin is compatible with [rematch](https://github.com/rematch/rematch): [live example](https://codesandbox.io/s/n3373olqo0)

## Live examples

- Counter: https://codesandbox.io/s/l9o83q28m

- Counter (jsx): https://codesandbox.io/s/konq1nzjxv

## CONTRIBUTING

Feel free to create issues or pull requests if needed.
