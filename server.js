const express = require('express');
// Import Redis
const redis = require('redis');
const app = express();

const redisClient = redis.createClient({
  host: 'test-redis',
  port: 6379
});

// GET route
app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
        res.send('Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.listen(5000, function() {
    console.log('Web app is listening on port 5000');
});
