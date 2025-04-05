<template>
  <div class="navbar">
    <nav>
      <router-link to="/positions">Должности</router-link> <br>
      <router-link to="/organizations">Организации</router-link> <br>
      <router-link to="/departments">Отделы</router-link>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  background-color: #e5e5e5;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.navbar button {
  background: none;
  border: none;
  color: #000000;
  text-align: left;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.navbar button:hover {
  background-color: #c1c3cb;
}
</style>
<script setup>
</script>