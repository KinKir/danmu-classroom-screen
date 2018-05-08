const screen = document.getElementById("screen")
const keyDom = document.getElementById("key")

function addKey(number) {
  keyDom.innerHTML = number
}

function addDanmu(message) {
  const danmu = document.createElement('div')
  danmu.classList.add('danmu')
  danmu.innerHTML = message.content
  danmu.addEventListener("animationend", () => { // danmu animation end then destroy it
    danmu.parentNode.removeChild(danmu)
  }, false)
  screen.appendChild(danmu) // paint to screen
}

document.addEventListener("DOMContentLoaded", () => {
  logger.info(`${thisFilename}Win@DOMContentLoaded`)
  addDanmu({ // init danmu
    content: 'Danmu Classroom launched.'
  })

  // IPC listener
  ipcRenderer.on('paint-danmu', (event, message) => { // paint danmu
    addDanmu(message)
    logger.info(`${thisFilename}Win@danmu-painted danmu: ${JSON.stringify(message)}`)
  })
  ipcRenderer.on('key-is', (event, key) => { // update key
    addKey(key)
    logger.info(`${thisFilename}Win@key-rendered key: ${key}`)
  })
  ipcRenderer.send('ask-for-key') // ask key
  logger.info(`${thisFilename}Win@ask-for-key`)
})
