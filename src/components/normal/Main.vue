<template>
  <div class="box">
    <ul class="container">
      <li
        v-for="(item, index) of snake"
        :key="index"
        class="point"
        :class="item.bg"
      />
    </ul>
  </div>
  <div>身体长度：{{ snakePoor.length }} | 吃掉的食物：{{ eatenFood }}</div>
  <div>
    FoodOptions：{{ randomNum }} | snake头部：{{
      snakePoor[snakePoor.length - 1]
    }}
  </div>

  <div class="arrow">
    <div class="top" v-tap="{ fn: changeDirection, params: { keyCode: 38 } }">
      ↑
    </div>
    <div class="right" v-tap="{ fn: changeDirection, params: { keyCode: 39 } }">
      →
    </div>
    <div class="down" v-tap="{ fn: changeDirection, params: { keyCode: 40 } }">
      ↓
    </div>
    <div class="left" v-tap="{ fn: changeDirection, params: { keyCode: 37 } }">
      ←
    </div>
  </div>
</template>

<script lang="ts" setup>
import { beginGame } from './snake'
import vTap from '../../directive/tap'

const { snake, eatenFood, randomNum, changeDirection, snakePoor } = beginGame()
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
