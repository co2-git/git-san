! function () {

  'use strict';

  function install (dep, cb) {
    if ( ! cb && typeof dep === 'function' ) {
      cb = dep;
      dep = null;
    }

    if ( typeof cb !== 'function' ) {
      cb = console.log.bind(console);
    }

    var git_san = this;

    var domain = require('domain').create();

    domain.on('error', function (error) {
      cb(error);
    });

    domain.run(function () {

      if ( dep ) {
        git_san.ls(dep, domain.bind(function (error, ls) {
          if ( error && error.code !== 'GITSAN_ERR_NOT_INSTALLED' ) {
            throw error;
          }

          if ( ls ) {
            throw new Error('Repo already installed: ' + dep);
          }

          var gitSan = git_san.constructor;

          var parsed = gitSan.parse(dep);

          if ( ! parsed.provider ) {
            throw new Error('Missing provider');
          }

          if ( ! parsed.vendor ) {
            throw new Error('Missing vendor');
          }

          if ( ! parsed.repo ) {
            throw new Error('Missing repository');
          }

          git_san.mkdir(domain.intercept(function () {
            git_san.clone(parsed, domain.intercept(function () {
              git_san.ls(domain.intercept(function (ls) {
                var name = parsed.provider + ':' + parsed.vendor + '/' + parsed.repo;

                ls = ls || {};

                ls[name] = parsed;
                
                delete ls[name].dep;
                
                git_san.write(ls, cb);
              }));
            }));
          }));
        }));
      }

    });
  }

  module.exports = install;
  
}();
