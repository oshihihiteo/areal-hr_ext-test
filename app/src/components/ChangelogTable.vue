<script>
export default {
  props: ["changelogs"],
};
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Дата и время</th>
      <th>Пользователь</th>
      <th>Тип объекта</th>
      <th>ID оъекта</th>
      <th>Новые данные</th>
      <th>Дата создания</th>
      <th>Дата изменений</th>
      <th>Дата удаления</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="changelog in changelogs" :key="changelog.id">
      <td>{{ changelog.date_and_time }}</td>
      <td>{{ changelog.lastname }} {{ changelog.firstname }} {{ changelog.patronymic }}</td>
      <td>{{ changelog.name }}</td>
      <td>{{ changelog.object_id }}</td>
      <td>{{ changelog.changed_fields }}</td>
      <td>{{ changelog.created_at }}</td>
      <td>{{ changelog.updated_at }}</td>
      <td>{{ changelog.deleted_at }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>
