const canvas = document.querySelector('canvas')

;(window.onresize = () => (canvas.height = innerHeight, canvas.width = innerWidth))()

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = 'rgba(0, 0, 0, 0.33)'

const k = 0.42489
const rotation = Math.PI * 2 * 33

const render = t => {
  requestAnimationFrame(render)

  const {height, width} = canvas
  const shortEdge = Math.min(height, width)
  const radius = shortEdge / 6.2 * (2 + Math.sin(t * 3e-4))
  const dTheta = 1e-3 * shortEdge * shortEdge / radius / radius
  const l = Math.abs(Math.sin(t * 5e-4))

  ctx.fillRect(0, 0, width, height)

  const imageData = ctx.getImageData(0, 0, width, height)
  const {data} = imageData

  for (let theta = 0; theta < rotation; theta += dTheta) {
    const phi = (1 - k) / k * theta
    const lk = l * k
    const x = Math.round(width / 2 + radius * ((1 - k) * Math.cos(theta) + lk * Math.cos(phi)))
    const y = Math.round(height / 2 + radius * ((1 - k) * Math.sin(theta) + lk * Math.sin(phi)))
    const i = 4 * (x + y * width)
    data[i + 3] = 0
  }
  ctx.putImageData(imageData, 0, 0)
}

requestAnimationFrame(render)
