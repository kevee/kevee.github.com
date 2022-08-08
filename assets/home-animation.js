;(() => {
  let length = 0
  let current = 0
  let ran = false
  const images = document.getElementsByClassName('flipbook-frame')

  const runAnimation = () => {
    ran = true
    if (current < length) {
      document.querySelector('.flipbook-frame.show').classList.remove('show')
      images[current].classList.add('show')
      current++
      setTimeout(runAnimation, 100)
    } else {
      document.querySelector('.flipbook .replay').classList.remove('hidden')
    }
  }

  document.querySelector('.flipbook .replay').addEventListener('click', () => {
    current = 0
    document.querySelector('.flipbook .replay').classList.add('hidden')
    runAnimation()
  })

  for (const image of images) {
    image.addEventListener('load', () => {
      length++
      if (length === images.length) {
        runAnimation()
      }
    })
  }

  setTimeout(() => {
    if (!ran) {
      runAnimation()
    }
  }, 4000)
})()
