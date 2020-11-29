import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD6c6Up7aPqvOnyF4fmMhSKNU6OFy3TZ84",
  authDomain: "tipapp-4eeac.firebaseapp.com",
  databaseURL: "https://tipapp-4eeac.firebaseio.com",
  projectId: "tipapp-4eeac",
  storageBucket: "tipapp-4eeac.appspot.com",
  messagingSenderId: "317736558754",
  appId: "1:317736558754:web:0e40d46d9cbb78702977fb",
  measurementId: "G-X98XJDXT8C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VModal)
