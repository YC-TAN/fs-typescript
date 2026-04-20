import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
    return res.send("Hello Full Stack!")
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})