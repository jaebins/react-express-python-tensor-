const express = require('express')
const spawn = require('child_process').spawn
const cors = require("cors")

const app = express()
const port = 5000

app.use(cors())
app.get('/learn', (req, res) => {
    var data1 = req.query.data1
    var data2 = req.query.data2
    var data3 = req.query.data3

    const python = spawn('python', ['server/main.py', data1, data2, data3]);
    var str = ""
    python.stdout.on('data', (data) => {
        str += data.toString()
        console.log(data.toString())
        if(str.includes("Com")){
            res.send(str.substring(str.length - 16, str.length - 12))
        }
    })

    python.stderr.on('err', (err) => {
        console.log(err)
    })

    console.log(score, grade, rank)
})

app.listen(port, () => {console.log("server onpen")})