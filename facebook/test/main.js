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

  // the result should be a integer nothing else
  assert.equal(
    typeof(common.fb_date_parser('昨天 04:03 發佈')),
    typeof(1));

  console.log(common.fb_date_parser('1月1日 23:37'));
  assert.equal(
    typeof(common.fb_date_parser('1月1日 1:01')),
    typeof(1));


  console.log(common.fb_date_parser('1月1日'));
  assert.equal(
    typeof(common.fb_date_parser('1月1日')),
    typeof(1));

  assert.equal(
    typeof(common.fb_date_parser('2018年6月25日')),
    typeof(1));
  // basic sanity
  assert.notEqual(
    common.fb_date_parser('2017年6月25日'),
    common.fb_date_parser('2018年6月25日'));

  ['2018年1月1日', '1月1日 1:01', '1月1日', '1小時','2小時','1分鐘','2分鐘'].forEach( test_item => {
    console.log(`test convert ${test_item} -> ${common.fb_date_parser(test_item)}`)
  })


}

function test_all(){
  var test1 = test_get_yesterday();

  console.log('test done');
}

test_all();