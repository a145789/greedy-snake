<template>
  <div class="m-b-20 link">
    <div
      v-for="item of 3"
      :key="item"
      :class="item === componentId ? 'bg' : ''"
      @click="select(item)"
    >
      v{{ item }}
    </div>
  </div>

  <Normal />
</template>

<script lang="ts">
import Normal from './components/normal/Main.vue'

export default {
  name: 'App',
  components: {
    Normal
  },
  data() {
    return {
      componentId: Number(localStorage.getItem('v')) || 3
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.m-b-20 {
  margin-bottom: 20px;
}
.m-10 {
  margin: 10px;
}
.link {
  display: flex;
  justify-content: center;
}
.link div {
  cursor: pointer;
  background: #fff;
  color: #42b983;
  border: 1px solid #42b983;
  margin: 8px;
  padding: 4px 18px;
  border-radius: 999px;
  line-height: 1em;
  font-weight: 700;
}
.title {
  font-weight: 700;
}
.bg {
  color: #fff !important;
  background-color: #42b983 !important;
}
</style>
