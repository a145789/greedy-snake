<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import ArrowCircleUp48Regular from '@vicons/fluent/ArrowCircleUp48Regular'
import ArrowCircleDown48Regular from '@vicons/fluent/ArrowCircleDown48Regular'
import ArrowCircleLeft48Regular from '@vicons/fluent/ArrowCircleLeft48Regular'
import ArrowCircleRight48Regular from '@vicons/fluent/ArrowCircleRight48Regular'
import { Icon } from '@vicons/utils'

interface Position {
  y: number
  x: number
}

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
  null = 'null',
}

const IS_USE_TOUCH = 'ontouchstart' in document.documentElement

type Mode = 'manual' | 'easyAi'

const snakeBox = $ref(Array.from({ length: 15 }).map(() => Array.from({ length: 15 }).map(() => ({ bg: SpaceColor.empty }))))
let headPosition = { y: 0, x: 0 }

let bodyPositions = $ref<Position[]>([])
let foodPosition = $ref({ y: 0, x: 0 })

let currentDirection: Direction = Direction.null
let currentMode = $ref<Mode>()
const timer: {
  [key in Mode]?: number
} = {}
let gameStatus = $ref<'pending' | 'playing' | 'over'>('pending')

//  主流程
function computedNextPosition(dir: Direction) {
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

  return { y, x }
}
function snakeRun(newHeadY: number, newHeadX: number) {
  if (!isSpaceNotInSnake(newHeadY, newHeadX)) {
    gameOver()
    return
  }

  snakeBox[newHeadY][newHeadX].bg = SpaceColor.head
  const { y: oldHeadY, x: oldHeadX } = headPosition
  headPosition = { y: newHeadY, x: newHeadX }

  snakeBox[oldHeadY][oldHeadX].bg = SpaceColor.body
  bodyPositions.reverse()
  bodyPositions.push({ y: oldHeadY, x: oldHeadX })
  bodyPositions.reverse()
  if (isEatFood()) {
    genFood()
  } else {
    const last = bodyPositions.pop()!
    snakeBox[last.y][last.x].bg = SpaceColor.empty
  }
}
function handle(dir: Direction) {
  const { y, x } = computedNextPosition(dir)
  currentDirection = dir
  snakeRun(y, x)
}
function beginGameInit() {
  initSpace()
  genSnake()
  genFood()

  gameStatus = 'playing'
  currentDirection = Direction.null
}
function gameOver() {
  cleanEffect()
  gameStatus = 'over'
}

// 普通模式
function manualBeginGame() {
  beginGameInit()
  currentMode = 'manual'

  eventHandling('register')
}
function eventHandling(type: 'register' | 'unregister') {
  if (type === 'register') {
    window.addEventListener('keydown', keyDownHandling)
  } else {
    window.removeEventListener('keydown', keyDownHandling)
  }
}
function keyDownHandling(e: KeyboardEvent) {
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
      dir = Direction.null
      break
  }

  if (dir === Direction.null || dir === currentDirection) {
    return
  }
  clearTimeout(timer.manual)
  handle(dir)
  manualLoopAction()
}
function manualLoopAction() {
  timer.manual = setTimeout(() => {
    handle(currentDirection)
  }, 300)
}

// easy 寻路模式
async function easyNavigateBeginGame() {
  beginGameInit()
  currentMode = 'easyAi'
  // eslint-disable-next-line no-unmodified-loop-condition
  while (gameStatus === 'playing') {
    await easyAiEventHandle()
  }
}
async function easyAiEventHandle() {
  const obstacleList = [...bodyPositions]
  const path: Direction[] = []
  const nextPath = easyNavigateAi(headPosition, foodPosition, obstacleList, path)

  if (!nextPath?.length) {
    gameOver()
    return
  }

  for (const dir of nextPath) {
    await easyAiLoopAction(dir)
  }
}
function easyAiLoopAction(dir: Direction) {
  clearTimeout(timer.easyAi)

  return new Promise((resolve) => {
    timer.easyAi = setTimeout(() => {
      handle(dir)
      resolve(null)
    }, 50)
  })
}
function easyNavigateAi(start: Position, end: Position, obstacleList: Position[], path: Direction[]): Direction[] | undefined {
  const { y: startY, x: startX } = start
  const { y: endY, x: endX } = end
  const nextList = [
    {
      position: { y: startY - 1, x: startX },
      dir: Direction.up,
      distance: Math.abs(startY - 1 - endY) + Math.abs(startX - endX),
    },
    {
      position: { y: startY + 1, x: startX },
      dir: Direction.down,
      distance: Math.abs(startY + 1 - endY) + Math.abs(startX - endX),
    },
    {
      position: { y: startY, x: startX - 1 },
      dir: Direction.left,
      distance: Math.abs(startY - endY) + Math.abs(startX - 1 - endX),
    },
    {
      position: { y: startY, x: startX + 1 },
      dir: Direction.right,
      distance: Math.abs(startY - endY) + Math.abs(startX + 1 - endX),
    },
  ].filter(({ position: { y, x } }) => snakeBox[y]?.[x] && !obstacleList.some(({ y: obstacleY, x: obstacleX }) => obstacleY === y && obstacleX === x))

  if (nextList.length === 0) {
    return
  }
  const isEndNode = nextList.find(({ distance }) => distance === 0)
  if (isEndNode) {
    path.push(isEndNode.dir)
    return path
  }
  nextList.sort((a, b) => b.distance - a.distance)
  let next = nextList.pop()
  while (next) {
    const { position, dir } = next

    const nextPath = [...path, dir]

    const obstacleListNext = [...obstacleList]
    obstacleListNext.reverse()
    obstacleListNext.push({ y: startY, x: startX })
    obstacleListNext.reverse()
    obstacleListNext.pop()
    const pathResult = easyNavigateAi(position, end, obstacleListNext, nextPath)
    if (pathResult) {
      return pathResult
    }
    next = nextList.pop()
  }
}

// utils
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

  while (!isSpaceNotInSnake(y, x)) {
    y = Math.floor(Math.random() * 15)
    x = Math.floor(Math.random() * 15)
  }

  foodPosition = { y, x }
  snakeBox[y][x].bg = SpaceColor.food
}
function cleanEffect() {
  eventHandling('unregister')
  clearTimeout(timer.easyAi)
  clearTimeout(timer.manual)
}
function initSpace() {
  const spaces = [...bodyPositions, headPosition, foodPosition]
  for (const { y, x } of spaces) {
    snakeBox[y][x].bg = SpaceColor.empty
  }
}
function isEatFood() {
  return headPosition.y === foodPosition.y && headPosition.x === foodPosition.x
}
function isSpaceNotInSnake(y: number, x: number) {
  return snakeBox[y]?.[x]?.bg === SpaceColor.empty || snakeBox[y]?.[x]?.bg === SpaceColor.food
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
    <div v-if="gameStatus === 'over'" class="mb-15px text-center text-red-500">
      Game over, Please select the mode again !!!
    </div>

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
      <button @click="easyNavigateBeginGame">
        easy ai 寻路
      </button>
    </div>

    <div v-if="currentMode === 'manual' && gameStatus === 'playing' && IS_USE_TOUCH" class="mt-10">
      <div class="flex justify-center">
        <Icon size="50" @touchstart="keyDownHandling({ key: 'ArrowUp' } as KeyboardEvent)">
          <ArrowCircleUp48Regular />
        </Icon>
      </div>
      <div class="flex justify-center">
        <Icon
          size="50"
          @touchstart="keyDownHandling({ key: 'ArrowLeft' } as KeyboardEvent)"
        >
          <ArrowCircleLeft48Regular />
        </Icon>
        <Icon
          size="50"
          @touchstart="keyDownHandling({ key: 'ArrowDown' } as KeyboardEvent)"
        >
          <ArrowCircleDown48Regular />
        </Icon>
        <Icon
          size="50"
          @touchstart="keyDownHandling({ key: 'ArrowRight' } as KeyboardEvent)"
        >
          <ArrowCircleRight48Regular />
        </Icon>
      </div>
    </div>

    <div class="mt-10">
      Version: 0.0.4 2022-6-7
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
