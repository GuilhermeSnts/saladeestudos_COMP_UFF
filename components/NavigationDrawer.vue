<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-text-field
      label="Pesquisar nesse menu"
      v-model="search"
      hide-details
      solo
      class="ma-2"
      rounded
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-list>
      <div v-for="(item, i) in filteredMenu" :key="i">
        <!-- if it is a link -->

        <v-list-item :to="item.to" router exact v-if="item.type == 'link'">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <!-- if it is a list -->
        <v-list-group v-else>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            :to="subItem.to"
            nav
            router
            exact
            v-for="(subItem, sI) of item.items"
            :key="sI"
          >
            <v-list-item-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',
  data() {
    return {
      search: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
          type: 'link',
        },
        {
          icon: 'mdi-book',
          title: 'Disciplinas',
          type: 'list',
          items: [
            {
              icon: 'mdi-chart-bell-curve',
              title: 'Álgebra Linear',
              type: 'link',
              to: '/disciplinas/algebra_linear',
            },
            {
              icon: 'mdi-text-box-search-outline',
              title: 'Análise de sistemas',
              type: 'link',
              to: '/disciplinas/analise_de_sistemas',
            },
            {
              icon: 'mdi-select-search',
              title: 'Arquitetura e Projeto de Sistemas',
              type: 'link',
              to: '/disciplinas/arquitetura_e_projeto_de_sistemas',
            },
            {
              icon: 'mdi-database',
              title: 'Banco de Dados',
              type: 'link',
              to: '/disciplinas/banco_de_dados',
            },
          ],
        },
      ],
    }
  },

  methods: {
    ...mapMutations('settings', ['SET_DRAWER']),

    matchMenu(string, menu) {
      let p = Array.from(string.toLowerCase()).reduce(
        (a, v, i) => `${a}[^${string.substr(i)}]*?${v}`,
        ''
      )
      let regex = RegExp(p)
      return menu.filter((v) => v.title.toLowerCase().match(regex))
    },
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

    filteredMenu() {
      if (this.search.length) {
        let links = this.items.filter((i) => i.type == 'link')
        let lists = this.items.filter((i) => i.type == 'list')
        let linksFromLists = lists.map((i) => i.items).flat()
        let allLinks = links.concat(linksFromLists)

        let filteredMenu = this.matchMenu(this.search, allLinks)

        return filteredMenu
      } else {
        return this.items
      }
    },
  },
}
</script>
