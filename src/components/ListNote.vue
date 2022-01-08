<template>
    <div>
        <ul>
            <li  v-for="(note, matiere) in notes"  :key="matiere" >
              <note :matiere="matiere" :note="note"/>
                </li>
            <li>Moyenne : {{ average }}</li>
            <li v-if="average >10">Vous êtes admis</li>
            <li v-else>Vous êtes refusés</li>
        </ul>
    </div>

</template>
<script>
import Note from './Note.vue'

export default {
  components: { Note },
  name: 'ListNote',
  data: () => {
    return {
      notes: {
        // eslint-disable-next-line quote-props
        'Symfony': 12,
        // eslint-disable-next-line quote-props
        'Réseau': 14,
        // eslint-disable-next-line quote-props
        'Intégration': 8,
        // eslint-disable-next-line quote-props
        'Maths': 0,
        // eslint-disable-next-line quote-props
        'Anglais': 12
      }
    }
  },
  computed: {
    average: function () {
      let somme = 0
      for (const matiere in this.notes) {
        somme += this.notes[matiere]
      }
      return somme / Object.keys(this.notes).length
    }
  }
}
</script>

<style scoped>
</style>
