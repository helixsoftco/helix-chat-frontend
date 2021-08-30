<template>
  <input placeholder="Escribe un mensaje..." class="h-input" @keypress.enter="sendMessage" v-model="message" type="text">
</template>

<script>
export default {
  name: "h-input",
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