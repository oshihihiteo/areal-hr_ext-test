<template>
  <div class="app-container">
    <NavigationBar @changeView="currentView = $event" />
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Organizations from "./components/Organizations.vue";
import Departments from "./components/Departments.vue";
import Positions from "./components/Positions.vue";
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar,
    Organizations,
    Departments,
    Positions,
  },
  data() {
    return {
      currentView: "organizations",
    };
  },
  computed: {
    currentComponent() {
      return this.currentView === "organizations"
          ? "Organizations"
          : this.currentView === "departments"
              ? "Departments"
              : "Positions";
    },
  },
};
</script>

<style>
.app-container {
  display: flex;
}

.content {
  margin-left: 120px;
  padding: 20px;
  flex-grow: 1;
}
</style>
