import { ref, reactive, nextTick, onBeforeUnmount } from 'vue'

function getRandom(max, snake) {
  let num = null
  const poor = snake.filter(item => item.bg).map(item => item.id)
  while (num === null || poor.includes(num)) {
    num = Math.floor(Math.random() * max)
  }

  snake[num].bg = 'b-c-0'
  return num
}

const initSnakeBody = () => {
  const snake = []
  for (let i = 0; i < 400; i++) {
    if (i === 0 || i === 1) {
      snake.push({
        id: i,
        bg: 'b-c-purple'
      })
      continue
    }
    if (i === 2) {
      snake.push({
        id: i,
        bg: 'b-c-pink'
      })
      continue
    }
    snake.push({
      id: i,
      bg: ''
    })
  }
  return snake
}

export function beginGame() {
  let snake = reactive(initSnakeBody())
  let snakePoor = reactive([0, 1, 2])

  let randomNum = ref(getRandom(400, snake))

  const directionPoor = reactive([])
  let trap = false
  const changeDirection = e => {
    let { keyCode } = e
    if (![37, 38, 39, 40].includes(keyCode)) return

    const lastDirection = directionPoor[directionPoor.length - 1] || null
    // 方向相同
    if (timer && lastDirection === keyCode) return

    // 方向相反 不执行转向 else 转向
    if (keyCode === lastDirection + 2 || keyCode === lastDirection - 2) return

    if (trap) {
      directionPoor.splice(0, 1, keyCode)
      trap = false
    } else {
      directionPoor.push(keyCode)
    }

    if (!timer) {
      timer = setInterval(action, 300)
    }
  }

  let timer = null
  function action() {
    let keyCode
    if (directionPoor.length === 1) {
      keyCode = directionPoor[0]
      trap = true
    } else {
      keyCode = directionPoor.shift()
    }

    let num
    // 38

    if (keyCode === 38 || keyCode === 40) {
      num = 20
    } else {
      num = 1
    }

    let id = snakePoor[snakePoor.length - 1]
    if (keyCode === 38 || keyCode === 37) {
      id -= num
    } else {
      id += num
    }

    if (endCondition(id)) {
      endGame()
      return
    }

    let firstEle = snakePoor[0]

    snake[firstEle].bg = ''

    snake[snakePoor[snakePoor.length - 1]].bg = 'b-c-purple'

    snake[id].bg = 'b-c-pink'

    snakePoor.shift()
    snakePoor.push(id)

    if (randomNum.value === id) {
      addFood(firstEle)
    }
  }

  let eatenFood = ref(0)
  const addFood = i => {
    eatenFood.value++

    snake[i].bg = 'b-c-purple'
    snakePoor.unshift(i)

    randomNum.value = getRandom(400, snake)
  }

  const endGame = () => {
    clearInterval(timer)
    timer = null
    nextTick(() => {
      alert('游戏结束')
      snake.splice(0, 400, ...initSnakeBody())
      randomNum.value = getRandom(400, snake)
      eatenFood.value = 0
      snakePoor.splice(0, snakePoor.length, ...[0, 1, 2])
      directionPoor.splice(0, directionPoor.length)
    })
  }

  const endCondition = id => {
    const initId = snakePoor[snakePoor.length - 1]
    if (
      (initId % 20 === 0 && (id - 19) % 20 === 0) ||
      (id % 20 === 0 && (initId - 19) % 20 === 0)
    )
      return true
    return (
      id < 0 ||
      id > 399 ||
      snakePoor.slice(0, snakePoor.length - 2).includes(id)
    )
  }

  window.addEventListener('keydown', changeDirection, true)

  onBeforeUnmount(() => {
    console.log('v2注销')
    if (timer) clearInterval(timer)
    window.removeEventListener('keydown', changeDirection)
  })

  return {
    snake,
    eatenFood,
    randomNum,
    snakePoor,
    changeDirection
  }
}
