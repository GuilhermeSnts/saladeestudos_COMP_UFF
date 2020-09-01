<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-book',
          title: 'Disciplinas',
          to: '/disciplinas',
        },
      ],
    }
  },

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
