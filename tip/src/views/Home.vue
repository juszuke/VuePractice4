<template>
  <div class="home">
    <div>
      <span>{{ getUser.name }}さんようこそ！！</span>
      <span>残高: {{ getUser.wallet }}</span>
      <button @click="signOut">ログアウト</button>
      <button @click="test">テスト</button>
    </div>
    <Header msg="ユーザー一覧"/>
  </div>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Header
  },
  // data () {
  //   return {
  //     name: firebase.auth().currentUser.email,
  //     wallet: 0
  //   }
  // },
  computed: {
    ...mapState([
      'currentUser'
    ]),
    ...mapGetters([
      'getUser',
      'isUserAuth'
    ])
  },
  methods: {
    ...mapActions([
      'SIGN_OUT'
    ]),
    signOut() {
      this.SIGN_OUT();
    },
    // signOut: function () {
    //   firebase.auth().signOut()
    //   .then(() => {
    //     this.$router.push('/sign-in')
    //     console.log('Success!')
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
    // },
    test: function () {
      const db = firebase.firestore()
      const uid = firebase.auth().currentUser.uid
      const userRef = db.collection('users').doc(uid)
      const userDoc = userRef.get()
      console.log(userRef)
      console.log(userDoc.data())
      console.log(userDoc.data(name))
    }
  }
}
</script>
