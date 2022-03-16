<template>
  <div ref="HBoxBody" class="h-box-body">
    <div ref="HBoxBodyChat" class="h-box-body__chat">
      <div v-for="menssage in reverseMessages" :key="menssage.sent" class="h-row" :class="menssage.out ? 'h-row__output' : 'h-row__input'">
        <div class="h-row__message">
          {{ menssage.text }}
          <p class="h-row__message__date">{{getDate(menssage.sent)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

export default {
  name: "h-box-body",
  props: {
    otherUserId: {
      type: String,
      require: true,
      default: null
    },
    messages: {
      type: Array,
      default: () => [],
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
      return this.messagesFilteredByUser.reverse() // eslint-disable-line
    }
  },
  watch: {
    otherUserId() {
      this.filterMessages()
      this.$nextTick(() => {
        this.$refs.HBoxBody.scrollTop = this.$refs.HBoxBody.scrollHeight
      })
    },
    messages: {
      deep: true,
      handler() {
        this.filterMessages()
        this.$nextTick(() => {
          this.$refs.HBoxBody.scrollTop = this.$refs.HBoxBody.scrollHeight
        })
      }
    }
  },
  mounted() {
    this.filterMessages()
    this.$nextTick(() => {
      this.$refs.HBoxBody.scrollTop = this.$refs.HBoxBody.scrollHeight
    })
  },
  methods: {
    filterMessages() {
      this.messagesFilteredByUser = this.messages.filter((m) => (m.out && (m.recipient === this.otherUserId)) || !m.out && (m.sender === this.otherUserId))
      const lastMessage = this.messagesFilteredByUser[0]
      if(lastMessage && !lastMessage.read && !lastMessage.out) {
        this.readMessage({message_id: lastMessage.id})
      }
    },
    readMessage(payload) {
      // {user_pk, message_id, msg_type}
      this.$emit("readMessage", payload)
    },
    getDate(number){
      dayjs.extend(relativeTime)
      const date = new dayjs.unix(number).locale('es') // eslint-disable-line
      return date.fromNow()
    }
  },
}
</script>
