<script>
export default {
  props: ["organizations"],
  methods: {
    editOrganization(organization) {
      this.$emit("edit", organization);
    },
    deleteOrganization(id) {
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
          <th>Комментарий</th>
          <th>Действия</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="organization in organizations" :key="organization.id">
        <td>{{ organization.name }}</td>
          <td>{{organization.comment}}</td>
          <td>
            <button class="edit-btn" @click="editOrganization(organization)">Редактировать</button>
            <button class="delete-btn" @click="deleteOrganization(organization.id)">Удалить</button>
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
th, td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
