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

  <v1 :zoom="zoom" v-if="componentId === 1" />
  <v2 :zoom="zoom" v-else-if="componentId === 2" />
  <v3 :zoom="zoom" v-else />
</template>

<script>
import V1 from './components/v1/Main.vue'
import V2 from './components/v2/Main.vue'
import V3 from './components/v3/Main.vue'

export default {
  name: 'App',
  components: {
    V1,
    V2,
    V3
  },
  data() {
    return {
      componentId: Number(localStorage.getItem('v')) || 3,
      zoom: 1
    }
  },
  methods: {
    select(v) {
      this.componentId = v
      localStorage.setItem('v', v)
    }
  },
  created() {
    const width = document.body.clientWidth

    if (width < 410) {
      this.zoom = (width / 410).toFixed(2)
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
