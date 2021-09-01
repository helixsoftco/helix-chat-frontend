<template>
  <div class="h-contact-list-item">
    <div class="h-contact-list-item__thumbnail">
      <img src="https://d1t35hkz8sx2bl.cloudfront.net/api/file/Hwdh5n9mRfKaijirIewZ?cache=true" alt="imagen de contacto">
    </div>
    <div class="h-contact-list-item--info">
      <div class="h-contact-list-item--info__name">{{dialog.username}}</div>
      <div class="h-contact-list-item--info__message">{{dialog.last_message.text}}</div>
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