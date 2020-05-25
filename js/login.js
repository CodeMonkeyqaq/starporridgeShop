var userName;
var passWord;
var xmlHttpRequest;


//XmlHttpRequest对象
function createXmlHttpRequest() {
    if (window.ActiveXObject) { //如果是IE浏览器
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器
        return new XMLHttpRequest();
    }
}

function onLogin() {
    username = document.getElementById("username").value;
    console.log(username);
    password = document.getElementById("password").value;

    var url = "http://106.53.221.93:8080/user/login?username=" + this.username + "&password=" + this.password;

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
        // console.log(b.msg)
        if(b.status==0){
            alert("登陆成功")
            localStorage.setItem("id", b.data.id)
            selectShipping()
        }else{
            alert(b.msg)
        }
    }
}

function selectShipping(){
            
    var userId;
    userId = localStorage.getItem("id")

    var url = "http://106.53.221.93:8080/shipping/list";

    //1.创建XMLHttpRequest组建
    xmlHttpRequest = createXmlHttpRequest();

    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = shippingFun;

    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.withCredentials = true;

    //4.发送请求
    xmlHttpRequest.send(null);
    
}

function shippingFun(){
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var b = JSON.parse(xmlHttpRequest.responseText);
        console.log(b.msg)
        if(b.status==0){
            // window.location.href="login.html"
            localStorage.setItem("shippingId", b.data.list[0].id);
            window.location.href = "home.html"
        }else{
            alert(b.msg)
        }
    }
}