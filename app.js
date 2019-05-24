const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const getclass = require('./getClass.js');
const Queue = require('bee-queue');
const queue = new Queue('findClasses')
const twilio = require('twilio');





app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/" + "index.html");
});

app.post('/getClass', (req, res) => {
    data = req.body
    var classObjectNames = Object.keys(req.body)
    console.log(classObjectNames)
    
    const job = queue.createJob(data);

    job.on('succeeded', (out) => {
        console.log('complete job ' + job.id)
        res.json(out);
    })

    job.save(function (err, job) {
        if (err) {
          console.log('job failed to save');
          return res.send('job failed to save');
        }
        console.log('saved job ' + job.id);
      });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
