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
// import firebase from 'firebase'
import Header from '@/components/Header.vue'
import { mapActions } from 'vuex'

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
    ...mapActions([
      'SIGN_UP'
    ]),
    signUp() {
      this.SIGN_UP({ email: this.email, password: this.password })
    }
    // signUp: function () {
    //   firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    //   .then(() => {
    //     firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    //   })
    //   .then(() => {
    //     this.$router.push('/')
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
    //   .then(() => {
    //     firebase.firestore().collection('users')
    //     .doc(firebase.auth().currentUser.uid)
    //     .set({
    //       email: this.email,
    //       name: this.name,
    //       wallet: 0
    //     })
    //     // .then(function(docRef) {
    //     //   console.log('Document written with ID: ', docRef.id);
    //     // })
    //     // .catch(function(error) {
    //     //   console.error('Error adding document: ', error);
    //     // });
    //   })
    // }
  }
}
</script>
