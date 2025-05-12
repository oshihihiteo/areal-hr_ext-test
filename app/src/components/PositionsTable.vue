<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  props: ["isAdminOrManager", "positions"],
  methods: {
    editPosition(position) {
      this.$emit("edit", position);
    },
    deletePosition(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="position in positions" :key="position.id">
        <td>{{ position.name }}</td>
        <td>
          <BaseButton
            v-if="isAdminOrManager"
            @click="editPosition(position)"
            size="sm"
          >
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdminOrManager"
            @click="deletePosition(position.id)"
            variant="danger"
            size="sm"
          >
            Удалить
          </BaseButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
