<template>
  <div class="app-container">
    <NavigationBar v-if="showNavbar" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
nav {
  padding: 10px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}

.app-container {
  display: flex;
}

.content {
  margin-left: 120px;
  padding: 20px;
  flex-grow: 1;
}
</style>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";

export default defineComponent({
  components: { NavigationBar },
  setup() {
    const route = useRoute();

    const showNavbar = computed(() => {
      return route.path !== '/login';
    });

    return {
      showNavbar,
    };
  },
});
</script>
