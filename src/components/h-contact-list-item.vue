<template>
  <div class="h-contact-list-item">
    <div class="h-contact-list-item__thumbnail">
      <img :src="dialog.avatar" alt="imagen de contacto">
      <span v-if="dialog.last_message && !dialog.last_message.read && !dialog.last_message.out" class="ping"></span>
    </div>
    <div class="h-contact-list-item--info">
      <div class="h-contact-list-item--info__name">{{dialog.username}}</div>
      <div v-if="dialog.last_message" class="h-contact-list-item--info__message">{{dialog.last_message.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "h-contact-list-item",
  props: {
    dialog: {
      type: Object,
      require: true
    },
  },
}
</script>
