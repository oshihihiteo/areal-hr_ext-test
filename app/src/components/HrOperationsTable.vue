<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  props: ["isAdminOrManager", "hrOperations"],
  methods: {
    editHrOperation(hrOperation) {
      this.$emit("edit", hrOperation);
    },
    deleteHrOperation(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>Дата</th>
        <th>Сотрудник</th>
        <th>Действие</th>
        <th>Отдел</th>
        <th>Позиция</th>
        <th>Зарплата</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hrOperation in hrOperations" :key="hrOperation.id">
        <td>{{ hrOperation.id }}</td>
        <td>{{ hrOperation.created_at }}</td>
        <td>
          {{ hrOperation.lastname }} {{ hrOperation.firstname }}
          {{ hrOperation.patronymic }}
        </td>
        <td>{{ hrOperation.action_name }}</td>
        <td>{{ hrOperation.department_name }}</td>
        <td>{{ hrOperation.position_name }}</td>
        <td>{{ hrOperation.salary }}</td>
        <td>
          <BaseButton
            v-if="isAdminOrManager"
            @click="editHrOperation(hrOperation)"
            size="sm"
          >
            Редактировать
          </BaseButton>
          <BaseButton
            v-if="isAdminOrManager"
            @click="deleteHrOperation(hrOperation.id)"
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

<style scoped></style>
