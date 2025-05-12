<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
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
          <BaseButton v-if="isAdmin" @click="editUser(user)" size="sm">
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdmin"
            @click="deleteUser(user.id)"
            variant="danger"
            size="sm"
          >
            Удалить
          </BaseButton>
          <BaseButton
            v-if="isAdmin"
            @click="limitUser(user.id)"
            variant="warning"
            size="sm"
          >
            Ограничить доступ
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
