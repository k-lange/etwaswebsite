// not transpiled

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var pages = require('./dist/server.js');
var template = fs.readFileSync('./assets/index.html', { encoding: 'utf8' });
var outputDir = './dist';

pages.forEach(function (page) {
    var directory = path.resolve(outputDir + page.location);
    mkdirp(directory, function (error) {
        if (error) { throw error; }
        var output = template.replace('<!-- REACT_REPLACED -->', page.html);

        fs.writeFile(path.resolve(directory, 'index.html'), output, function (error) {
            if (error) { throw error; }

            console.log('wrote', page.location);
        });
    });
});
