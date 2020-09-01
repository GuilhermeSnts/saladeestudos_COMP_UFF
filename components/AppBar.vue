<template>
  <v-app-bar fixed app color="purple darken-4" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-avatar tile >
      <img src="../static/logo.png" style="width: 30px; height: 30px" alt="sala de estudos logo">
    </v-avatar>
    <v-toolbar-title class="ml-4" v-text="title" />
    <v-spacer />
    <v-btn icon @click.stop="goToGithub()">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'AppBar',

  data: () => ({
    title: 'Sala de Estudos',
  }),

  methods: {
    ...mapMutations('settings', ['SET_DRAWER']),
  },

  computed: {
    ...mapGetters('settings', ['DRAWER']),

    drawer: {
      get: function () {
        return this.DRAWER
      },
      set: function (val) {
        this.SET_DRAWER(val)
      },
    },
  },
}
</script>
