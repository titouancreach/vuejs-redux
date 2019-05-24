<template>
  <div>
    <h1>{{ title }}</h1>
    <div>count1={{ counterValue }} count2={{ counterValue2 }}</div>
    <button @click="actions.increment()">increment</button>
    <button @click="actions.decrement()">decrement</button>
    <button @click="actions.reset(0)">reset</button>
    <br />
    <div>other count {{ counterValue3 }}</div>
    <button @click="actions.other(54)">other</button>
    <button @click="actions.other_reset()">other_reset</button>
  </div>
</template>

<script>
export default {
  props: ['actions', 'counterValue', 'counterValue2', 'counterValue3', 'title'],
}
</script>
