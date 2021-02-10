<template>
  <v-layout>
    <v-flex xs12>
      <video-player></video-player>
    </v-flex>
    <lesson-list></lesson-list>
  </v-layout>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
import LessonList from '@/components/LessonList'

export default {
  name: 'VideoAulas',

  components: {
    'video-player': VideoPlayer,
    'lesson-list': LessonList,
  },
}
</script>
