! function () {

  'use strict';

  function gitSan () {}

  gitSan.prototype.ls       =   require('./ls');

  gitSan.prototype.install  =   require('./install');

  gitSan.prototype.write    =   require('./write');

  gitSan.prototype.mkdir    =   require('./mkdir');

  gitSan.prototype.clone    =   require('./clone');

  gitSan.factory = function () {
    return new gitSan();
  };

  gitSan.parse = function (dep) {
    var provider, vendor, repo;

    dep.replace(/^((.+):)?((.+)\/)?(.+)$/, function (matches, x1, _provider, x2, _vendor, _repo) {
      provider = _provider;
      vendor = _vendor;
      repo = _repo;
    });

    return {
      dep: dep,
      provider: provider || 'github',
      vendor: vendor,
      repo: repo
    };
  };

  gitSan.bin = function (action, dep) {

    action = action || 'ls';

    var domain = require('domain').create();

    domain.on('error', function (error) {
      throw error;
    });

    domain.run(function () {
      gitSan
        .factory()
          [action](dep, domain.intercept(console.log.bind(console)));
    });
  }

  module.exports = gitSan;

  gitSan.bin(process.argv[2], process.argv[3]);

} ();
