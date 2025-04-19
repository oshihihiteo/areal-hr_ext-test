<template>
  <div class="app-container">
    <NavigationBar></NavigationBar>
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
import { defineComponent } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default defineComponent({
  components: { NavigationBar },
});
</script>
