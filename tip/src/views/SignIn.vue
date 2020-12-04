<template>
  <div class="sign-in">
    <Header msg="ログイン画面"/>

    <div>
      <div>メールアドレス
        <input type="text" placeholder="email" v-model="email">
      </div>
      <div>パスワード
        <input type="password" placeholder="password" v-model="password">
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
    signIn() {
      this.$store.dispatch('signIn', { email: this.email, password: this.password })
      setTimeout(() => {
        this.$router.push('/')
      }, 1500)
    }
  }
}
</script>