<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  props: ["isAdminOrManager", "files"],
  methods: {
    editFile(file) {
      this.$emit("edit", file);
    },
    deleteFile(id) {
      this.$emit("delete", id);
    },
    openFile(file) {
      this.$emit("open", file);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Сотрудник</th>
        <th>Ссылка</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.id">
        <td>{{ file.name }}</td>
        <td>{{ file.lastname }} {{ file.firstname }} {{ file.patronymic }}</td>
        <td>
          <BaseButton @click="openFile(file)" size="sm">
            Открыть файл
          </BaseButton>
        </td>
        <td>
          <BaseButton v-if="isAdminOrManager" @click="editFile(file)" size="sm">
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdminOrManager"
            @click="deleteFile(file.id)"
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
