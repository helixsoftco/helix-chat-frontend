<template>
  <div class="h-box">
    <div class="h-box__input-container">
      <h-input/>
    </div>
  </div>
</template>

<script>
import HInput from "./h-input";
export default {
  name: "h-box",
  components: {HInput}
}
</script>

<style lang="scss">
.h-box {
  max-width: 0;
  width: 100%;
  height: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .05);
  border-radius: 10px;
  position: fixed;
  bottom: 70px;
  right: 70px;
  background-color: $h-bg-box;
  transition: all ease-in-out .3s;
  padding: 1rem;
  overflow: hidden;

  &__input-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid #404e81;
  }

  &.active {
    height: 600px;
    max-width: 360px;
  }
}

</style>