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
      connection: null,
      dialogs: [],
      messages: [],
    };
  },
  computed: {},
  created() {
    if (this.accessToken) {
      console.log("prop access dafasdfsadfads token", this.accessToken);
      this.connection = new WebSocket(`${this.webSocketUrl}?token=${this.accessToken}`);
      this.connection.onopen = (event) => {
        console.log(event);
        console.log("Successfully connected");
        this.fetchDialogs();
        this.fetchMessages();
      };
      this.connection.onmessage = (event) => {
        console.log(event);
        this.fetchMessages();
        this.fetchDialogs();
      };
      this.connection.onerror = function (event) {
        console.error("Error en el WebSocket detectado:", event);
      };
    }
  },
  methods: {
    toggleBox() {
      this.isBoxActive = !this.isBoxActive;
    },
    async fetchDialogs() {
      const resp = await fetch(`${this.baseUrl}dialogs/`, {
        method: "GET",
        headers: { Authorization: this.accessToken },
      });
      const json = await resp.json();
      this.dialogs = json.data;
    },
    async fetchMessages() {
      const resp = await fetch(`${this.baseUrl}messages/`, {
        method: "GET",
        headers: { Authorization: this.accessToken },
      });
      const json = await resp.json();
      this.messages = json.data;
    },
    sendMessage(payload) {
      this.connection.send(JSON.stringify({ ...payload, random_id: Math.round(Math.random() * -1000), msg_type: 3 }));
    },
    readMessage(payload) {
      // {user_pk, message_id, msg_type}
      this.connection.send(JSON.stringify({ ...payload, msg_type: 6 }));
    },
  },
};
</script>
