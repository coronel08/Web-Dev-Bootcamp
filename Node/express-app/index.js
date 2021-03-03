const express = require('express')
const app = express()

// app.use((req,res) => {
//     console.log("We got a new Request")
//     res.send('<h1>Got yout request</h1>')
// })

app.get('/',(req, res) => {
    res.send('This is the home page')
})

app.get('/cats', (req, res) => {
    console.log("Cat Request")
    res.send('<h1> Cats Route</h1>')
})

// Define a pattern
app.get('/r/:subreddit',(req, res) => {
    const {subreddit} = req.params
    res.send(`this is a subreddit for ${subreddit}`)
})

// Wildcard with *
// app.get('*', (req,res) =>{
//     res.send('This is a catch all ')
// })

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})


