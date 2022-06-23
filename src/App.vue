<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

enum SpaceColor {
  food = 'bg-#415065',
  body = 'bg-#a3e2c5',
  head = 'bg-#9d2932',
  empty = '',
}

enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

const snakeBox = $ref(Array.from({ length: 15 }).map(() => Array.from({ length: 15 }).map(() => ({ bg: SpaceColor.empty }))))
let headPosition = { y: 0, x: 0 }

let bodyPositions = $ref<{ y: number; x: number }[]>([])
let foodPosition = $ref({ y: 0, x: 0 })

let currentDirection: Direction | null
let currentStatus: 'manual' | 'auto'

function genSnake() {
  headPosition = { y: 0, x: 3 }
  snakeBox[headPosition.y][headPosition.x].bg = SpaceColor.head

  bodyPositions = [
    {
      y: 0,
      x: 2,
    },
    {
      y: 0,
      x: 1,
    },
    {
      y: 0,
      x: 0,
    },
  ]

  for (const { y, x } of bodyPositions) {
    snakeBox[y][x].bg = SpaceColor.body
  }
}
function genFood() {
  let y = Math.floor(Math.random() * 15)
  let x = Math.floor(Math.random() * 15)

  while (isSpaceInSnake(y, x)) {
    y = Math.floor(Math.random() * 15)
    x = Math.floor(Math.random() * 15)
  }

  foodPosition = { y, x }
  snakeBox[y][x].bg = SpaceColor.food
}

function isEatFood() {
  return headPosition.y === foodPosition.y && headPosition.x === foodPosition.x
}
function snakeRun(newHeadY: number, newHeadX: number) {
  if (!snakeBox[newHeadY]?.[newHeadX] || isSpaceInSnake(newHeadY, newHeadX)) {
    gameOver()
    return
  }

  snakeBox[newHeadY][newHeadX].bg = SpaceColor.head
  const { y: oldHeadY, x: oldHeadX } = headPosition
  headPosition = { y: newHeadY, x: newHeadX }

  snakeBox[oldHeadY][oldHeadX].bg = SpaceColor.body
  bodyPositions.unshift({ y: oldHeadY, x: oldHeadX })
  if (isEatFood()) {
    genFood()
  } else {
    const last = bodyPositions.pop()!
    snakeBox[last.y][last.x].bg = SpaceColor.empty
  }

  loopAction()
}

function isSpaceInSnake(y: number, x: number) {
  return (y === headPosition.y && x === headPosition.x) || bodyPositions.some(({ y: _y, x: _x }) => y === _y && x === _x)
}

let timer: number
function loopAction() {
  clearInterval(timer)
  timer = setInterval(() => {
    handle(currentDirection)
  }, 300)
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

  currentDirection = dir

  snakeRun(y, x)
}

function handleKeyDown(e: KeyboardEvent) {
  let dir: Direction | null
  switch (e.key) {
    case 'ArrowUp':
      dir = Direction.up
      break
    case 'ArrowDown':
      dir = Direction.down
      break
    case 'ArrowLeft':
      dir = Direction.left
      break
    case 'ArrowRight':
      dir = Direction.right
      break
    default:
      dir = null
      break
  }

  if (!dir || dir === currentDirection) {
    return
  }
  handle(dir)
}
function eventHandling(type: 'register' | 'unregister') {
  if (type === 'register') {
    window.addEventListener('keydown', handleKeyDown)
  } else {
    window.removeEventListener('keydown', handleKeyDown)
  }
}

function manualBeginGame() {
  init()
  currentStatus = 'manual'

  eventHandling('register')
}

function aStarBeginGame() {
  init()

  currentStatus = 'auto'
}

function gameOver() {
  currentStatus === 'manual' ? manualBeginGame() : aStarBeginGame()
}

function cleanEffect() {
  eventHandling('unregister')
  clearInterval(timer)
}

function initSpace() {
  const spaces = [...bodyPositions, headPosition, foodPosition]
  for (const { y, x } of spaces) {
    snakeBox[y][x].bg = SpaceColor.empty
  }
}

function init() {
  cleanEffect()
  initSpace()
  genSnake()
  genFood()
  currentDirection = null
}

onBeforeUnmount(() => {
  cleanEffect()
})
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

    <div class="my-12px">
      <div>身体长度：{{ bodyPositions.length }}</div>
    </div>

    <div>
      <button class="mr-12px" @click="manualBeginGame">
        开始游戏
      </button>
      <button @click="aStarBeginGame">
        A*算法自动
      </button>
    </div>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
