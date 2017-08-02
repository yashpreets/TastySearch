var loadtest = require('loadtest');
var options = {
    url: 'http://localhost:3900/searchReview?search=this%20and%20that',
    maxRequests: 30000,
    maxSeconds:60,
    concurrency:10,
    requestsPerSecond:300,
};
loadtest.loadTest(options, function(error, result){
    if (error){
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully');
    console.log("Results:");
    console.log(result);
});