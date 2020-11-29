<template>
  <div class="home">
    <div>
      <span v-if="$store.state.user">{{ $store.state.user.name }}さんようこそ！！</span>
      <span v-if="$store.state.user">残高: {{ $store.state.user.wallet }}</span>
      <button @click="signOut">ログアウト</button>
    </div>

    <Header msg="ユーザー一覧"/>
    
    <table>
      <thead v-pre>
        <tr>
          <th class="username">ユーザー名</th>
          <th class="wallet"></th>
          <th class="tip"></th>
        </tr>
      </thead>
      <tbody v-if="$store.state.users">
        <tr
          v-for="user in $store.state.users"
          :key="user.name">
          <td>{{ user.name }}</td>
          <td class="state">
            <button @click="showWallet(user.name)">
            <!-- <button @click="GET_SELECTED_USER(user.name)"> -->
              wallet
            </button>
          </td>
          <td class="button">
            <button>
              送る
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal name='wallet' :width="300" :height="150">
      <div></div>
      <p>{{ $store.state.selectedUser.name }}さんの残高</p>
      <p>{{ $store.state.selectedUser.wallet }}</p>
      <button @click="hideWallet">閉じる</button>
    </modal>
  </div>
</template>

<script>
// import firebase from 'firebase'
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
      'user',
      'users',
      'selectedUser'
    ]),
    ...mapGetters([
      'getUser',
      'getUsers',
      'getSelectedUser',
      'isUserAuth'
    ]),
  },
  methods: {
    ...mapActions([
      'AUTH',
      'SIGN_OUT',
      'GET_SELECTED_USER'
    ]),
    signOut() {
      this.$store.dispatch('SIGN_OUT')
      .then(() => {
        setTimeout(() => {
          this.$router.push('/sign-in')
        }, 1500)
      })
    },
    showWallet(name) {
      this.$store.dispatch('GET_SELECTED_USER', name)
      this.$modal.show('wallet')
    },
    hideWallet() {
      this.$modal.hide('wallet')
    }
  }
}
</script>
