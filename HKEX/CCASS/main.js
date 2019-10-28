#!/usr/bin/env node
"use strict";

var path = require('path')
var fs = require('fs')

var form_input_test = require(`${__dirname}/form.js`)

var request = require('request')


request
  .post('https://www.hkexnews.hk/sdw/search/searchsdw.aspx', (err, res, body) => {
    // console.log(body)
    fs.writeFileSync('./result.html', body)
  })
  .form(form_input_test)
