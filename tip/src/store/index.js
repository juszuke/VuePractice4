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
    AUTH ({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      })
    },  
    SIGN_UP ({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              const db = firebase.firestore()
              const uid = firebase.auth().currentUser.uid
              const userRef = db.collection('users').doc(uid)
              const userDoc = userRef.get()
              userDoc.then((doc) => {
                commit('setUser', doc.data())
              })
            })
            .catch(error => {
              commit('setError', error.message)
            })
        })
        .then(() => {
          console.log(firebase.auth().currentUser.uid)
          firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            email: payload.email,
            name: payload.name,
            wallet: 0
          })
        .catch(error => {
          commit("setError", error.message);
        })
      })
    },
    SIGN_IN ({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          const db = firebase.firestore()
          const uid = firebase.auth().currentUser.uid
          const userRef = db.collection('users').doc(uid)
          const userDoc = userRef.get()
          userDoc.then((doc) => {
            commit('setUser', doc.data())
          })
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
