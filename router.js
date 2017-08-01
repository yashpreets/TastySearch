var searchApp = require('./searchApp');

exports.router = function (app) {
    app.get('/searchReview',searchApp.searchQuery);
    app.post('/searchReview',searchApp.searchQuery);
    app.get('/searchTab',searchApp.openSearchTab);
    
    app.all('*', function (req, res) {
        res.status(404).send("Opps You shouldn't Roam arround on someone Else's Property");
    });
};