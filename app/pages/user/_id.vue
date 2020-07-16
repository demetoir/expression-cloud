<template>
  <div class="container">
    inner page

    <p>{{ id }}</p>
    <a-input-group size="large">
      <a-row :gutter="8">
        <a-col :span="5">
          <a-input default-value="0571" />
        </a-col>
        <a-col :span="8">
          <a-input default-value="26888888" />
        </a-col>
      </a-row>
    </a-input-group>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    const id = this.$route.params.id || null;
    const fullPath = this.$route.fullPath;

    return {
      show_me: fullPath,
      id,
    };
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
