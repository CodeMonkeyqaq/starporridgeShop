window.onload = function(){
    this.getUserName()
    this.getOrder()
}

var xmlHttpRequest;
var xmlHttpRequest1;

//XmlHttpRequest对象
function createXmlHttpRequest() {
    if (window.ActiveXObject) { //如果是IE浏览器
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器
        return new XMLHttpRequest();
    }
}

function getUserName() {

    var url = "http://106.53.221.93:8080/user/get_user_info";

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = zswFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
}


//回调函数
function zswFun() {
    console.log("调用回调函数")
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        console.log("回调执行")
        var b = JSON.parse(xmlHttpRequest.responseText);
        console.log(b.status)
        if(b.status==0){
            console.log("username:" + document.getElementsByClassName("username")[0])
            console.log("返回" + b.data.username)
            document.getElementsByClassName("username")[0].innerHTML = b.data.username;
        }else {
            alert(b.msg)
        }
    }
}

function getOrder() {

    var url = "http://106.53.221.93:8080/order/list";

    //1.创建XMLHttpRequest组建
    xmlHttpRequest1 = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest1.onreadystatechange = orderFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest1.open('GET', url, true);

    xmlHttpRequest1.withCredentials = true;

    //4.发送请求
    xmlHttpRequest1.send(null);
}


//回调函数
function orderFun() {
    if (xmlHttpRequest1.readyState == 4 && xmlHttpRequest1.status == 200) {
        var b = JSON.parse(xmlHttpRequest1.responseText);
        if(b.status==0){
            var list = b.data.list;
            for(var i = 0;i<list.length; i++){
                var orderTable = document.getElementsByClassName("orderTable")[0];
                orderTable.innerHTML += "<div class=\"order\"><div class=\"orderNumber\">订单号: " + b.data.list[i].orderItemVOList[0].orderNo
                + "</div><img src=\"http://img.cdn.imbession.top/" + b.data.list[i].orderItemVOList[0].productImage + "\" " + "class=\"goodsImage\"/>" 
                +"<div class=\"goodsContent\">"
                +"<span class=\"goodsTitle\">" + b.data.list[i].orderItemVOList[0].productName + "</span>"
                +"<span class=\"goodsPrice\">单价：" + b.data.list[i].orderItemVOList[0].currentUnitPrice + "</span>"
                +"<span class=\"goodsNumber\">数量：" + b.data.list[i].orderItemVOList[0].quantity +"</span>"
                +"<span class=\"goodsTotal\">总价：" + b.data.list[i].orderItemVOList[0].totalPrice + "</span></div></div>"
            }
        }else {
            alert(b.msg)
        }
    }
}