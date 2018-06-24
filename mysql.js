var mysql      = require('/home/hi/桌面/nodejs/friendly_test-master/node_modules/mysql');
var connection = mysql.createConnection({
  host     : '140.138.77.98',
  user     : 'yzujava201609',
  password : 'm0654284vm,6java',
  database : '2017_JAVA'
});
var Today=new Date();


function updateSql(input){
	
	var Q_test='select * from Dcard limit 1;';
	connection.query(Q_test,function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		if(result.length!=0){
			//no empty--->delete old
			connection.query('DELETE FROM Dcard_old',function(err){
				if(err){
					return;
				}
				
				//connection.end();
			})
			//copy new to old
			connection.query('INSERT Dcard_old SELECT * FROM Dcard',function (err, result) {
				if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return;
				}
				//connection.end();
			});
			//delete new
			connection.query('DELETE FROM Dcard',function(err){
				if(err){
					console.log('[SELECT ERROR] - ',err.message);
					return;
				}
				//connection.end();
			});
			//insert new
			var q="INSERT INTO Dcard VALUES";
			input.forEach(function(element,index){
			q=q+'('+index+',"'+element.title+'",'+element.heart+',"'+element.sex+'","'+element.author+'")';
			if(index!=input.length-1)
			{
				q=q+',';
			}
			else
				q=q+';';
			});
			connection.query(q,function(err){
				if(err){
					console.log('[SELECT ERROR] - ',err.message);
					return;
				}
			console.log(Today.getFullYear()+ "年" + (Today.getMonth()+1) + "月" + Today.getDate() + "日"+ Today.getHours()+"時"+Today.getMinutes()+"分" + Today.getSeconds()+'秒');
			console.log("successful");
			connection.end();
			});			
		}
		else{
			var q="INSERT INTO Dcard VALUES";
			input.forEach(function(element,index){
			q=q+'('+index+',"'+element.title+'",'+element.heart+',"'+element.sex+'","'+element.author+'")';
			if(index!=input.length-1)
			{
				q=q+',';
			}
			else
				q=q+';';
			});
			connection.query(q,function(err){
				if(err){
					console.log('[SELECT ERROR] - ',err.message);
					return;
				}
			
			connection.end();
			});		
		}
	
	});
}
//updateSql('123');

module.exports=updateSql;
