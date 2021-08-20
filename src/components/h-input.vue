<template>
  <input placeholder="Escribe un mensaje..." class="h-input" type="text">
</template>

<script>
export default {
  name: "h-input"
}
</script>

<style scoped>
  .h-input {
    padding: 1rem;
    background: #25305A;
    border: none;
    font-size: 18px;
    font-weight: bold;
    color: white;
    width: 100%;
  }
  .h-input:focus {
    outline: none;
  }

  .h-input::placeholder {
    font-weight: bold;
    color: white;
  }
</style>