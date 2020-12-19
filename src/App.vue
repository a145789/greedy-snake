<template>
  <div class="m-b-20 link">
    <div @click="select('v1')">v1</div>
    <div @click="select('v2')">v2</div>
  </div>

  <div class="m-10">{{ componentId }}</div>

  <v1 v-if="componentId === 'v1'" />
  <v2 v-else />
</template>

<script>
import V1 from './components/v1/Main.vue'
import V2 from './components/v2/Main.vue'

export default {
  name: 'App',
  components: {
    V1,
    V2
  },
  data() {
    return {
      componentId: localStorage.getItem('v') || 'v1'
    }
  },
  methods: {
    select(v) {
      this.componentId = v
      localStorage.setItem('v', v)
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
  color: blue;
  border: 1px solid aqua;
  margin: 8px;
  padding: 3px 10px;
  border-radius: 8px;
}
</style>
