;(() => {
  let length = 0
  let current = 0
  let ran = false
  let setTitle = false
  const images = document.getElementsByClassName('flipbook-frame')

  const runAnimation = () => {
    ran = true
    if (current < length) {
      document.querySelector('.flipbook-frame.show').classList.remove('show')
      images[current].classList.add('show')
      current++
      if (current === 30 && !setTitle) {
        setTitle = true
        document.querySelector('.me-im').classList.add('crossed')
        document.querySelector('.me-i-was').classList.add('show')
      }
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
      length = images.length
      runAnimation()
    }
  }, 4000)
})()
