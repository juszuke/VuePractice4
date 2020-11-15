<template>
  <div class="sign-in">
    <Header msg="ログイン画面"/>

    <div>
      <div>メールアドレス
        <input type="text" v-model="email">
      </div>
      <div>パスワード
        <input type="password" v-model="password">
      </div>
    </div>

    <div>
      <div><button @click="signIn">ログイン</button></div>
      <div>
        <router-link to="/sign-up">新規登録</router-link>はこちら
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header.vue'

export default {
  name: 'SignIn',
  components: {
    Header
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Success!')
        this.$router.push('/')
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>