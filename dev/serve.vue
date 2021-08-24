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
