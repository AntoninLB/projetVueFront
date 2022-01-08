<template>
    <div>
        <p>{{label}}</p>
        <select name="list" id="list">
            <option v-for="option in options" :key="option" v-bind:value="option">{{option}}</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'ListDeroulante',
  props: {
    options: [JSON],
    label: String
  }
}
</script>
<style scoped>
</style>
