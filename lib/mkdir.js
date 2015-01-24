! function () {

  'use strict';

  function mkdir (cb) {
    var git_san = this;

    var domain = require('domain').create();

    domain.on('error', function (error) {
      cb(error);
    });

    domain.run(function () {
      require('fs')
        .mkdir(require('path').join(process.cwd(), 'git_components'),
          domain.bind(function (error) {
            if ( error && error.code === 'EEXIST' ) {
              cb();
            }
            else {
              cb(error);
            }
          }));
    });
  }

  module.exports = mkdir;
  
}();
