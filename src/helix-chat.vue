<template>
  <div class="helix-chat">
    <input v-model="user" type="text" >
    <button @click="getAccessToken()">login</button>
    <h-box @sendMessage="sendMessage" @readMessage="readMessage" :dialogs="dialogs" :messages="messages" :class="isBoxActive ? 'active': ''"/>
    <h-floating-button :class="isBoxActive ?'box-activated': ''" @onClick="toggleBox"/>
  </div>
</template>
<script>
import HFloatingButton from "./components/h-floating-button";
import HBox from "./components/h-box";

export default /*#__PURE__*/{
  name: 'HelixChat',
  components: {HBox, HFloatingButton},
  props: {
    access_token: {
      type: String,
      require: true
    },
  },
  data() {
    return {
      isBoxActive: false,
      connection: null,
      accessToken: null,
      dialogs: [],
      messages: [],
      user: '',
      token: ''
    };
  },
  async created() {

  },
  computed: {},
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive
    },
    async getAccessToken() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const params = new FormData()
      params.append("grant_type", "password")
      params.append("username", this.user)
      params.append("password", "admin")
      params.append("client_id", "03Z1U46wujpGV6TeBN0a4wWsNuRLdOy5b9Oc3kHx")
      const resp = await fetch(`${baseUrl}o/token/`, {method: "POST", body: params})
      const data = await resp.json()
      this.token = data.access_token
      console.log(data)
      this.connectWithSockets()
      return data
    },
    async connectWithSockets() {
      //const {access_token} = await this.getAccessToken()
      console.log(process.env)
      //console.log(access_token)
      //this.accessToken = access_token
      //this.connection = new WebSocket(`ws://${window.location.hostname}:8000/chat_ws/`, ["token", access_token])
      this.connection = new WebSocket(`wss://global-games.dev.altix.co/chat_ws?param=1&token=${this.token}`)

      this.connection.onopen = (event) => {
        console.log(event)
        console.log("Successfully connected")
        this.fetchDialogs()
        this.fetchMessages()
      }
      this.connection.onmessage = (event) => {
        console.log(event)
        this.fetchMessages()
        this.fetchDialogs()
      }
      this.connection.onerror = function (event) {
        console.error("Error en el WebSocket detectado:", event);
      };
    },
    async fetchDialogs() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const resp = await fetch(`${baseUrl}/dialogs/`, {
        method: 'GET',
        headers: {Authorization: "Bearer " + this.token}
      })
      const json = await resp.json()
      this.dialogs = json.data
    },
    async fetchMessages() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const resp = await fetch(`${baseUrl}/messages/`, {
        method: 'GET',
        headers: {Authorization: "Bearer " + this.token}
      })
      const json = await resp.json()
      this.messages = json.data
    },
    sendMessage(payload) {
      //{text, user_pk, random_id, msg_type}
      this.connection.send(JSON.stringify({...payload, random_id: Math.round(Math.random() * -1000), msg_type: 3}))
    }, 
    readMessage(payload) {
      console.log("final read", payload)
      //{user_pk, message_id, msg_type}
      this.connection.send(JSON.stringify({...payload, msg_type: 6}))
    }
  },
};
</script>