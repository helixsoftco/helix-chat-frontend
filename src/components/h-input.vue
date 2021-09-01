<template>
  <div class="icon-wrapper">
    <input placeholder="Escribe un mensaje..." class="h-input" @keypress.enter="sendMessage" v-model="message" type="text">
    <h-icon-send @click.native="sendMessage" class="h-icon-input" />
  </div>
</template>

<script>
import HIconSend from "../icons/h-icon-send";
export default {
  name: "h-input",
  components: {HIconSend},
  data() {
    return {
      message: ""
    }
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.message)
      this.message = ""
    }
  },
}
</script>