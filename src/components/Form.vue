<template>
    <div>
        <p>{{ label }}</p>
        <input v-model="message" type="text" :class="classe">
        <p v-if="isRequired">Champ obligatoire</p>
    </div>
</template>
<script>
export default {
  name: 'Form',
  props: {
    label: String,
    isRequired: Boolean,
    classe: String
  }
}
</script>
<style scoped>
</style>
