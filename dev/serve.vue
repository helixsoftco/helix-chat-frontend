<script>
import Vue from 'vue';
import HelixChat from '@/helix-chat.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    HelixChat
  }
});
</script>

<template>
  <div id="app">
    <helix-chat />
  </div>
</template>

<style>
html, body, div, span,
h1, h2, h3, h4, h5, h6, p,
small, strong, sub, sup,
b, u, i, ol, ul, li,
article, aside,
menu, nav {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

body {
  line-height: 1;
  background-color: #1C2140;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
