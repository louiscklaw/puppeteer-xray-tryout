#!/usr/bin/env node

"use strict";

const fs = require('fs');

const chalk = require('chalk')

const scrape_facebook = require(`${__dirname}/scrape_facebook.js`)

var ac_list = [];

function init_fb_scrape(fb_ac){
  if (fb_ac.trim() != '') {
    console.log(`${fb_ac} scrape start`);
    scrape_facebook(fb_ac);
  }else{
    console.log(`the fb_ac provided is empty -> ${fb_ac}`);
  };
}

fs.readFile(`${__dirname}/fb_ac_list.txt`, (err, data) =>{
  if (err) return false;
  ac_list = new Set(data.toString('ascii').split('\n'));
  console.log(ac_list.count);

  // for(var i=0; i< ac_list.size; i++ ){
  //   var fb_ac = ac_list[i];
  //   console.log(chalk.green(`scrape ${fb_ac}`));
  //   console.log(ac_list);
  //   init_fb_scrape(fb_ac);
  // }

  ac_list.forEach( x => {
    init_fb_scrape(x);
  })

});
