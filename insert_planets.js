var mongojs = require('mongojs');
var db = mongojs('exo');
var Exoplanets = db.collection('exoplanets');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

fs.readFile(__dirname + '/exoplanets.json', function (err, data) {
    var json = JSON.parse(data);

    Exoplanets.insert(json, function (err) {
        console.log('done');
        process.exit();
    });
});