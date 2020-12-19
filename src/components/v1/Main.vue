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
        v-for="(item, index) of snake"
        :key="item.id"
        :style="'top:' + item.top + 'px;left:' + item.left + 'px'"
        :class="index + 1 === snake.length ? 'b-c-pink' : 'b-c-purple'"
      ></li>
    </ul>
  </div>
  <div>身体长度：{{ snake.length }} | 吃掉的食物：{{ eatenFood }}</div>
  <div>
    FoodOptions：{{ randomNum }} | snake头部：{{ snake[snake.length - 1].id }}
  </div>

  <div class="arrow">
    <div class="top" @click="changeDirection({ keyCode: 38 })">↑</div>
    <div class="right" @click="changeDirection({ keyCode: 39 })">→</div>
    <div class="down" @click="changeDirection({ keyCode: 40 })">↓</div>
    <div class="left" @click="changeDirection({ keyCode: 37 })">←</div>
  </div>
</template>

<script>
import { beginGame } from './snake.js'

export default {
  name: 'V1',
  setup() {
    const { snake, eatenFood, randomNum, changeDirection } = beginGame()

    return {
      randomNum,
      snake,
      eatenFood,
      changeDirection
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
  background-color: rgb(112, 198, 235);
}
.b-c-pink {
  background-color: rgb(21, 198, 81);
}
.b-c-purple {
  background-color: rgb(191, 74, 232);
}
.snake {
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
}
.snake li {
  position: absolute;
  height: 20px;
  width: 20px;
}
.arrow {
  position: relative;
  margin: 40px auto;
  height: 200px;
  width: 400px;
}
.arrow div {
  position: absolute;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 30px;
  border: 2px solid #eee;
}
.arrow .top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.arrow .down {
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.arrow .right {
  top: 50px;
  right: 25%;
  transform: translateX(-50%);
}
.arrow .left {
  top: 50px;
  left: 30%;
}
</style>
