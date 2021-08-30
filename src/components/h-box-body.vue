<template>
  <div class="h-box-body">
    <div class="h-box-body__chat">
      <div class="h-row" :class="menssage.out ? 'h-row__output' : 'h-row__input'" v-for="menssage in reverseMessages" :key="menssage.sent">
        <div class="h-row__message">{{ menssage.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "h-box-body",
  props: {
    otherUserId: {
      type: String,
      require: true
    },
    messages: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      messagesFilteredByUser: [],
      count: 0
    }
  },
  computed: {
    reverseMessages() {
      return this.messagesFilteredByUser.reverse()
    }
  },
  mounted() {
    this.filterMessages()
  },
  methods: {
    filterMessages() {
      this.messagesFilteredByUser = this.messages.filter((m) => (m.out && (m.recipient === this.otherUserId)) || !m.out && (m.sender === this.otherUserId))
    }
  },
  watch: {
    otherUserId() {
      this.filterMessages()
    },
  },
}
</script>