! function () {

  'use strict';

  function clone (repo, cb) {
    var git_san = this;

    var domain = require('domain').create();

    domain.on('error', function (error) {
      cb(error);
    });

    domain.run(function () {
      var spawn = require('child_process')
        .spawn('git', ['clone', 'git@github.com:' + repo.vendor + '/' + repo.repo,
            ['github', repo.vendor, repo.repo].join('/')],
          { cwd: require('path').join(process.cwd(), 'git_components') });

      spawn.on('error', domain.intercept(function () {}));

      spawn.on('exit', function (signal) {
        if ( signal === 0 ) {
          return cb();
        }
        cb(new Error('Got signal: ' + signal));
      });
    });
  }

  module.exports = clone;
  
}();
