<template>
  <div class="h-box">
    <div class="h-chat" :class="isChatActive? 'active' : ''">
      <div class="h-chat__header">
        <div @click="showChat" class="h-icon-wrap">
          <h-arrow-left />
        </div>
        <div v-if="currentDialog" class="h-user">{{currentDialog.username}}</div>
      </div>
      <h-box-body v-if="currentDialog && messages.length" :messages="messages" :otherUserId="currentDialog.other_user_id" @readMessage="readMessage" />
      <div class="h-chat__input-container">
        <h-input @sendMessage="sendMessage"/>
      </div>
    </div>
    <h-contact-list :dialogs="dialogs" :class="!isChatActive? 'active' : ''" @showChat="getDialog" @sendMessage="sendMessage"/>
  </div>
</template>

<script>
import HArrowLeft from "../icons/h-icon-arrow-left";
import HInput from "./h-input";
import HBoxBody from "./h-box-body";
import HContactList from "./h-contact-list";

export default {
  name: "h-box",
  components: {HContactList, HArrowLeft, HBoxBody, HInput},
  props: {
    dialogs: {
      type: Array,
      default: () => [],
    },
    messages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isChatActive: false,
      currentDialog: null
    }
  },
  methods: {
    getDialog(dialog) {
      this.currentDialog = dialog
      this.isChatActive = true
    },
    showChat() {
      this.currentDialog = null
      this.isChatActive = false
    },
    sendMessage(payload) {
      this.$emit("sendMessage", {text: payload, user_pk: this.currentDialog.other_user_id})
    },
    readMessage(payload) {
      if(this.currentDialog) {
        this.$emit("readMessage", {...payload, user_pk: this.currentDialog.other_user_id})
      }
    }
  },
}
</script>
