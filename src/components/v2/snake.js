import { ref, reactive, nextTick, onBeforeUnmount } from 'vue'

export function beginGame() {
  function getRandom(max) {
    let num = null
    const poor = snake.filter(item => item.bg).map(item => item.id)
    while (num === null || poor.includes(num)) {
      num = Math.floor(Math.random() * max)
    }

    snake[num].bg = 'b-c-0'
    return num
  }

  const initSnakeBody = () => {
    for (let i = 0; i < 399; i++) {
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
  }

  let snake = reactive([])
  let snakePoor = reactive([0, 1, 2])
  initSnakeBody()

  let randomNum = ref(getRandom(400))

  const changeDirection = e => {
    let { keyCode } = e
    if (![37, 38, 39, 40].includes(keyCode)) return

    // 方向相同 加速
    if (timer && keyCodeStorage === keyCode) return

    // 方向相反 不执行转向 else 转向
    if (keyCode === keyCodeStorage + 2 || keyCode === keyCodeStorage - 2) {
      keyCode = keyCodeStorage
      return
    } else {
      keyCodeStorage = keyCode
    }

    clearInterval(timer)
    timer = setInterval(() => {
      action(keyCode)
    }, 300)
  }

  let timer = null
  let keyCodeStorage = 0
  function action(keyCode) {
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

    if (id < 0 || snakePoor.slice(0, snakePoor.length - 2).includes(id)) {
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

    randomNum.value = getRandom(400)
  }

  const endGame = () => {
    clearInterval(timer)
    timer = null
    nextTick(() => {
      alert('游戏结束')
      initSnakeBody()
      randomNum.value = getRandom(400)
      eatenFood.value = 0
      keyCodeStorage = 0
    })
  }

  window.addEventListener('keydown', changeDirection, true)

  function clearTime() {
    if (timer) clearInterval(timer)
  }

  onBeforeUnmount(() => {
    console.log('v2注销')
    window.removeEventListener('keydown', clearTime())
  })

  return {
    snake,
    eatenFood,
    randomNum,
    snakePoor,
    changeDirection,
    clearTime
  }
}
