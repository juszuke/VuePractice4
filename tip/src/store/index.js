import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    users: null,
    selectedUser: {
      email: "b@b.com",
      name: "b",
      wallet: 0
    },
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setSelectedUser(state, payload) {
      state.selectedUser = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getUsers(state) {
      return state.users;
    },
    getSelectedUser(state) {
      return state.selectedUser;
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
    GET_USERS ({ commit }) {
      const db = firebase.firestore()
      const userRef = db.collection('users')
      const userDoc = userRef.get() 
      userDoc.then((querySnapshot) => {
        const userDocs = querySnapshot.docs.map(doc => doc.data())
        const currentUserIndex = userDocs.findIndex(
          item => item.name === this.state.user.name
        )
        if (-1 < currentUserIndex) {
          userDocs.splice(currentUserIndex, 1)
        }
        commit("setUsers", userDocs)
      })
    },
    GET_SELECTED_USER ({ commit }, payload) {
      const selectedUserIndex = this.state.users.findIndex(
        item => item.name === payload
      )
      if (-1 < selectedUserIndex) {
        commit("setSelectedUser", this.state.users[selectedUserIndex])
      }
    },
    SIGN_UP ({ dispatch, commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          dispatch('SIGN_IN', {
            email: payload.email,
            password: payload.password
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
          .then(() => {
            dispatch('GET_USERS')
          })
        .catch(error => {
          commit("setError", error.message);
        })
      })
    },
    SIGN_IN ({ dispatch, commit }, payload) {
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
          .then(() => {
            dispatch('GET_USERS')
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
