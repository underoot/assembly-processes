const express = require('express');
const proxy = require('../setupProxy');

const UI_URL = 'assembly-processes-git-dev.underoot.now.sh';

const app = express().use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.set('Access-Control-Allow-Origin', UI_URL);
  }

  next();
});

proxy(app).listen(process.env.PORT || 3001);
