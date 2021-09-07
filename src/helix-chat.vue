<template>
  <div class="helix-chat">
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
    base_url: {
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
      messages: []
    };
  },
  async created() {
    if (!this.access_token) {
      console.log("prop acces token", this.access_token);
      console.log("prop base url", this.base_url);
      const {access_token} = await this.getAccessToken()
      console.log(process.env)
      console.log(access_token)
      this.accessToken = access_token
    } else {
      console.log("prop acces token", this.access_token);
      this.accessToken = this.access_token
    }

    
    this.connection = new WebSocket(`wss://global-games.dev.altix.co/chat_ws?param=1&token=${this.accessToken}`)
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
  computed: {},
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive
    },
    async getAccessToken() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const params = new FormData()
      params.append("grant_type", "password")
      params.append("username", localStorage.getItem('username'))
      params.append("password", "admin")
      params.append("client_id", "03Z1U46wujpGV6TeBN0a4wWsNuRLdOy5b9Oc3kHx")
      const resp = await fetch(`${this.base_url}o/token/`, {method: "POST", body: params})
      const data = await resp.json()
      return data
    },
    async fetchDialogs() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const resp = await fetch(`${this.base_url}dialogs/`, {
        method: 'GET',
        headers: {Authorization: "Bearer " + this.accessToken}
      })
      const json = await resp.json()
      this.dialogs = json.data
    },
    async fetchMessages() {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const resp = await fetch(`${this.base_url}messages/`, {
        method: 'GET',
        headers: {Authorization: "Bearer " + this.accessToken}
      })
      const json = await resp.json()
      this.messages = json.data
    },
    sendMessage(payload) {
      this.connection.send(JSON.stringify({...payload, random_id: Math.round(Math.random() * -1000), msg_type: 3}))
    },
    readMessage(payload) {
      //{user_pk, message_id, msg_type}
      this.connection.send(JSON.stringify({...payload, msg_type: 6}))
    }
  },
};
</script>