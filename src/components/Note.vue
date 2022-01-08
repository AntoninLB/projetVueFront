<template>
    <span>
        Note sur {{matiere}} : {{ note }} =>
        <span v-if="note > 10"> Validé</span>
        <span v-else> Note sur {{matiere}} : {{ note }} raté</span>
    </span>
</template>
<script>
export default {
  name: 'Note',
  props: {
    matiere: String,
    note: Number
  }
}
</script>
<style scoped>
</style>
