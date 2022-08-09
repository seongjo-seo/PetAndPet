// @ts-check

const express = require("express")

const app = express()

app.use("/", (req, res) => {
  res.send("test!")
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`server를 실행합니다. ${PORT}`)
})
