var isSelectAll;

window.onload=function() {
    this.loadOver()
}

var xmlHttpRequest;

//XmlHttpRequest对象
function createXmlHttpRequest() {
    if (window.ActiveXObject) { //如果是IE浏览器
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器
        return new XMLHttpRequest();
    }
}

function loadOver() {
    var url = "http://106.53.221.93:8080/cart/list";

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
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            var list = b.data.cartProductVOList;
            document.getElementsByClassName("orderTable")[0].innerHTML = ""
            for(var i = 0;i<list.length; i++){
                // console.log("<input type=\"checkbox\" name=\"select\" " + ((b.data.cartProductVOList[i].productChecked==1)?"checked=\"checked\"":"") + "/></div>")
                localStorage.setItem("cartOrder" + (i+1), b.data.cartProductVOList[i].productId);
                document.getElementsByClassName("noresult")[0].style.display = "none"
                var orderTable = document.getElementsByClassName("orderTable")[0];
                orderTable.innerHTML += "<div class=\"order\">"
                + "<div class=\"orderNumber\">"
                +"<input type=\"checkbox\" name=\"select\" id=\"select" + (i+1) + "\" " + ((b.data.cartProductVOList[i].productChecked==1)?"checked=true":"") + " onclick=\"clickSelect(" + (i+1) + ")\" /></div>"
                +"<img src=\"http://img.cdn.imbession.top/" + b.data.cartProductVOList[i].productMainImage + "\" " + "class=\"goodsImage\"/>"
                +"<div class=\"goodsContent\">"
                +"<span class=\"goodsTitle\">" + b.data.cartProductVOList[i].productName + "</span>"
                +"<span class=\"goodsPrice\">单价：" + b.data.cartProductVOList[i].productPrice +"</span>"
                +"<span class=\"goodsNumber\">数量：" + b.data.cartProductVOList[i].quantity + "</span>"
                +"<span class=\"goodsTotal\">总价：" + b.data.cartProductVOList[i].productTotalPrice + "</span></div>"      
                +"<button class=\"btn\" id=\"add" + (i+1) + "\" onclick=\"pressAdd(" + (i+1) + ")\">+</button>"
                +"<button class=\"btn\" id=\"minus" + (i+1) + "\" onclick=\"pressMinus(" + (i+1) + ")\">-</button>"
                // +"<button class=\"btn\" id=\"delete" + (i+1) + "\" onclick=\"pressDelete(" + (i+1) + ")\">删除</button></div>" 
            } 
            var selectAllBox = document.getElementsByName("selectAll")[0];
            var totalNumber = document.getElementsByClassName("total")[0];
            if(b.data.allChecked==true){
                selectAllBox.checked = true
                isSelectAll = true
            }else if(b.data.allChecked==false){
                selectAllBox.checked = false
                isSelectAll = false
            }
            totalNumber.innerHTML = "总价: " + b.data.cartTotalPrice
        }else{
            alert(b.msg)
        }
    }
}

function clickSelect(i){
    var productId = localStorage.getItem("cartOrder" + i)

    var isSelected = document.getElementById("select" + i).getAttribute("checked");

    console.log(isSelected)

    if(isSelected=="true"){
        var url = "http://106.53.221.93:8080/cart/un_select?productId=" + productId;

        //1.创建XMLHttpRequest组建
        xmlHttpRequest = createXmlHttpRequest();
    
        //2.设置回调函数
        xmlHttpRequest.onreadystatechange = selectFun;
    
        //3.初始化XMLHttpRequest组建
        xmlHttpRequest.open('GET', url, true);
    
        xmlHttpRequest.withCredentials = true;
    
        //4.发送请求
        xmlHttpRequest.send(null);
    }
    else {
        var url = "http://106.53.221.93:8080/cart/select?productId=" + productId;

        //1.创建XMLHttpRequest组建
        xmlHttpRequest = createXmlHttpRequest();

        //2.设置回调函数
        xmlHttpRequest.onreadystatechange = selectFun;

        //3.初始化XMLHttpRequest组建
        xmlHttpRequest.open('GET', url, true);

        xmlHttpRequest.withCredentials = true;

        //4.发送请求
        xmlHttpRequest.send(null);
    }
    
}

function selectFun(){
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            loadOver()
        }else{
            alert(b.msg)
        }
    }
}

function pressAdd(i){
    var productId = localStorage.getItem("cartOrder"+i);

    var url = "http://106.53.221.93:8080/cart/add?productId=" + productId + "&count=1";

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = addFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
}

function addFun(){
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            loadOver()
        }else{
            alert(b.msg)
        }
    }
}

function pressMinus(i){
    var productId = localStorage.getItem("cartOrder"+i);

    var url = "http://106.53.221.93:8080/cart/add?productId=" + productId + "&count=-1";

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = minusFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
}

function minusFun(){
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            loadOver()
        }else{
            alert(b.msg)
        }
    }
}

// function pressDelete(i){
//     var productId = localStorage.getItem("cartOrder" + i)

//     var url = "http://106.53.221.93:8080/cart/delete_product?productId=" + productId;

//     //1.创建XMLHttpRequest组建
//     xmlHttpRequest = createXmlHttpRequest();

//     //2.设置回调函数
//     xmlHttpRequest.onreadystatechange = deleteFun;

//     //3.初始化XMLHttpRequest组建
//     xmlHttpRequest.open('GET', url, true);

//     xmlHttpRequest.withCredentials = true;

//     //4.发送请求
//     xmlHttpRequest.send(null);
// }

// function deleteFun(){
//     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
//         var b = JSON.parse(xmlHttpRequest.responseText);
//         if(b.status==0){
//             loadOver()
//         }else{
//             alert(b.msg)
//         }
//     }
// }

function clickSelectAll(){

    if(isSelectAll == true){
        var url = "http://106.53.221.93:8080/cart/un_select_all";

        //1.创建XMLHttpRequest组建
        xmlHttpRequest = createXmlHttpRequest();
    
        //2.设置回调函数
        xmlHttpRequest.onreadystatechange = saFun;
    
        //3.初始化XMLHttpRequest组建
        xmlHttpRequest.open('GET', url, true);
    
        xmlHttpRequest.withCredentials = true;
    
        //4.发送请求
        xmlHttpRequest.send(null);
    }
    else {
        var url = "http://106.53.221.93:8080/cart/select_all";

        //1.创建XMLHttpRequest组建
        xmlHttpRequest = createXmlHttpRequest();

        //2.设置回调函数
        xmlHttpRequest.onreadystatechange = saFun;

        //3.初始化XMLHttpRequest组建
        xmlHttpRequest.open('GET', url, true);

        xmlHttpRequest.withCredentials = true;

        //4.发送请求
        xmlHttpRequest.send(null);
    }
    
}

function saFun(){
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            loadOver()
        }else{
            alert(b.msg)
        }
    }
}

function clickBuy(){
    var url = "http://106.53.221.93:8080/shipping/select?shippingId=" + localStorage.getItem("shippingId");

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
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        if(b.status==0){
            buyFinish()
        }else{
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
            loadOver()
        }else {
            alert(b.msg)
        }
    }
}