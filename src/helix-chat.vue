<template>
  <div class="helix-chat">
    <h-box @sendMessage="sendMessage" :dialogs="dialogs" :messages="messages" :class="isBoxActive ? 'active': ''"/>
    <h-floating-button :class="isBoxActive ?'box-activated': ''" @onClick="toggleBox" />
  </div>
</template>

<script>
import HFloatingButton from "./components/h-floating-button";
import HBox from "./components/h-box";
export default /*#__PURE__*/{
  name: 'HelixChat',
  components: {HBox, HFloatingButton },
  data() {
    return {
      isBoxActive: false,
      connection: null,
      accessToken: null,
      dialogs: [],
      messages: []
    };
  },
  async created() {
    const baseUrlSocket = process.env.VUE_APP_BASE_URL_SOCKET
    const {access_token} = await this.getAccessToken()
    console.log(access_token)
    this.accessToken = access_token

    try {
      this.connection = new WebSocket("ws://localhost:8000/chat_ws/", ["token", access_token])
      this.connection.onopen = (event) => {
        console.log(event)
        console.log("Successfully connected")
        this.fetchDialogs()
        this.fetchMessages()
      }
      this.connection.onmessage = (event) => {
        console.log(event)
      }
    } catch (e) {
      console.log(e)
    }
  },
  computed: {

  },
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive
    },
    async getAccessToken() {
      const baseUrl = process.env.VUE_APP_BASE_URL

      const params = new FormData()
      params.append("grant_type", "password")
      params.append("username", "admin2")
      params.append("password", "admin")
      params.append("client_id", "03Z1U46wujpGV6TeBN0a4wWsNuRLdOy5b9Oc3kHx")

      const resp = await  fetch(`${baseUrl}o/token/`, {method: "POST", body: params })
      const data = await resp.json()
      return data
    },
    async fetchDialogs() {
      const baseSocketUrl = process.env.VUE_APP_BASE_URL_SOCKET
      const resp = await fetch(`${baseSocketUrl}dialogs/`, {method: 'GET', headers: {Authorization: this.accessToken} })
      const json = await resp.json()
      this.dialogs = json.data
    },
    async fetchMessages() {
      const baseSocketUrl = process.env.VUE_APP_BASE_URL_SOCKET
      const resp = await fetch(`${baseSocketUrl}messages/`, {method: 'GET', headers: {Authorization: this.accessToken} })
      const json = await resp.json()
      this.messages = json.data
    },
    sendMessage(payload) {
      console.log({...payload, random_id: 1, msg_type: 3})
      this.connection.send({...payload, random_id: 1, msg_type: "3"})
    }
  },
};
</script>
