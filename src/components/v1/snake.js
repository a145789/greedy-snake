import { ref, reactive, nextTick, onBeforeUnmount } from 'vue'

export function beginGame() {
  function getRandom(max) {
    let num = null
    const poor = snake.map(i => i.id)
    while (num === null || poor.includes(num))
      num = Math.floor(Math.random() * max)
    return num
  }

  const createBody = (top = 0, left = 0, id = 0) => ({
    id,
    top,
    left
  })

  const initSnakeBody = () => {
    if (!snake.length) {
      snake.push(createBody(), createBody(0, 20, 1), createBody(0, 40, 2))
    } else {
      snake.splice(
        0,
        snake.length,
        createBody(),
        createBody(0, 20, 1),
        createBody(0, 40, 2)
      )
    }
  }

  let snake = reactive([])
  initSnakeBody()

  let randomNum = ref(getRandom(400))

  let optionStorage = null
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
      snake.forEach((body, index) => {
        if (index + 1 === snake.length) {
          action(body, keyCode)
        } else {
          if (index === 0) optionStorage = body
          snake[index] = { ...snake[index + 1] }
        }
      })
    }, 300)
  }

  let timer = null
  let keyCodeStorage = 0

  function action(body, keyCode) {
    if (randomNum.value === snake[snake.length - 1].id) {
      addFood()
    }

    let direction
    let num
    // 38

    if (keyCode === 38 || keyCode === 40) {
      direction = 'top'
      num = 20
    } else {
      direction = 'left'
      num = 1
    }

    let position = body[direction]
    let id = body.id
    if (keyCode === 38 || keyCode === 37) {
      position -= 20
      id -= num
    } else {
      position += 20
      id += num
    }

    if (
      position > 380 ||
      position < 0 ||
      snake
        .slice(0, snake.length - 2)
        .map(i => i.id)
        .includes(id)
    ) {
      endGame()
      return
    }

    body[direction] = position
    body.id = id
  }

  let eatenFood = ref(0)
  const addFood = () => {
    eatenFood.value++
    snake.unshift(
      createBody(optionStorage.top, optionStorage.left, optionStorage.id)
    )
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
      optionStorage = null
      keyCodeStorage = 0
      console.log(snake)
    })
  }

  window.addEventListener('keydown', changeDirection, true)

  onBeforeUnmount(() => {
    console.log('v1注销')
    if (timer) clearInterval(timer)
    window.removeEventListener('keydown', changeDirection)
  })

  return { snake, eatenFood, randomNum, changeDirection }
}
