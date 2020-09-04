<template>
  <div>
    <v-row>
      <v-toolbar flat dense> Aula 1 </v-toolbar>
    </v-row>
    <v-row>
      <video ref="video" class="video" preload="auto">
        <source
          src="http://va05-idc.rnp.br/riotransfer/cederj/sistemas_comp/ead05006/Aula_001/Aula_001.mp4"
          type="video/mp4"
        />
      </video>
    </v-row>
    <v-row>
      <v-toolbar dense>
        <v-btn icon @click="playOrPause()">
          <v-icon v-text="!isPlaying ? 'mdi-play' : 'mdi-pause'" />
        </v-btn>
        <v-btn icon>
          <v-icon> mdi-rotate-left </v-icon>
        </v-btn>
        <v-chip label>1x</v-chip>
        <v-btn icon>
          <v-icon> mdi-rotate-right </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon> mdi-volume-high </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon> mdi-fullscreen </v-icon>
        </v-btn>
      </v-toolbar>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',

  data: () => ({
    isPlaying: false,
  }),

  methods: {
    playOrPause() {
      if (!this.isPlaying) {
        this.play()
      } else {
        this.pause()
      }
    },
    play() {
      this.$refs.video.play()
      this.isPlaying = true
    },
    pause() {
      this.$refs.video.pause()
      this.isPlaying = false
    },
  },
}
</script>

<style lang="sass" scoped>
.video
  width: 100%
  max-height: 50vh
</style>
