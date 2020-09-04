<template>
  <v-layout>
    <v-flex xs12>
      <video-player></video-player>
    </v-flex>
  </v-layout>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'

export default {
  name: 'VideoAulas',

  components: {
    'video-player': VideoPlayer,
  },
}
</script>
