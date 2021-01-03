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
    if (snake.length) {
      for (let i = 0; i < 400; i++) {
        if (i === 0 || i === 1) {
          snake[i].bg = 'b-c-purple'
          continue
        }
        if (i === 2) {
          snake[i].bg = 'b-c-pink'
          continue
        }
        snake[i].bg = ''
      }
    } else {
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
      snakePoor.splice(0, snakePoor.length, ...[0, 1, 2])
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
