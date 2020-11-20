import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
  },
  actions: {
    SIGN_UP ({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch(error => {
          commit("setError", error.message);
        });
    },
    SIGN_IN ({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setUser', response.user)
          console.log('Success!')
          this.$router.push('/')
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },
    SIGN_OUT ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(error => {
          commit('setError', error.message)
        })
    }
  }
})
