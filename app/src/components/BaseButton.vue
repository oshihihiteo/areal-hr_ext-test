<template>
  <button :type="type" @click="$emit('click')" :class="btnClass">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    btnClass: {
      type: String,
      default: "default-button",
    },
  },
};
</script>

<style scoped>
.default-button {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  margin-right: 8px;
}
</style>
