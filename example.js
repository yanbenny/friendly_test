var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();
	
async function loadPage(url) {
	
	driver.get(url);
	driver.sleep(10*1000).then(
		function(){
		driver.getPageSource().then(
			result => {
				console.log(result);
			}
		); 
	});
	
	setTimeout(()=>{
        driver.quit();
    },60*1000);
}
const resolvePageSource = (pagesource) =>{
    console.log(pagesource);
}


loadPage('https://www.dcard.tw/f');