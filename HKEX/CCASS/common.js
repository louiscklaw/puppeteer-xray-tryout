#!/usr/bin/env node

"use strict";

var path = require('path')
var fs = require('fs')

var PROJ_HOME = __dirname
var form_input_test = require(path.join(PROJ_HOME, 'form_test.js'))

var test_700_html_raw = fs.readFileSync(`/home/logic/_workspace/puppeteer-xray-tryout/HKEX/CCASS/test/700_result.html`,{encoding: "ascii"})


var Xray = require('x-ray')
var x = Xray()

function sendPostRequest(stock_no){

  request
  .post('https://www.hkexnews.hk/sdw/search/searchsdw.aspx', (err, res, body) => {
    // console.log(body)
    fs.writeFileSync('./result.html', body)
  })
  .form(form_input_test)

}

// {people: x('table.table-mobile-list', [{
//   id:'.col-participant-id .mobile-list-body',
//   name: '.col-participant-name .mobile-list-body'
// }])}


// x(test_700_html_raw, 'table tbody',{
//   id: x('tr',[{
//     id: 'td'
//   }])
// })

function getStockCCASS(stock_no){

  x(test_700_html_raw, 'table tbody tr',[{
    id: '.col-participant-id .mobile-list-body',
    detail: {
      name: '.col-participant-name .mobile-list-body',
      address: '.col-address .mobile-list-body',
      shareholding: '.col-shareholding .mobile-list-body',
      shareholding_percent: '.col-shareholding-percent .mobile-list-body'

    }
  }])
    .then(res => {
      console.log(res)
    })
}
module.exports.sendPostRequest = sendPostRequest
module.exports.getStockCCASS = getStockCCASS