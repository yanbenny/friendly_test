var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '140.138.77.98',
  user     : 'yzujava201609',
  password : 'm0654284vm,6java',
  database : '2017_JAVA'
});
 

function updateSql(result){
	connection.connect();
	var q="INSERT INTO mao VALUES";
	var a=[{title:'687',heart:'0'},{title:'767',heart:'123'},{title:'mao',heart:'55'}];
	result.forEach(function(element,index){
		q=q+'("'+element.title+'",'+element.heart+')';
		if(index!=result.length-1)
		{
		q=q+',';
		}
		else
		q=q+';';
	});
	connection.query(q,function (err, result) {
		    if(err){
		      console.log('[SELECT ERROR] - ',err.message);
		      return;
		    }
	});
	connection.end();
}
module.exports=updateSql;
