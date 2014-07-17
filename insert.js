var mongojs = require('mongojs');
var db = mongojs('exo');
var exoplanets = db.collection('exoplanets');
var Stars = db.collection('stars');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

fs.readdir(__dirname + '/constellations', function (err, files) {

    var calls = _.chain(files).map(function (filename) {
        if (filename === '.DS_Store') return false;

        return function (callback) {
            var constellation = filename.replace(/\.json/, '');

            console.log(__dirname + '/' + filename);

            fs.readFile(__dirname + '/constellations/' + filename, function (err, data) {
                var stars = JSON.parse(data);

                var docs = _.map(stars, function (star) {
                    star.constellation = constellation;
                    return star;
                });

                console.log('inserting ' + stars.length + ' into ' + constellation);
                Stars.insert(docs, function (err) {
                    callback(null);
                });

            });
        };

    }).compact().value();

    async.series(calls, function (err) {
        console.log('err', err);
        console.log('done');
        process.exit();
    });
});