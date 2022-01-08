<template>
    <div>
      <errorLabel>
        {{errorMessage}}
        </errorLabel>
    </div>
</template>
<script>

import styled from 'vue-styled-components'

export const errorLabel = styled.p`
color: red
`
export default {
  name: 'Note',
  components: {
    errorLabel
  },
  props: {
    errorMessage: String
  }
}
</script>
<style scoped>
</style>
