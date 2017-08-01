var searchApp = require('./searchApp');

exports.router = function (app) {
    app.get('/searchReview',searchApp.searchQuery);
};