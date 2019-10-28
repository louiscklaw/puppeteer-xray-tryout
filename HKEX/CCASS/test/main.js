#!/usr/bin/env node
"use strict";

var path = require('path')
var fs = require('fs')
var assert = require('assert')

var TEST_HOME = __dirname;
var PROJ_HOME = path.join(__dirname,'..')

var common = require(path.join(PROJ_HOME,'common.js'))
var form_test = require(path.join(PROJ_HOME, 'form_test.js'))


function test_get_ccass_700(){
  console.log('getting ccass')
  common.getStockCCASS(100)
}

function test_pad_zero(){
  console.log('test padding zero')
  assert.equal('00700', form_test.padLeadingZero(700,5))
}

function test_all(){
  test_pad_zero()
  test_get_ccass_700()
}

test_all()