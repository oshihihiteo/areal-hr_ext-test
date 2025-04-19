<script>
export default {
  props: ["positions"],
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
          <button @click="editPosition(position)">Редактировать</button>
          <button @click="deletePosition(position.id)">Удалить</button>
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
