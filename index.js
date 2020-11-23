const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})
app.get('/demo', (req, res) => {
  res.sendFile('public/demo.html', { root: __dirname })
})

app.get('/group_demo', (req, res) => {
  res.sendFile('public/group_demo.html', { root: __dirname })
})
app.get('/one_to_one_demo', (req, res) => {
  res.sendFile('public/one_to_one_demo.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
