<template>
  <div class="home">
    <div>
      <span v-if="$store.getters.user">{{ $store.getters.user.name }}さんようこそ！！</span>
      <span v-if="$store.getters.user">残高: {{ $store.getters.user.wallet }}</span>
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
      <tbody v-if="$store.getters.users">
        <tr
          v-for="user in $store.getters.users"
          :key="user.name">
          <td>{{ user.name }}</td>
          <td class="state">
            <button @click="showWalletModal(user.name)">
              wallet
            </button>
          </td>
          <td class="button">
            <button @click="showTipModal(user.name)">
              送る
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal name='wallet' v-if="$store.getters.selectedUser" :width="300" :height="150">
      <p>{{ $store.getters.selectedUser.name }}さんの残高</p>
      <p>{{ $store.getters.selectedUser.wallet }}</p>
      <button @click="hideWalletModal">閉じる</button>
    </modal>
    <modal name='tip' v-if="$store.getters.selectedUser" :width="300" :height="150">
      <p>あなたの残高：{{ $store.getters.user.wallet }}</p>
      <p>送る金額</p>
      <input type="text" v-model="tip"><br>
      <button @click="tipSelectedUser">送信</button>
    </modal>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { mapState, mapActions } from 'vuex'

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
      'selectedUser',
      'tip'
    ]),
    tip: {
      get() {
        return this.$store.state.tip
      },
      set(tip) {
        this.$store.commit('setTip', Number(tip))
      }
    }
  },
  methods: {
    ...mapActions([
      'auth'
    ]),
    signOut() {
      this.$store.dispatch('signOut')
      .then(() => {
        setTimeout(() => {
          this.$router.push('/sign-in')
        }, 1500)
      })
    },
    showWalletModal(name) {
      this.$store.dispatch('getSelectedUser', name)
      .then(() => {
        setTimeout(() => {
          this.$modal.show('wallet')
        }, 500)
      })
    },
    hideWalletModal() {
      this.$modal.hide('wallet')
    },
    showTipModal(name) {
      this.$store.dispatch('getSelectedUser', name)
      .then(() => {
        setTimeout(() => {
          this.$modal.show('tip')
        }, 500)
      })
    },
    tipSelectedUser(name) {
      this.$store.dispatch('tipSelectedUser', name)
      this.$modal.hide('tip')
    }
  }
}
</script>
