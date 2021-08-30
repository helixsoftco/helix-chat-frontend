<template>
  <div class="h-contact-list">
    <h-contact-list-item @click.native="selectContact(dialog)" :dialog="dialog" v-for="dialog in dialogs" :key="dialog.id" />
  </div>
</template>

<script>
import HContactListItem from "./h-contact-list-item";
export default {
  name: "h-contact-list",
  components: {HContactListItem},
  props: {
    dialogs: {
      type: Array,
      default: []
    },
  },
  methods: {
    selectContact(dialog) {
      this.$emit("showChat", dialog)
    }
  },
}
</script>