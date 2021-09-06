<template>
  <div class="h-box-body" ref="HBoxBody">
    <div class="h-box-body__chat" ref="HBoxBodyChat">
      <div class="h-row" :class="menssage.out ? 'h-row__output' : 'h-row__input'" v-for="menssage in reverseMessages" :key="menssage.sent">
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
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
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
    this.$nextTick(() => {
      this.$refs.HBoxBody.scrollTop = this.$refs.HBoxBody.scrollHeight
    })
  },
  methods: {
    filterMessages() {
      this.messagesFilteredByUser = this.messages.filter((m) => (m.out && (m.recipient === this.otherUserId)) || !m.out && (m.sender === this.otherUserId))
      const lastMessage = this.messagesFilteredByUser[0]
      if(!lastMessage.read && !lastMessage.out) {
        this.readMessage({message_id: lastMessage.id})
      }
    },
    readMessage(payload) {
      console.log("readMessage", payload)
      //{user_pk, message_id, msg_type}
      this.$emit("readMessage", payload)
    },
    getDate(number){
      dayjs.extend(duration)
      dayjs.extend(relativeTime)
      dayjs.duration(1, "minutes").humanize()
      const date = new dayjs(number)
      return date
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
}
</script>