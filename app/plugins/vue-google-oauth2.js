// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};
Vue.use(GAuth, gauthOption);
