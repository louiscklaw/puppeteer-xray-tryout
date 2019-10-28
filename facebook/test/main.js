#!/usr/bin/env node

"use strict";
var path = require('path');
var fs = require('fs');
var assert = require('assert');

var TEST_HOME = __dirname;
var PROJ_HOME = path.join(TEST_HOME, '..');
var common = require(`${PROJ_HOME}/common.js`);

function test_get_yesterday(){
  console.log('test getting yesterday');

  ['2018年1月1日',
  '1月1日 1:01',
  '1月1日',
  '1 小時',
  '1小時',
  '2小時',
  '20小時',
  '1分鐘',
  '2分鐘',
  ''].forEach( test_item => {
    console.log(`test convert "${test_item}" -> "${common.fb_date_parser(test_item)}"`)
  })


}

function test_all(){
  var test1 = test_get_yesterday();

  console.log('test done');
}

test_all();