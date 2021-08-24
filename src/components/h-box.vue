<template>
  <div class="h-box">
    <div class="h-chat" :class="isChatActive? 'active' : ''">
      <div class="h-chat__header">
        <div @click="showChat" class="h-icon-wrap">
          <h-row-left />
        </div>
        <div class="h-user">Jonh Doe</div>
      </div>
      <h-box-body/>
      <div class="h-chat__input-container">
        <h-input/>
      </div>
    </div>
    <h-contact-list :class="!isChatActive? 'active' : ''" @showChat="showChat"/>
  </div>
</template>

<script>
import HInput from "./h-input";
import HBoxBody from "./h-box-body";
import HRowLeft from "../icons/h-icon-arrow-left";
import HContactList from "./h-contact-list";
export default {
  name: "h-box",
  components: {HContactList, HRowLeft, HBoxBody, HInput},
  data() {
    return {
      isChatActive: false
    }
  },
  methods: {
    showChat() {
      this.isChatActive = !this.isChatActive
    }
  },
}
</script>