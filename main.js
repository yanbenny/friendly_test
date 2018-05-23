var loadPage = require('./crawler');
var updateSQL= require('./mysql');
loadPage('https://www.dcard.tw/f',updateSQL);
/*
function callinFromSomeone(name, phoneNumber, doSomething){
    console.log('電話響了!!! 顯示姓名是 ' + name + ' 與電話號碼是 '+phoneNumber);

    doSomething(name, phoneNumber);
}

function leaveMessage(name, phoneNumber){
    console.log('和對方說一聲');
    console.log('姓名: '+ name+'\n 電話號碼: '+phoneNumber);
}

callinFromSomeone('施旖婕','0912345678', leaveMessage);*/
