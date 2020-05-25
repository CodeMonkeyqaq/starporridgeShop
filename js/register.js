        var userName;
        var passWord;
        var phone;
        var email;
        var passwordQuestion;
        var passwordQuestionAnswer;
        var xmlHttpRequest;


        //XmlHttpRequest对象
        function createXmlHttpRequest() {
            if (window.ActiveXObject) { //如果是IE浏览器
                return new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) { //非IE浏览器
                return new XMLHttpRequest();
            }
        }

        function onRegister() {
            username = document.getElementById("usn").value;
            password = document.getElementById("pwd").value;
            phone = document.getElementById("tel").value;
            email = document.getElementById("email").value;
            passwordQuestion = document.getElementById("pwq").value;
            passwordQuestionAnswer = document.getElementById("pwqa").value;

            var url = "http://106.53.221.93:8080/user/register?username=" + this.username + "&password=" + this.password +
                "&email=" + this.email + "&phone=" + this.phone + "&question=" + this.passwordQuestion + "&answer=" +
                this.passwordQuestionAnswer;

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
                    alert(b.msg)
                    // window.location.href="login.html"
                    login()
                }else{
                    alert(b.msg)
                }
            }
        }

        function login() {
            username = document.getElementById("usn").value;
            password = document.getElementById("pwd").value;

            var url = "http://106.53.221.93:8080/user/login?username=" + this.username + "&password=" + this.password;

            //1.创建XMLHttpRequest组建
            xmlHttpRequest = createXmlHttpRequest();

            //2.设置回调函数
            xmlHttpRequest.onreadystatechange = loginFun;

            //3.初始化XMLHttpRequest组建
            xmlHttpRequest.open('GET', url, true);

            xmlHttpRequest.withCredentials = true;

            //4.发送请求
            xmlHttpRequest.send(null);
        }

        function loginFun(){
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                var b = JSON.parse(xmlHttpRequest.responseText);
                if(b.status==0){
                    // window.location.href="login.html"
                    console.log(b.data.id)
                    localStorage.setItem("id", b.data.id)
                    createShipping()
                }else{
                    alert(b.msg)
                }
            }
        }

        function createShipping(){
            
            var userId;
            userId = localStorage.getItem("id")

            var url = "http://106.53.221.93:8080/shipping/add?userId=" + userId + "&receiverName=" + document.getElementById("usn").value + "&receiverPhone=" + phone + "&receiverMobile=" + phone + "&receiverProvince=a&receiverCity=a&receiverDistrict=a&receiverAddress=a&receiverZip=a";

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
                    localStorage.setItem("shippingId", b.data.shippingId);
                    window.location.href = "home.html"
                }else{
                    alert(b.msg)
                }
            }
        }