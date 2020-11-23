<template>
  <div class="home">
    <div>
      <span v-if="$store.state.user">{{ $store.state.user.name }}さんようこそ！！</span>
      <span v-if="$store.state.user">残高: {{ $store.state.user.wallet }}</span>
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
  mounted () {
    this.AUTH
  },
  computed: {
    ...mapState([
      'user'
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
      // this.$router.push('/sign-in')
    },
    test() {
      const db = firebase.firestore()
      const uid = firebase.auth().currentUser.uid
      const userRef = db.collection('users').doc(uid)
      const userDoc = userRef.get()
      userDoc.then((querySnapshot) => {
        console.log(querySnapshot)
        console.log(typeof(querySnapshot))
        querySnapshot.forEach((doc) => {
            console.dir(`${doc.id} => ${JSON.stringify(doc.data())}`);
        })
      })
    }
  }
}
</script>
