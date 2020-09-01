<template>
  <v-app dark>
    <app-bar />
    <navigation-drawer />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar'
import AppFooter from '../components/AppFooter'
import NavigationDrawer from '../components/NavigationDrawer'
export default {
  name: 'DefaultLayout',
  data: () => ({
    title: 'Vuetify.js',
  }),

  components: {
    AppBar,
    AppFooter,
    NavigationDrawer,
  },
}
</script>
