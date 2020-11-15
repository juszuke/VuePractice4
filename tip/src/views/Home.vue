<template>
  <div class="home">
    <div>
      <span>{{ name }}さんようこそ！！</span>
      <span>残高: {{ wallet }}</span>
      <button @click="signOut">ログアウト</button>
    </div>
    <Header msg="ユーザー一覧"/>
  </div>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      name: '',
      wallet: 0
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push('/sign-in')
        alert('Success!')
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>
