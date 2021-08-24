<script>

import HFloatingButton from "./components/h-floating-button";
import HBox from "./components/h-box";
export default /*#__PURE__*/{
  name: 'HelixChat',
  components: {HBox, HFloatingButton },
 // vue component name
  data() {
    return {
      isBoxActive: false
    };
  },
  computed: {

  },
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive
    }
  },
};
</script>

<template>
  <div class="helix-chat">
    <h-box :class="isBoxActive ? 'active': ''"/>
    <h-floating-button :class="isBoxActive ?'box-activated': ''" @onClick="toggleBox" />
  </div>
</template>
