#!/usr/bin/env node

"use strict";
const path = require('path');
const fs = require('fs');

const chalk = require('chalk')

const scrape_facebook = require(`${__dirname}/scrape_facebook.js`)

const fb_list_path = `${__dirname}/fb_list`
var ac_list = [];

function getFBList(fb_list_path_in){
  var fb_page_list = [];
  console.log("helloworld");
  console.log(`${__dirname}/fb_list`);
  var filelist = fs.readdirSync(fb_list_path_in,{encoding:"ascii"});
  filelist.forEach( file => {
    var temp = fs.readFileSync(`${fb_list_path_in}/${file}`,{encoding:"ascii"});
    temp.split('\n').forEach(fb_page => {
      if(fb_page.trim() != ''){
        fb_page_list.push(fb_page)
      };
    })
  })
  return fb_page_list;
}


function init_fb_scrape(fb_ac){
  if (fb_ac.trim() != '') {
    console.log(`${fb_ac} scrape start`);
    scrape_facebook(fb_ac);
  }else{
    console.log(`the fb_ac provided is empty -> ${fb_ac}`);
  }
}
ac_list = getFBList(fb_list_path);

for(var i=0; i< ac_list.length; i++ ){
  var fb_ac = ac_list[i];
  console.log(chalk.green(`scrape "${fb_ac}"`));
  init_fb_scrape(fb_ac);
}