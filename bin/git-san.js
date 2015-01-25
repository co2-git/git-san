#!/usr/bin/env node

! function () {

  'use strict';

  var gitSan = require('../lib/git-san');

  gitSan.bin(process.argv[2], process.argv[3]);

} ();
