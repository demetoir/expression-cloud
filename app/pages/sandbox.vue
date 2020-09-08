<template>
  <div class="container">
    <div>
      <button @click="googleSignIn">구글 로그인</button>
      <a>{{ isLogin }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {},
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    async googleSignIn() {
      if (!this.$gAuth.isInit) {
        return;
      }
      // todo: 여기 타입 세이프하게 처리하
      const googleUser = await this.$gAuth.signIn();

      this.isLogin = googleUser;
    },
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
