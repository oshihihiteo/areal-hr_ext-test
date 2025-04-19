<script>
export default {
  props: ["buttonName"],
  methods: {
    showCreateForm() {
      this.$emit("create");
    },
  },
};
</script>

<template>
  <button @click="showCreateForm">Добавить {{ buttonName }}</button>
</template>

<style scoped></style>
