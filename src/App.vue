<template>
  <div class="flex items-center justify-center pt-20px mb-20px">
    <div v-for="item of 3" :key="item" class="" @click="select(item)">
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
