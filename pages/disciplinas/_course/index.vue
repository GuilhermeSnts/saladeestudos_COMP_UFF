<template>
  <v-layout>
    <v-flex xs12>
      <v-row justify="end">
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          class="ma-2"
          :to="$route.params.course + '/video_aulas'"
        >
          <v-icon left>mdi-video</v-icon> Vídeo Aulas
        </v-btn>

        <v-btn color="primary" class="ma-2" @click="goToDrive()">
          <v-icon left>mdi-google-drive</v-icon> Pasta no Drive
        </v-btn>

        <v-btn color="primary" class="ma-2" @click="goToGroup()">
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
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  async asyncData({ $content, params }) {
    const page = await $content(`courses/${params.course}`).fetch()

    return {
      page,
    }
  },

  computed: {
    ...mapGetters('subjects', ['SUBJECT']),
    courseData() {
      return this.SUBJECT(this.$route.params.course)
    },
  },

  methods: {
    goToGroup() {
      window.open(
        `${this.$config.baseUrl}/redirect/subject/${this.courseData.id}/whatsapp`,
        '_blank'
      )
    },
    goToDrive() {
      window.open(this.courseData.drive_link, '_blank')
    },
  },
}
</script>
