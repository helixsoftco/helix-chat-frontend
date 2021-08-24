<template>
  <div class="h-contact-list">
    <h-contact-list-item @click.native="selectContact" v-for="(item, index) in 20" :key="index" />
  </div>
</template>

<script>
import HContactListItem from "./h-contact-list-item";
export default {
  name: "h-contact-list",
  components: {HContactListItem},
  methods: {
    selectContact() {
      this.$emit("showChat")
    }
  },
}
</script>