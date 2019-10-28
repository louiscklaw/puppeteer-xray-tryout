
var fs = require('fs');
var config = require(`${__dirname}/config.js`);

var strange_log_file = config.strange_log_file;

function helloworld(){
  console.log('helloworld from common.js');
}

function log_strange_things(things_to_log){
  fs.appendFileSync(`${strange_log_file}`, `var strange_text=${things_to_log}`+'\n');
}

function checkMonth(month_in){
  var month_list = ['', 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return month_list[month_in];
}

function get_yesterday(){
  var d = new Date();
  d.setDate(d.getDate()-1);
  return [d.getFullYear(), d.getMonth(), d.getDate()];
}

function getToday(){
  return new Date();
}

function getMinuteAgo(minute_in){

  var today = getToday();
  var [year, month, date, hour, minute] = [today.getYear()+1900, today.getMonth(),today.getDate(),today.getHours(),minute_in];

  var d = new Date(year, month, date, hour, minute);

  return d.getTime();
}

function getHoursAgo(hour_in){

  var today = getToday();
  var [year, month, date, hour, minute] = [today.getYear()+1900, today.getMonth(),today.getDate(),hour_in,0];

  var d = new Date(year, month, date, hour, minute);

  return d.getTime();
}

function fb_date_parser(fb_date_in){
  if (fb_date_in.trim() != ''){
    if (fb_date_in.search(/^20\d\d年/) > -1){
      // handle 2018年6月25日

      var m = fb_date_in.match(/(\d+?)年(\d+?)月(\d+?)日/)
      var [year, month, date] = [m[1],m[2],m[3]];
      var d = new Date(year, month-1, date, 0, 0);

      return d.getTime();
    }
    else if (fb_date_in.search(/\d+?月\d+?日/) > -1 ){
      // 9月27日
      var m1 = fb_date_in.match(/(\d+?)月(\d+?)日/)
      // 9月27日 01:01
      var m2 = fb_date_in.match(/(\d+?)月(\d+?)日 (\d+):(\d+)/)

      var today = new Date();

      if (m2 != null){
        var [year, month, date, hour, minute] = [today.getYear()+1900, m2[1],m2[2],m2[3],m2[4]];
        var d = new Date(year, month-1, date, hour, minute);
        return d.getTime();

      }else if(m1 != null){
        var [year, month, date] = [today.getYear()+1900, m1[1],m1[2]];
        var d = new Date(year, month-1, date);
        return d.getTime();
      }

    }
    else if (fb_date_in.search(/小時/) > -1) {
      var m1 = fb_date_in.match(/(\d+?)小時/);
      var m2 = fb_date_in.match(/(\d+?) 小時/);

      if (m1!= null){
        var hour_text = m1[1];
        return getHoursAgo(hour_text);
      }else{
        var hour_text = m2[1];
        return getHoursAgo(hour_text);
      }
    }
    else if (fb_date_in.search(/分鐘/) > -1) {
      var match = fb_date_in.match(/(\d+?)分鐘/);
      var minute_text = match[1];

      return getMinuteAgo(minute_text);
    }
    else if (fb_date_in.search(/昨天/) > -1 ){
      var match = fb_date_in.match(/昨天 (\d+?):(\d+?) 發佈/);

      var [y_year, y_month, y_date] = get_yesterday();
      var [y_hour, y_minute] = [match[1], match[2]];

      var d = new Date(y_year, y_month, y_date, y_hour, y_minute);

      return d.getTime();
    }
  }
  else{
    log_strange_things(`strange date found: ​"${fb_date_in}"`);
    return fb_date_in;
  }
}

module.exports.helloworld = helloworld
module.exports.fb_date_parser = fb_date_parser