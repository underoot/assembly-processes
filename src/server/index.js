const express = require('express');
const proxy = require('../setupProxy');

proxy(express()).listen(process.env.PORT || 3001);
