<template>
  <div class="sign-up">
    <Header msg="新規登録画面"/>

    <div>
      <div>ユーザー名
        <input type="text" placeholder="username" v-model="name">
      </div>
      <div>メールアドレス
        <input type="text" placeholder="email" v-model="email">
      </div>
      <div>パスワード
        <input type="password" placeholder="password" v-model="password">
      </div>
    </div>

    <div>
      <div><button @click="signUp">新規登録</button></div>
      <div>
        <router-link to="/sign-in">ログイン</router-link>はこちら
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'SignUp',
  components: {
    Header
  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', { email: this.email, name: this.name, password: this.password })
      .then(() => {
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      })
    }
  }
}
</script>
