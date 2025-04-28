<script>
import { limitUser } from "@/instances/users.js";

export default {
  props: ["isAdmin", "isAdminOrManager", "users"],
  methods: {
    editUser(user) {
      this.$emit("edit", user);
    },
    deleteUser(id) {
      this.$emit("delete", id);
    },
    limitUser(id) {
      this.$emit("limit", id);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ФИО</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.lastname }} {{ user.firstname }} {{ user.patronymic }}</td>
        <td>
          <button v-if="isAdmin" @click="editUser(user)">Редактировать</button>
          <button v-if="isAdmin" @click="deleteUser(user.id)">Удалить</button>
          <button v-if="isAdmin" @click="limitUser(user.id)">
            Ограничить доступ
          </button>
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
