var webdriver = require('selenium-webdriver');
var cheerio = require('cheerio');
var By = webdriver.By;
var until = webdriver.until;
var driver = new webdriver.Builder()
	.forBrowser('firefox')
	.build();


async function loadPage(url,callback) {
	 await driver.get(url);
	 await driver.getPageSource().then(()=>{
		driver.executeScript('window.intervalId=setInterval(function(){scrollBy(0,200)},100)');
	 });
	 await delayTimeAsync().then(()=>{
	 	driver.executeScript('clearInterval(window.intervalId)');
	 	driver.getPageSource().then((result)=>{
			callback(resolvePageSource(result));
			driver.quit();
	 	})
	 });
	 
}
const delayTimeAsync = (n=20)=>{
	return new Promise((resolve,reject) => {
		setTimeout(() =>{
			resolve('timeout');
		},n*1000);
	});
}
const resolvePageSource = (pagesource) =>{
	var $ = cheerio.load(pagesource);
	var element=$('.PostList_entry_1rq5L .PostEntry_content_g2afg');
	var items = [];
	element.each(function (idx, element) {
		if(items.length<100){
			const title = $(element).find('h3').text();
			const heart = $(element).find('.Like_counter_1enlP').text();
			items.push({
				title: title,
				heart: heart
		  	});
		}
	  });
	  console.log(items.length);
	  return items;
}
module.exports=loadPage;
