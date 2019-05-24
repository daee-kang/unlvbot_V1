var Queue = require('bee-queue');
const queue = new Queue('findClasses')
const getclass = require('./getClass.js');


queue.on('ready', function () {
  queue.process(async function (job, done) {
    console.log('processing job ' + job.id);
    await getclass.run(job.data).then(() => {
        done(null, job.data);
    });
  });
  console.log('processing jobs...');
});