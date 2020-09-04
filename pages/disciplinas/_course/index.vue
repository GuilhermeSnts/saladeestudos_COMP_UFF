<template>
  <v-layout>
    <v-flex xs12>
      <v-row justify="end">
        <v-spacer></v-spacer>

        <v-btn color="primary" class="ml-2" :to="$route.params.course+'/video_aulas'">
          <v-icon left>mdi-video</v-icon> Vídeo Aulas
        </v-btn>

        <v-btn color="primary" class="ml-2" @click="goToDrive()">
          <v-icon left>mdi-google-drive</v-icon> Pasta no Drive
        </v-btn>

        <v-btn color="primary" class="ml-2" @click="goToGroup()">
          <v-icon left>mdi-whatsapp</v-icon> Grupo da matéria
        </v-btn>
      </v-row>

      <div class="row ma-2">
        <nuxt-content :document="page" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Index',

  async asyncData({ $content, params }) {
    const page = await $content(`courses/${params.course}`).fetch()

    return {
      page,
    }
  },

  methods: {
    goToGroup() {
      // precisa obter o conteúdo de algum lugar
    },
    goToDrive() {
      // precisa obter o conteúdo de algum lugar
    },
  },
}
</script>
