<template>
  <div class="helix-chat">
    <h-box
      :dialogs="dialogs"
      :messages="messages"
      :class="isBoxActive ? 'active' : ''"
      @sendMessage="sendMessage"
      @readMessage="readMessage"
    />
    <h-floating-button :class="isBoxActive ? 'box-activated' : ''" @onClick="toggleBox" />
  </div>
</template>
<script>
import HFloatingButton from "./components/h-floating-button";
import HBox from "./components/h-box";
import ReconnectingWebSocket from 'reconnecting-websocket';

export default /*#__PURE__*/{ // eslint-disable-line
  name: "HelixChat",
  components: { HBox, HFloatingButton },
  props: {
    accessToken: {
      type: String,
      require: true,
      default: null,
    },
    webSocketUrl: {
      type: String,
      require: true,
      default: null,
    },
    baseUrl: {
      type: String,
      require: true,
      default: null,
    },
  },
  data() {
    return {
      isBoxActive: false,
      socket: null,
      dialogs: [],
      messages: [],
    };
  },
  computed: {},
  created() {
    if (this.accessToken) {
      this.socket = new ReconnectingWebSocket(`${this.webSocketUrl}?token=${this.accessToken}`);
      this.socket.onopen = (event) => {
        // Successfully connected
        console.log("Successfully connected", event); // eslint-disable-line
        this.fetchDialogs();
        this.fetchMessages();
      };
      this.socket.onmessage = (event) => {
        // Receiving messages
        if (event.isTrusted) {
          console.log("Receiving message", event);
          this.fetchMessages();
          this.fetchDialogs();
        }
      };
      this.socket.onclose = (event) =>{
        console.log("websocket closed", event)
      }
      this.socket.onerror = function (event) {
        console.error("Error en el WebSocket detectado:", event);
      };
    }
  },
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive;
    },
    getSocketState() {
      if (this.socket.readyState === 0) {
        return "Connecting..."
      } else if (this.socket.readyState === 1) {
        return "Connected"
      } else if (this.socket.readyState === 2) {
        return "Disconnecting..."
      } else if (this.socket.readyState === 3) {
        return "Disconnected"
      }
    },
    async fetchDialogs() {
      const resp = await fetch(`${this.baseUrl}dialogs/`, {
        method: "GET",
        headers: { Authorization: this.accessToken },
      });
      const json = await resp.json();
      this.dialogs = json.results;
    },
    async fetchMessages() {
      const resp = await fetch(`${this.baseUrl}messages/`, {
        method: "GET",
        headers: { Authorization: this.accessToken },
      });
      const json = await resp.json();
      this.messages = json.results;
    },
    sendMessage(payload) {
      this.socket.send(JSON.stringify({ ...payload, random_id: Math.round(Math.random() * -1000), msg_type: 3 }));
    },
    readMessage(payload) {
      // {user_pk, message_id, msg_type}
      this.socket.send(JSON.stringify({ ...payload, msg_type: 6 }));
    },
  },
};
</script>
