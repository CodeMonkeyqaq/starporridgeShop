window.onload=function() {
    this.loadOver()
}

var xmlHttpRequest;

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
    var keyword = this.getQueryVariable("keyword");

    var url = "http://106.53.221.93:8080/product/list?keyword=" + keyword;

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
    // var json = JSON.parse(xmlHttpRequest.responseText);
    // console.log(json)
    console.log("readystate:" + xmlHttpRequest.readyState)
    console.log("status:" + xmlHttpRequest.status)
    console.log("responseText:" + xmlHttpRequest.responseText)
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            var shoplist = document.getElementsByClassName("shoplist")[0];
            for (var i = 0; i< b.data.list.length; i++){
                console.log("productList" + (i+1))
                localStorage.setItem("productList" + (i+1), b.data.list[i].id);
                document.getElementsByClassName("noresult")[0].style.display = "none";
                shoplist.innerHTML += "<a href=\"#\"><div class=\"onegoods\" id=\"" + (i+1).toString() + "\">"
                +"<img src=\"http://img.cdn.imbession.top/" + b.data.list[i].mainImage +"\" class=\"goodsImage\"/>"
                +"<div class=\"goodsContent\">"
                +"<span class=\"goodsTitle\">" + b.data.list[i].name + "</span>"
                +"<span class=\"goodsPrice\">￥" + b.data.list[i].price + "</span>"
                +"<span class=\"goodsSale\">库存" +  b.data.list[i].stock  + "件</span></div></div></a>" 
            } 
            var goodsList = document.getElementsByClassName("onegoods");
            console.log(goodsList)
            for(var i=0; i<goodsList.length; i++){
            goodsList[i].onclick = function() {
            console.log("点击了商品")
            console.log("productList" + this.getAttribute('id'))
            window.location.href = "productdetail.html?productId=" + localStorage.getItem("productList" + this.getAttribute('id'));
        }
    }
        }else{
            alert(b.msg)
        }
        console.log(b);
    }
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
