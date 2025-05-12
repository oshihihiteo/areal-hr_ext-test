<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  props: ["isAdminOrManager", "organizations"],
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
        <td>{{ organization.comment }}</td>
        <td>
          <BaseButton
            v-if="isAdminOrManager"
            @click="editOrganization(organization)"
            size="sm"
          >
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdminOrManager"
            @click="deleteOrganization(organization.id)"
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
