<template>
  <div>
    <h1> {{ title }} </h1>
    <div> {{ counterValue }} </div>
    <button @click="actions.increment()"> increment </button>
    <button @click="actions.decrement()"> decrement </button>
    <button @click="actions.reset()"> reset </button>
  </div>
</template>

<script>
export default {
  props: ['actions', 'counterValue', 'title'],
}
</script>
