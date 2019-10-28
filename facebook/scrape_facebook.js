"use strict";

const path = require('path');
const fs = require('fs');
const cp = require('child_process');


const puppeteer = require("puppeteer");
const Xray = require("x-ray");
const chalk = require('chalk');

const fb_date_parser = require(`${__dirname}/common.js`).fb_date_parser;



// run config
const config = require(`${__dirname}/config.js`)
const page_to_scrape = 30

var result_path = `${__dirname}/result`;

var facebook_pages = (fb_ac) => { return `https://www.facebook.com/${fb_ac}`}
var facebook_post_pages = (fb_ac) => { return `https://www.facebook.com/pg/${fb_ac}/posts`}
var json_output_filename = (fb_ac) => {return fb_ac.replace('.','_')}

var strange_log_file = `${__dirname}/strange_txt.log`;

// css_selector for puppeteer
const css_select_posts_all = `#pagelet_timeline_main_column`;
// const css_select_post_id = `.text_exposed_root`
// const css_select_post_content = `div[data-testid=post_message]`
// const css_select_num_of_like = `span[data-testid$=sentenceWithSocialContext]`

// css_selector for x-ray
var css_select_posts = `.userContentWrapper`;
var css_select_post_message = `div[data-testid=post_message]`;
var css_select_post_id = `.text_exposed_root@id`;
var css_select_post_date = `.timestampContent`;
var css_select_post_body = `.text_exposed_root > p:nth-of-type(2)`;
var css_select_num_of_like = `span[data-testid$=sentenceWithSocialContext]`;
const css_select_num_of_comment = `a[data-testid^=UFI2CommentsCount]`;
const css_select_num_of_share = `a[data-testid^=UFI2SharesCount]`;

const css_select_more_page = `.uiMorePager`;

const css_select_comments_list = `div[data-testid=UFI2CommentsList/root_depth_0]`

const launch_config = {
  headless: true,

  defaultViewport: {
    width: 1920,
    height: 1080
  }
};

var x = Xray({
  filters: {
    get_complete_date: function(fb_txt_date) {
      try {
        return fb_date_parser(fb_txt_date);
      } catch (err) {
        log_strange_things(`error date found: ${fb_txt_date}`);
      }

    }
  }
});

function log_strange_things(things_to_log){
  fs.appendFileSync(`${strange_log_file}`, `var strange_text=${things_to_log}`+'\n');
}

function get_num_only(text_in) {
  console.log(text_in);
  return text_in.match(/(\d+)/)[0];
}

async function helloWorld(fb_to_scrape) {
  const browser = await puppeteer.launch(launch_config);
  const page = await browser.newPage();

  await page.goto(facebook_post_pages(fb_to_scrape));

  for(var i=0; i< page_to_scrape;i++){
    console.log(`scroll ${i}`);

    // .expanding_cta_close_button => not now button
    if (await page.$(`.expanding_cta_close_button`) !== null )
    {
      await page.tap('.expanding_cta_close_button');
    }


    await page.hover(css_select_more_page);
    await page.waitFor(1000)
    // uiMorePagerLoader pam uiBoxLightblue
    await page.waitForSelector(`.uiMorePagerLoader`,{hidden: true})
    await page.waitForSelector(css_select_more_page);
  }

  var post_html = await page.$eval(css_select_posts_all, el => el.outerHTML);

  await browser.close();

  return post_html;
}

function sieve_posts(html_in){
  let post_html = html_in;
  return x(post_html, {
    posts: x(css_select_posts, [
      {
        _id: css_select_post_id,
        date: css_select_post_date,
        date_value: `${css_select_post_date} | get_complete_date`,
        message: css_select_post_message,
        num_of_like: css_select_num_of_like,
        num_of_comment: css_select_num_of_comment,
        num_of_share: css_select_num_of_share
      }
    ])
  })
}


function scrape_facebook(fb_page){
  try {
    var page_result_path = `${result_path}/${fb_page}`;
    console.log(`create result path ${page_result_path}`);

    cp.execSync(`mkdir -p ${page_result_path}`);

    helloWorld(fb_page).then(post_html => {
      fs.writeFileSync(`${page_result_path}/capture.html`, post_html);

      sieve_posts(post_html)
        .write(`${page_result_path}/${json_output_filename(fb_page)}.json`);
    })
    .then(()=>{
      console.log(chalk.green('done'))
    })
    .catch(err => {
      console.error(chalk.red(`error found during scraping ${fb_page}`));
    });

  } catch (err) {
    console.error(chalk.red(`${fb_page} found error`))
    // throw new Error(err);
  }

}

module.exports = scrape_facebook;