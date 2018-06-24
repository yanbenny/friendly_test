var webdriver = require('/home/hi/桌面/nodejs/friendly_test-master/node_modules/selenium-webdriver');
var cheerio = require('/home/hi/桌面/nodejs/friendly_test-master/node_modules/cheerio');
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
			//console.log(resolvePageSource(result));
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
	var element=$('.PostList_entry_1rq5L');
	var items = [];
	element.each(function (idx, element) {
		if(items.length<100){
			var sex;
			const title = $(element).find('.PostEntry_content_g2afg h3').text();
			const sex1=$(element).find('.PostAuthorHeader_avatar_1V21V div').hasClass('AnonymousAvatar_male_3mpl_');
			if(sex1)
			{
				sex='M';
			}
			const sex2=$(element).find('.PostAuthorHeader_avatar_1V21V div').hasClass('AnonymousAvatar_female_swqLg');
			if(sex2)
			{
				sex='F'
			}
			if(!sex1&&!sex2){
				sex='N'
			}
			const category =$(element).find('.PostEntry_header_1iheI .PostEntry_forum_1m8nJ').text();
			var author= $(element).find('.PostEntry_header_1iheI .PostAuthor_root_3vAJf').text();
			const heart = $(element).find('.PostEntry_content_g2afg .Like_counter_1enlP').text();
			if(sex==='N'){
				author='卡稱';
			}
			//console.log(author+sex+title+heart+category);
			items.push({
				title: title,
				sex: sex,
				category:category,
				author:author,
				heart: heart
		  	});
		}
	  });
	  
	  return items;
}
//loadPage('https://www.dcard.tw/f');
module.exports=loadPage;
