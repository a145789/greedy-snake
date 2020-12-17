<template>
  <div class="box">
    <ul class="container">
      <li
        v-for="item of 400"
        :key="item"
        class="point"
        :class="randomNum === item - 1 ? 'b-c-0' : ''"
      />
    </ul>

    <ul class="snake">
      <li
        v-for="item of snake"
        :key="item.id"
        :style="
          'top:' +
          item.top +
          'px;left:' +
          item.left +
          'px;background-color:' +
          item.bg
        "
      ></li>
    </ul>
  </div>
  <div>身体长度：{{ snake.length }} | 吃掉的食物：{{ eatenFood }}</div>
  <div>
    FoodOptions：{{ randomNum }} | snake头部：{{ snake[snake.length - 1].id }}
  </div>
</template>

<script>
import { snake, eatenFood, randomNum } from './snake.js'

export default {
  name: 'Main',
  setup() {
    return {
      randomNum,
      snake,
      eatenFood
    }
  }
}
</script>

<style>
.box {
  position: relative;
  height: 400px;
  width: 400px;
  border: 4px solid #ededed;
  margin: auto;
}
ul,
ul li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.point {
  height: 20px;
  width: 20px;
}
.b-c-0 {
  background-color: #000;
}
.snake {
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
}
.snake li {
  position: absolute;
  background-color: red;
  height: 20px;
  width: 20px;
}
</style>
