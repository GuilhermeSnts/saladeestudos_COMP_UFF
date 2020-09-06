<template>
  <div>
    <v-row>
      <v-toolbar flat dense> Aula 1 </v-toolbar>
    </v-row>
    <v-row class="video-wrapper" ref="videoWrapper">
      <div class="video over">
        <v-progress-circular v-show="isLoading" indeterminate />
      </div>
      <video
        ref="video"
        class="video"
        @onloadeddata="setProgress"
        @onplay="isLoading = false"
        preload="auto"
      >
        <source
          src="http://va05-idc.rnp.br/riotransfer/cederj/sistemas_comp/ead05006/Aula_001/Aula_001.mp4"
          type="video/mp4"
        />
      </video>
    </v-row>

    <!-- PROGRESS BAR -->

    <v-row>
      <v-toolbar dense flat>
        <v-progress-linear
          class="progressbar_item"
          v-model="progress"
          color="blue"
          height="10"
        />
      </v-toolbar>
    </v-row>

    <!-- CONTROLS -->

    <v-row>
      <v-toolbar dense flat>
        <v-btn dark icon @click="playOrPause()" :loading="isLoading">
          <v-icon v-text="!isPlaying ? 'mdi-play' : 'mdi-pause'" />
        </v-btn>
        <v-btn icon>
          <v-icon> mdi-rotate-left </v-icon>
        </v-btn>

        <!-- RATE CONTROLS -->

        <v-menu top offset-y light>
          <template v-slot:activator="{ on, attrs }">
            <v-chip v-bind="attrs" v-on="on" label>{{ rate }}x</v-chip>
          </template>
          <v-list>
            <v-list-item v-text="'2 x'" @click="rate = 2" />
            <v-list-item v-text="'1.5 x'" @click="rate = 1.5" />
            <v-list-item v-text="'1 x'" @click="rate = 1" />
            <v-list-item v-text="'0.75 x'" @click="rate = 0.75" />
            <v-list-item v-text="'0.5 x'" @click="rate = 0.5" />
          </v-list>
        </v-menu>

        <v-btn icon>
          <v-icon> mdi-rotate-right </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <!-- AUDIO CONTROLS -->

        <v-menu top offset-y light>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon
                v-text="volume == 0 ? 'mdi-volume-mute' : 'mdi-volume-high'"
              />
            </v-btn>
          </template>
          <v-sheet style="height: 174px; overflow: hidden">
            <v-slider vertical v-model="volume"> </v-slider>
          </v-sheet>
        </v-menu>

        <v-btn icon @click="fullscreen()">
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
    isLoading: false,
    volume: '100',
    rate: 1,
    progress: 0,
    progressBuffer: 0,
    progressTime: 0,
  }),

  watch: {
    volume(val) {
      this.$refs.video.volume = val / 100
    },
    rate(val) {
      this.$refs.video.playbackRate = val
    },
    isPlaying(isPlaying) {
      if (isPlaying) {
        setInterval(() => {
          let currentTime = this.$refs.video.currentTime
          let duration = this.$refs.video.duration
          let progress = Math.round((currentTime / duration) * 100)
          this.progress = progress
        }, 250)
      }
    },
  },

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
    fullscreen() {
      this.$refs.videoWrapper.requestFullscreen()
    },
    setProgress(v) {
      console.log(v)
    },
  },

  mounted() {
    setInterval(() => {
      let curr = this.$refs.video.currentTime
      let durr = this.$refs.video.duration
      let progress = Math.round((curr / durr) * 100)
      this.progress = progress
    }, 250)
  },
}
</script>

<style lang="sass" scoped>
.video-wrapper
  position: relative
  .video
    width: 100%
    max-height: 50vh
  .over
    height: 100%
    position: absolute
    top: 0
    left: 0
    display: flex
    flex-flow: row
    justify-content: center
    vertical-align: middle
    align-items: center
</style>
