import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      id: '',
      name: '',
      wallet: '',
    },
    selectedUser: {
      email: '',
      id: '',
      name: '',
      wallet: '',
    },
    users: [],
    error: '',
    tip: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users.slice();
    },
    setSelectedUser(state, selectedUser) {
      state.selectedUser = selectedUser;
    },
    setError(state, error) {
      state.error = error;
    },
    setTip(state, tip) {
      state.tip = tip;
    },
    moneyTransfer(state) {
      state.user.wallet -= state.tip
      state.selectedUser.wallet += state.tip
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
    users(state) {
      return state.users;
    },
    error(state) {
      return state.error;
    },
    tip(state) {
      return state.tip;
    },
    isUserAuth(state) {
      return !!state.user;
    }
  },
  actions: {
    auth ({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      })
    },
    getUsers ({ commit }) {
      const db = firebase.firestore()
      const userRef = db.collection('users').orderBy('name', 'asc')
      const userDoc = userRef.get() 
      userDoc
      .then((querySnapshot) => {
        const userDocs = querySnapshot.docs.map(doc => doc.data())
        const userIndex = userDocs.findIndex(
          item => item.name === this.state.user.name
        )
        if (-1 < userIndex) {
          userDocs.splice(userIndex, 1)
        }
        commit("setUsers", userDocs)
      })
      .catch(error => {
        commit('setError', error.message)
      })
    },
    getSelectedUser ({ commit }, selectedUser) {
      const selectedUserIndex = this.state.users.findIndex(
        user => user.name === selectedUser
      )
      if (-1 < selectedUserIndex) {
        commit("setSelectedUser", this.state.users[selectedUserIndex])
      }
    },
    signUp ({ dispatch, commit }, user) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          dispatch('signIn', {
            email: user.email,
            password: user.password
          })
        })
        .then(() => {
          firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            email: user.email,
            id: firebase.auth().currentUser.uid,
            name: user.name,
            wallet: 0
          })
        })
        .then(() => {
          dispatch('getUsers')
        })
        .catch(error => {
          commit("setError", error.message);
        })
    },
    signIn ({ dispatch, commit }, user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const db = firebase.firestore()
          const uid = firebase.auth().currentUser.uid
          const userRef = db.collection('users').doc(uid)
          const userDoc = userRef.get()
          userDoc.then((doc) => {
            commit('setUser', doc.data())
          })
        })
        .then(() => {
          dispatch('getUsers')
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },
    signOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },
    tipSelectedUser ({ dispatch, commit }, tip) {
      dispatch('getSelectedUser', tip)
      .then(() => {
        commit('moneyTransfer')
      })
      .then(() => {
        const userDocs = firebase.firestore().collection('users')
        userDocs.doc(this.state.user.id).update({
          wallet: this.state.user.wallet
        })
        userDocs.doc(this.state.selectedUser.id).update({
          wallet: this.state.selectedUser.wallet
        })
      })
      .catch(error => {
        console.log(error.message)
        commit('setError', error.message)
      })
    }
  }
})
