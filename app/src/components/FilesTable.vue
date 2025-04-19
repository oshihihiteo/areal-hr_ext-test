<script>
export default {
  props: ["files"],
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
          <button @click="openFile(file)">Открыть файл</button>
        </td>
        <td>
          <button @click="editFile(file)">Редактировать</button>
          <button @click="deleteFile(file.id)">Удалить</button>
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
