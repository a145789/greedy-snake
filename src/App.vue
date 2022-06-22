<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'

enum SpaceColor {
  food = 'bg-#415065',
  body = 'bg-#a3e2c5',
  head = 'bg-#9d2932',
}

enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

const snakeBox = $ref(Array.from({ length: 15 }).map(() => Array.from({ length: 15 }).map(() => ({ bg: '' }))))
const headPosition = { y: 0, x: 3 }
const bodyPositions = [{
  y: 0,
  x: 2,
}, {
  y: 0,
  x: 1,
}, {
  y: 0,
  x: 0,
}]

function genSnake() {
  snakeBox[0][0].bg = SpaceColor.body
  snakeBox[0][1].bg = SpaceColor.body
  snakeBox[0][2].bg = SpaceColor.body
  snakeBox[0][3].bg = SpaceColor.head
}
function snakeRun(newHeadY: number, newHeadX: number) {
  snakeBox[newHeadY][newHeadX].bg = SpaceColor.head
  const { y: oldHeadY, x: oldHeadX } = headPosition
  headPosition.y = newHeadY
  headPosition.x = newHeadX

  const last = bodyPositions[bodyPositions.length - 1]
  snakeBox[oldHeadY][oldHeadX].bg = SpaceColor.body
  snakeBox[last.y][last.x].bg = ''
  bodyPositions.pop()
  bodyPositions.unshift({ y: oldHeadY, x: oldHeadX })
}

function isSpaceInSnake(y: number, x: number) {
  return (y === headPosition.y && x === headPosition.x) || bodyPositions.some(({ y: _y, x: _x }) => y === _y && x === _x)
}

function genFood() {
  let y = Math.floor(Math.random() * 15)
  let x = Math.floor(Math.random() * 15)

  while (isSpaceInSnake(y, x)) {
    y = Math.floor(Math.random() * 15)
    x = Math.floor(Math.random() * 15)
  }

  snakeBox[y][x].bg = SpaceColor.food
}

function handle(dir: Direction) {
  let { y, x } = headPosition
  switch (dir) {
    case Direction.up:
      y--
      break
    case Direction.down:
      y++
      break
    case Direction.left:
      x--
      break
    case Direction.right:
      x++
      break
    default:
      break
  }

  if (!snakeBox[y]?.[x] || isSpaceInSnake(y, x))
    alert('Game Over')

  else
    snakeRun(y, x)
}

function init() {
  genSnake()
  genFood()
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        handle(Direction.up)
        break
      case 'ArrowDown':
        handle(Direction.down)
        break
      case 'ArrowLeft':
        handle(Direction.left)
        break
      case 'ArrowRight':
        handle(Direction.right)
        break
      default:
        break
    }
  })
}

init()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h2 v-once>
      贪吃蛇
    </h2>
    <div class="mt-2 w-300px h-300px border-2">
      <div v-for="item, index in snakeBox" :key="index" class="flex">
        <div v-for="({ bg }, idx) in item" :key="idx" class="w-20px h-20px" :class="bg" />
      </div>
    </div>
  </div>
</template>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
}
</style>
