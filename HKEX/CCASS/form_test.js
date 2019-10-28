#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

function padLeadingZero(stock_no_in, len_wanted){
  var stock_no_in = stock_no_in.toString()
  while (stock_no_in.length < len_wanted){
    stock_no_in = '0'+ stock_no_in
  }

  return stock_no_in
}


"use strict";
module.exports = (stock_no) => {return {
  __EVENTTARGET: 'btnSearch',
  __EVENTARGUMENT: '',
  __VIEWSTATE: '/wEPDwULLTIwNTMyMzMwMThkZLiCLeQCG/lBVJcNezUV/J0rsyMr',
  __VIEWSTATEGENERATOR: 'A7B2BBE2',
  today: '20191028',
  sortBy: 'shareholding',
  sortDirection: 'desc',
  alertMsg: '',
  txtShareholdingDate: '2019/10/26',
  txtStockCode: padLeadingZero(stock_no, 5),
  txtStockName: 'TENCENT HOLDINGS LIMITED',
  txtParticipantID: '',
  txtParticipantName: '',
  txtSelPartID: ''
}}

module.exports.padLeadingZero = padLeadingZero