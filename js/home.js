window.onload = function(){
    this.loadOver();
    var goodsList = document.getElementsByClassName("onegoods");
    console.log(goodsList)
    for(var i=0; i<goodsList.length; i++){
    goodsList[i].onclick = function() {
        console.log("点击了商品")
        console.log("home" + this.getAttribute('id'))
        window.location.href = "productdetail.html?productId=" + localStorage.getItem("home" + this.getAttribute('id'));
    }
}
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

    this.pressNew();
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
            for(i=1;i<7;i++){
                var goods = document.getElementById(i.toString());
                localStorage.setItem('home' + i.toString(), b.data[i-1].id);
                goods.getElementsByClassName("goodsImage")[0].src = "http://img.cdn.imbession.top/"+b.data[i-1].mainImage;
                goods.getElementsByClassName("goodsTitle")[0].innerHTML = b.data[i-1].name;
                goods.getElementsByClassName("goodsPrice")[0].innerHTML = '￥' + b.data[i-1].price;
                goods.getElementsByClassName("goodsSale")[0].innerHTML = '库存' + b.data[i-1].stock + '件';
            }
        }else {
            alert(b.msg)
        }
    }
}

function pressNew(){
    var url = "http://106.53.221.93:8080/product/searchNewOrHotOrBanner?isNew=1";

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

function pressHot(){
    var url = "http://106.53.221.93:8080/product/searchNewOrHotOrBanner?isHot=1";

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

function pressSearch(){
    console.log("pressSearch")
    if(this.document.getElementById('keyword').value==""){
        alert("内容不能为空")
    }
    else{
      window.location.href = "productlist.html?keyword=" + this.document.getElementById('keyword').value;
    }
}

function phoneClick(){
    window.location.href = "productcategory.html?categoryId=49";
}

function computerClick(){
    window.location.href = "productcategory.html?categoryId=20";
}

function padClick(){
    window.location.href = "productcategory.html?categoryId=39";
}