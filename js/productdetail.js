window.onload = function(){
    // document.getElementById("product-detail-inner").innerHTML += "<h3>这是JS插入的文本</h3>";
    this.loadOver();
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

//XmlHttpRequest对象
function createXmlHttpRequest() {
    if (window.ActiveXObject) { //如果是IE浏览器
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器
        return new XMLHttpRequest();
    }
}

function loadOver() {
    var productId = this.getQueryVariable("productId");
    
    var url = "http://106.53.221.93:8080/product/detail?productId=" + productId;

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

function replaceAll(str)

{

    if(str!=null)

    str = str.replace(/src="/g,"src=\"http:")

    return str;

}

//回调函数
function zswFun() {
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        // console.log(b.msg)
        if(b.status==0){
            var goods = document.getElementsByClassName("onegoods")[0];
            goods.getElementsByClassName("goodsImage")[0].src = "http://img.cdn.imbession.top/"+b.data.mainImage;
            goods.getElementsByClassName("goodsTitle")[0].innerHTML = b.data.name;
            goods.getElementsByClassName("goodsPrice")[0].innerHTML = '￥' + b.data.price;
            goods.getElementsByClassName("goodsSale")[0].innerHTML = '库存' + b.data.stock + '件';
            var detail = document.getElementById("product-detail-inner");
            var content = b.data.detail;
            content = replaceAll(content)
            detail.innerHTML = content
        }else {
            alert(b.msg)
        }
    }
}

function clickCart() {  
    var productId = this.getQueryVariable("productId");

    if (document.getElementById("number").value==""){
        alert("数量不能为空")
        return
    }
    var url = "http://106.53.221.93:8080/cart/add?productId=" + productId + "&count=" + document.getElementById("number").value;

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = cartFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
}

function cartFun(){
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        // console.log(b.msg)
        if(b.status==0){
            alert("加入购物车成功")
        }else {
            alert(b.msg)
        }
    }
}

function clickBuy() {
    var productId = this.getQueryVariable("productId");

    if (document.getElementById("number").value==""){
        alert("数量不能为空")
        return
    }
    
    var url = "http://106.53.221.93:8080/cart/add?productId=" + productId + "&count=" + document.getElementById("number").value;

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = buyFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
}

function buyFun(){
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        // console.log(b.msg)
        if(b.status==0){
            console.log("buyfun")
            buy()
        }else {
            alert(b.msg)
        }
    }
    
    
}   

function buy() {
    console.log("buy start")

    var url = "http://106.53.221.93:8080/shipping/select?shippingId=" + localStorage.getItem("shippingId");

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = okFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;
    
    //4.发送请求
    xmlHttpRequest.send(null);
}

function okFun(){
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        // console.log(b.msg)
        if(b.status==0){
            buyFinish()
        }else {
            alert(b.msg)
        }
    }
}

function buyFinish(){
    var url = "http://106.53.221.93:8080/order/create?shippingId=" + localStorage.getItem("shippingId");
    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = overFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;
    
    //4.发送请求
    xmlHttpRequest.send(null);
}

function overFun(){
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        // console.log(b.msg)
        if(b.status==0){
            alert("购买完成")
        }else {
            alert(b.msg)
        }
    }
}