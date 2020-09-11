<template>
  <div>
    <v-row>
      <v-toolbar flat dense>
        <span>Aula 1</span>
        <v-spacer />
        <span>versão beta</span>
      </v-toolbar>
    </v-row>
    <div ref="player">
      <v-row class="video-wrapper" ref="videoWrapper">
        <div class="video over">
          <v-progress-circular v-show="isLoading" indeterminate />
        </div>
        <video
          ref="video"
          class="video"
          @onloadeddata="setProgress"
          @canplaythrough="isLoading = false"
          @onplay="isLoading = false"
          preload="auto"
        >
          <source
            src="http://va05-idc.rnp.br/riotransfer/cederj/sistemas_comp/ead05006/Aula_001/Aula_001.mp4"
            type="video/mp4"
          />
        </video>
      </v-row>

      <!-- Duration BAR -->

      <v-row>
        <v-toolbar dense flat>
          <span class="caption">
            {{ progressTime | time }} / {{ duration | time }}
          </span>
        </v-toolbar>
      </v-row>

      <!-- PROGRESS BAR -->

      <v-row>
        <v-toolbar dense flat>
          <div class="progressbar_wrapper">
            <v-progress-linear
              class="progressbar_item progressbar_progress"
              v-model="progress"
              color="blue"
              height="10"
            />
            <v-slider
              hide-details
              dense
              class="progressbar_item progressbar_slider"
              v-model="progressController"
              color="blue"
            />
          </div>
        </v-toolbar>
      </v-row>

      <!-- CONTROLS -->

      <v-row>
        <v-toolbar dense flat>
          <v-btn icon @click="playOrPause()" :loading="isLoading">
            <v-icon v-text="!isPlaying ? 'mdi-play' : 'mdi-pause'" />
          </v-btn>

          <v-btn icon @click="skip('back', 5)">
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

          <v-btn icon @click="skip('forward', 5)">
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
            <v-icon v-text="'mdi-fullscreen '" />
          </v-btn>
        </v-toolbar>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',

  data: () => ({
    isPlaying: false,
    isLoading: true,
    volume: '100',
    rate: 1,
    progress: 0,
    progressBuffer: 0,
    progressTime: 0,
    duration: 0,
  }),

  computed: {
    progressController: {
      get() {
        this.progress
      },
      set(val) {
        if (val > 0) {
          this.$refs.video.currentTime = Math.round((val * this.duration) / 100)
        }
      },
    },
  },

  watch: {
    volume(val) {
      this.$refs.video.volume = val / 100
    },
    rate(val) {
      this.$refs.video.playbackRate = val
    },
    isPlaying(isPlaying) {
      if (isPlaying) {
        this.isLoading = false
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
      if (!document.fullscreenElement) {
        this.$refs.player.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    setProgress(v) {
      console.log(v)
    },
    skip(direction, interval) {
      if (direction == 'forward') {
        this.$refs.video.currentTime += interval
      } else if (direction == 'back') {
        this.$refs.video.currentTime -= interval
      } else {
        console.error(direction + ' is not recognized by skip()')
      }
    },
  },

  mounted() {
    setInterval(() => {
      let curr = this.$refs.video.currentTime
      let durr = this.$refs.video.duration
      let progress = Math.round((curr / durr) * 100)
      this.progressTime = curr
      this.duration = durr
      this.progress = progress
    }, 60)
  },

  filters: {
    time(val) {
      if (val > 0) {
        let minutes = Math.floor(val / 60)
        let seconds = Math.floor(val - minutes * 60)
        return `${minutes}:${seconds}`
      } else {
        return '0:0'
      }
    },
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
.progressbar_wrapper
  position: relative
  display: flex
  vertical-align: middle
  align-items: center
  width: 100%
  .progressbar_item
    position: absolute
    width: 100%
  .progressbar_slider
    z-index: 99
    margin: none !important
  .progressbar_progress
    width: calc(100% - 16px)
    margin-left: 8px

@media all and (display-mode: fullscreen)
  .video-wrapper
    .video
      width: 100%
      max-height: calc(100vh - 144px) !important
</style>
