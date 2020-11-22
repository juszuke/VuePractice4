<template>
  <div class="home">
    <div>
      <span>{{ name }}さんようこそ！！</span>
      <span>残高: {{ wallet }}</span>
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
  data () {
    return {
      name: null,
      // name: firebase.auth().currentUser.email,
      wallet: 0
    }
  },
  mounted () {
    this.AUTH
  },
  computed: {
    ...mapState([
      // 'currentUser'
    ]),
    ...mapGetters([
      'getUser',
      'isUserAuth'
    ])
  },
  methods: {
    ...mapActions([
      'AUTH',
      'SIGN_OUT'
    ]),
    signOut() {
      this.SIGN_OUT()
      this.$router.push('/sign-in')
    },
    test: function () {
      const db = firebase.firestore()
      const uid = firebase.auth().currentUser.uid
      const userRef = db.collection('users').doc(uid)
      const userDoc = userRef.get()
      .then(() => {
        console.log(userRef)
        console.log(userDoc)
        console.log(userDoc.data())
      })
    }
  }
}
</script>
