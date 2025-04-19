<script>
import * as changelogAPI from "../instances/changelog.js";
import ChangelogTable from "@/components/ChangelogTable.vue";

export default {
  components: { ChangelogTable },
  data() {
    return {
      changelogs: [],
    };
  },
  methods: {
    async getChangelog() {
      try {
        this.changelogs = await changelogAPI.getChangelog();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
  },
  mounted() {
    this.getChangelog();
  },
};
</script>

<template>
  <div class="content">
    <h2>История изменений</h2>
    <ChangelogTable :changelogs="changelogs" />
  </div>
</template>

<style scoped></style>
