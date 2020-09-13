import axios from 'axios'

export const state = () => ({
  subjects: [],
})

export const mutations = {
  SET_SUBJECTS(state, payload) {
    state.subjects = payload
  },
}

export const getters = {
  SUBJECTS(state) {
    return state.subjects
  },
  SUBJECT: (state) => (code) => {
    return state.subjects.find((s) => s.code === code)
  },
  LINKS(state) {
    return state.subjects.map((s) => ({
      title: s.name,
      id: s.id,
      icon: s.icon,
      code: s.code,
      path: '/disciplinas/' + s.code,
    }))
  },
}

export const actions = {
  async GET_SUBJECTS(context) {
    let data = await axios(this.$config.baseUrl + '/api/v1/subjects').then(
      (res) => res.data
    )
    context.commit('SET_SUBJECTS', data)
  },
}
