! function () {

  'use strict';

  function ls (dep, cb) {
    if ( ! cb && typeof dep === 'function' ) {
      cb = dep;
      dep = null;
    }

    var git_san = this;

    var domain = require('domain').create();

    domain.on('error', function (error) {
      if ( error.code === 'ENOENT' ) {
        return cb(null, null);
      }
      cb(error);
    });

    domain.run(function () {
      var raw = '';

      require('fs')
        
        .createReadStream(
          require('path').join(process.cwd(), 'git-san.json'))

        .on('end', function () {
          var deps = JSON.parse(raw || '{}');

          // console.log(deps[dep]);
          
          if ( dep ) {

            if ( (dep in deps) ) {
              var _dep = {};
              _dep[dep] = deps[dep];

              cb(null, _dep);
            }

            else {
              var error = new Error('Not installed: ' + dep);
              error.code = 'GITSAN_ERR_NOT_INSTALLED';
              cb(error);
            }
          }
          else {
            cb(null, deps);
          }
        })

        .on('data', function (data) {
          raw += data.toString();
        })
    });
  };

  module.exports = ls;

}();
