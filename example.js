var webdriver = require('selenium-webdriver');
var cheerio = require('cheerio');
var By = webdriver.By;
var until = webdriver.until;
var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();
	
async function loadPage(url) {
	
	driver.get(url);
	/*driver.sleep(1*1000).then(
		function(){
		driver.getPageSource().then(
			result => {
				resolvePageSource(result);
			}
		); 
	});*/
	await driver.getPageSource(); 
    await driver.getPageSource().then(
        result => {
            resolvePageSource(result);
	 });
	 driver.executeScript('window.intervalId=setInterval(function(){scrollBy(0,200)},500)');
	for(let i=0;i<3;i++)
	 {
		 await delayTimeAsync();
		 await driver.getPageSource().then(
		 	result =>{
				 resolvePageSource(result);
			 } 
		 );
	 }
	 await driver.executeScript('clearInterval(window.intervalId)');
	setTimeout(()=>{
        driver.quit();
    },60*1000);
}
const delayTimeAsync = (n=10)=> {
	return new Promise((resolve,reject) => {
		setTimeout(() =>{
			resolve('timeout');
		},n*1000);
	});
}
const resolvePageSource = (pagesource) =>{
	//console.log(pagesource);
	var $ = cheerio.load(pagesource);
	var element=$('.PostList_entry_1rq5L .PostEntry_content_g2afg');
	var items = [];
	element.each(function (idx, element) {
		const title = $(element).find('h3').text();
		const heart = $(element).find('.Like_counter_1enlP').text();
		console.log(title);
		console.log(heart);
      });
}


loadPage('https://www.dcard.tw/f');