! function () {

  'use strict';

  function write (ls, cb) {
    var git_san = this;

    var domain = require('domain').create();

    domain.on('error', function (error) {
      cb(error);
    });

    domain.run(function () {
      require('fs')
        .createWriteStream(require('path').join(process.cwd(), 'git-san.json'))
        .on('finish', cb)
        .write(JSON.stringify(ls, null, 2), domain.intercept(function () {}));
    });
  }

  module.exports = write;
  
}();
