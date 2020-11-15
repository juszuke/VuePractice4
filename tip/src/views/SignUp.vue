<template>
  <div class="sign-up">
    <Header msg="新規登録画面"/>

    <div>
      <div>ユーザー名
        <input type="text" v-model="name">
      </div>
      <div>メールアドレス
        <input type="text" v-model="email">
      </div>
      <div>パスワード
        <input type="password" v-model="password">
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
import firebase from 'firebase'
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
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert('Create account',user.email)
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      })
      .catch(error => {
        alert(error.message)
      })
      firebase.firestore().collection('users').add({
        name: this.name,
        wallet: 0
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    }
  }
}
</script>
