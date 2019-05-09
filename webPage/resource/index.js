var params = {};
var titleImgPathArr = ['','icon_zg.png','icon_sm.png','icon_gp.png','icon_hb.png','icon_zq.png','icon_hh.png'];
var riskImgPathArr = ['icon_fx_green.png', 'icon_fx.png', 'icon_fx_red.png'];// 风险图标
var riskColor = ['rgb(80,203,76)', 'rgb(255,149,0)', 'rgb(247,48,62)'];// 风险颜色
 
toastr.options = {
  "closeButton": false,
  "debug": false,
  "positionClass": "toast-center",
  "onclick": null,
  "showDuration": "5000",
  "hideDuration": "5000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  // "showEasing": "swing",
  // "hideEasing": "linear",
  // "showMethod": "fadeIn",
  // "hideMethod": "fadeOut"
} 

// var reLoadLeftTime = false ;
//监听浏览器当前页面是否被激活的事件
var hiddenProperty = 'hidden' in document ? 'hidden' :  'webkitHidden' in document ? 'webkitHidden' :  'mozHidden' in document ? 'mozHidden' :  null;
// var isHidden = document[hiddenProperty];
// var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
// var onVisibilityChange = function(){
//     if(!document[hiddenProperty]){ 
//       reLoadLeftTime = true;
//     } else {
//       reLoadLeftTime = false;
//     }
// }
// document.addEventListener(visibilityChangeEvent, onVisibilityChange);

window.onload = function () {

  parseToSetData();

  showDownloadModal();
}

// 解析并重新赋值链接的数据
function parseToSetData() {
  var depart = getQueryString('depart'); // 开户营业部名称，仅类型2有值
  var bank = getQueryString('bank'); // 存管银行名称，仅类型2有值
  var product = getQueryString('product'); // 产品名称
  var label = getQueryString('label'); // 产品分类标签名称
  var type = getQueryString('type'); // 产品类型id，2开户，3业务办理，4金融产品，5增值产品
  var profit = getQueryString('profit'); // 预期收益率，仅类型4有值
  var position = getQueryString('position'); // 产品经理当前职位，包含所在营业部和职位
  var name = getQueryString('name'); // 产品经理姓名
  var paper = getQueryString('paper'); // 执业证书编号

  // start
  var isPreview = getQueryString('isPreview'); //用于判断是否为预览,false显示'我要购买'按钮
  var flag = getQueryString('FLAG'); //用于判断金融产品类型(0-收益凭证,1-资管,2-私募,3-股票,4-货币,5债券,6混合,7指数)
  var productName = getQueryString('CPMC');//产品名称
  var productCode = getQueryString('CPDM');//产品代码
  var leftData = getQueryString('ZBSJ');//产品左边显示数据
  var leftUnit = getQueryString('ZBDW');//产品左边单位
  var leftLabel = getQueryString('ZBBQ');//产品左边标签
  var rightData = getQueryString('YBSJ');//产品右边显示数据
  var rightUnit = getQueryString('YBDW');//产品右边单位
  var rightLabel = getQueryString('YBBQ');//产品右边标签
  var start = getQueryString('RGQD');//投资起点
  var riskLevel = getQueryString('FXDJ');//风险等级（R1-R5）
  var status = getQueryString('ZT');//产品状态
  var code = getQueryString('CPDM'); //产品代码
  var url = getQueryString('URL');
  

  if(isPreview === "0"){
    document.querySelector("#btn-view").style.display = "block";
  }

  if(flag){
    if(flag !== "0"){
      document.querySelector("#finance_product_view").style.display = "block";
      document.querySelector("#card_view").style.display = "none";
    }
    if(flag === "2"){
      document.querySelector("#finance_body").style.display = "none";
      document.querySelector("#jj_body").style.display = "block";
    }
  }
  
  document.querySelector("#head_img").src= 'resource/images/' + titleImgPathArr[flag || 1];
  document.querySelector("#head_name").innerHTML= productName || "--";
  document.querySelector("#head_code").innerHTML= productCode || "--";
  document.querySelector("#left_data").firstChild.nodeValue= leftData || "---";
  document.querySelector("#left_data").style.color= getDataColor(flag,leftUnit);
  document.querySelector("#left_unit").innerHTML= leftUnit || "";
  document.querySelector("#left_unit").style.color= getDataColor(flag,leftUnit);
  document.querySelector("#left_label").innerHTML= leftLabel;
  document.querySelector("#jj_data").firstChild.nodeValue= leftData || "---";
  document.querySelector("#jj_label").innerHTML= leftLabel;
  document.querySelector("#right_data").firstChild.nodeValue= rightData || "---";
  document.querySelector("#right_data").style.color= getDataColor(flag,rightUnit);
  document.querySelector("#right_unit").innerHTML= rightUnit || "";
  document.querySelector("#right_unit").style.color= getDataColor(flag,rightUnit);
  document.querySelector("#right_label").innerHTML= rightLabel;
  document.querySelector("#foot_left img").src= 'resource/images/icon_dt.png';
  document.querySelector("#foot_left span").innerHTML= start;
  document.querySelector("#foot_center img").src= 'resource/images/' + riskImgPathArr[getRiskStyle(riskLevel)];
  document.querySelector("#foot_center span").style.color= riskColor[getRiskStyle(riskLevel)];
  document.querySelector("#foot_center span").innerHTML= (riskLevel || "--")+"风险";
  document.querySelector("#foot_right img").src= (flag === '2' ? 'resource/images/icon_zt_jj.png' : 'resource/images/icon_zt.png');
  document.querySelector("#foot_right span").innerHTML= status || "--";
  // end

  // 获取图片及文字信息，并赋值给相应的节点
  var data = getDataByProductId(type);
  document.querySelector(".m-card-head").innerHTML = data.title;
  document.querySelector("#business_1 img").src = data.img_1;
  document.querySelector("#business_1 span").innerHTML = data.text_1;
  document.querySelector("#business_2 img").src = data.img_2;
  document.querySelector("#business_2 span").innerHTML = data.text_2;
  document.querySelector("#business_3 img").src = data.img_3;
  document.querySelector("#business_3 span").innerHTML = data.text_3;
  document.querySelector("#proType").innerHTML = data.type;
  
  if (document.querySelector("#btn-bottom") && data.btn) {
    document.querySelector("#btn-bottom").innerHTML = data.btn;
  }
  
  // 产品名称，客户经理信息
  document.querySelector("#personal_position").innerHTML = position + "  " + name || "--";
  document.querySelector("#personal_paper").innerHTML = paper || "--";
  document.querySelector("#production").innerHTML = product || "--";

  // 金融产品，显示预期收益率
  // if (type === '4') {
  //   document.querySelector("#product_profit").style.display = "block";
  //   document.querySelector("#profit_value").innerHTML = profit || '--';
  // }

  // 开户产品，显示开户信息
  if (type === '2') {
    document.querySelector("#account").style.display = "block";
    document.querySelector("#account_depart").innerHTML = depart || '--';
    document.querySelector("#account_bank").innerHTML = bank || '--';
  }
  
}

// 左右数据颜色显示
function getDataColor(flag, unit){
  if (flag === '1' || flag === '2' || (unit && unit === '%')) {
    return "red";
  }
  return "#888";
}

// 获取风险等级样式
function getRiskStyle(riskLevel){
  var index = 0;
  if (!riskLevel) {
    return index;
  }
  if (riskLevel.indexOf('R3') != -1 || riskLevel.indexOf('R4') != -1) {
    index = 1;
  } else if (riskLevel.indexOf('R5') != -1) {
    index = 2;
  }
  return index;
}


// 根据产品类型id获取相应的数据
function getDataByProductId(id) {
  switch (id) {
    case '2':
      return {
        title: "解锁万和极速开户",
        img_1: "resource/images/marketing_cpgdy_js.png",
        text_1: "极速",
        img_2: "resource/images/marketing_cpgdy_aq.png",
        text_2: "安全",
        img_3: "resource/images/marketing_cpgdy_dy.png",
        text_3: "低佣",
        type: "开户产品",
        btn: "立即开户"
      };
    case '3':
      return {
        title: "解锁万和全能网厅",
        img_1: "resource/images/marketing_cpgdy_24h.png",
        text_1: "7X24h",
        img_2: "resource/images/marketing_cpgdy_qlyw.png",
        text_2: "全量业务",
        img_3: "resource/images/marketing_cpgdy_ksbl.png",
        text_3: "快速办理",
        type: "业务办理",
        btn: "立即办理"
      };
    case '4':
      return {
        title: "解锁万和特色理财",
        img_1: "resource/images/marketing_cpgdy_fdsy.png",
        text_1: "稳健省心",
        img_2: "resource/images/marketing_cpgdy_dfx.png",
        text_2: "严选理财",
        img_3: "resource/images/marketing_cpgdy_5up.png",
        text_3: "优质基金",
        type: "金融产品",
        btn: "立即购买"
      };
  
    default:
      return {
        title: "--",
        img_1: "",
        text_1: "--",
        img_2: "",
        text_2: "--",
        img_3: "",
        text_3: "--",
        type: "--",
        btn: "--"
      };
  }
}

// 正则方式获取链接参数
function getQueryString(name) { 
  var value = null;
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) {
    if (r[2] != "" && (r[2].indexOf("%") !== r[2].length - 1)) {
      // value = unescape(decodeURI(r[2]));
      value = decodeURIComponent(r[2]);
    } else {
      value = r[2];
    }
  }
  params[name] = (value === undefined || value === null)? '' : value.replace('[','').replace(']','');
  return params[name]
} 

var wait = 60; // 定时60s
var InterValObj ;
var curCount;

// 设置点击按钮后60s不能再点击

function time(obj){
  curCount = wait;
  var phone = $("#phone").val();
  if(!phone){
    // toastr.error("请输入手机号码");
    showToast("请输入手机号码",3000);
    return ;
  }
  var reg = /^[1][3,4,5,7,8][0-9]{9}$/ ; 
  if(!reg.test(phone)){
    // toastr.error("请输入正确的手机号码");
    showToast("请输入正确的手机号码",3000);
    return ;
  }
    $.ajax({
      type: "GET",

      url: "http://183.239.162.211:8090/api/v1/queryMobileValidateCode",

      data: {phone: phone},

      dataType: "json",
      success: function(data){
        console.log(data);
        if(data.O_CODE == 1){
          InterValObj = window.setInterval(function(){SetRemainTimes(obj)}, 1000);
        }else{
          showToast(data.O_NOTE, 3000);
        }
      }
    })
}

 function SetRemainTimes(obj) {
  if(curCount == 0) {
    window.clearInterval(InterValObj); //停止计时器 
    obj.attr("onclick","time($(this))");
    obj.text("获取验证码"); 
    obj.removeClass('disabled');
  } else {
    curCount--;
    obj.removeAttr("onclick");
    obj.text("重新发送"+curCount+"秒");
    obj.addClass('disabled')
  }
}

function showToast(msg,duration){  
  duration=isNaN(duration)?3000:duration;  
  var m = document.createElement('div');  
  m.innerHTML = msg;  
  m.style.cssText="width:60%; min-width:180px; background:#000; opacity:0.6; height:auto;min-height: 30px; color:#fff; line-height:30px; text-align:center; border-radius:4px; position:fixed; top:50%; left:20%; z-index:999999;";  
  document.body.appendChild(m);  
  setTimeout(function() {  
      var d = 0.5;  
      m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';  
      m.style.opacity = '0';  
      setTimeout(function() { document.body.removeChild(m) }, d * 1000);  
  }, duration);  
} 

// 点击按钮后弹起下载遮罩层
function showDownloadModal() {
  var ahref = document.getElementById('ahref');
  var modal = document.getElementById('modal');
  var colse = document.getElementById('colse');
  var btn = document.getElementById('btn-bottom');
  var codeBtn = document.getElementById('btn-code');
  var u = navigator.userAgent;
  var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var height = document.body.clientHeight;
  if (btn) {
    var paramStr = getLocalUrl();
    btn.setAttribute("href","com.wanhesec://"+paramStr);
    btn.onclick = function () {
      if(isWeiXinFunc()){
        if(isIos){
          $("#iosbg").addClass("dis-fx");
          $("#iosbg").show();
          $("#iosbg").click(function(){
            $("#iosbg").removeClass("dis-fx");
            $("#iosbg").hide();
          });
          return ;
        }
        $("#bg").addClass("dis-fx");
        $("#bg").show();
        $("#bg").click(function(){
          $("#bg").removeClass("dis-fx");
          $("#bg").hide();
        });     
        return ;
      }
      // 点击按钮后打开对应的app或下载地址
      var ipaUrl = 'https://itunes.apple.com/cn/app/id1434028538';
      var apkUrl = 'http://www.vanho.cn/main/views/softwareDownload/download.html?appName=whyyz';
      openApp("com.wanhesec", ipaUrl, apkUrl, params, popUp);
    }
  }
  colse.onclick = function () {
    ahref.style.height = 0 + 'px';
    ahref.style.display = "none"
    modal.style.display = "none"
  }
  ahref.onclick = function () {
    ahref.style.height = 0 + 'px';
    ahref.style.display = "none"
    modal.style.display = "none"
  }
}

//弹框Model
var popUp=(function(url){
  setTimeout(() => {
    if (!document[hiddenProperty]) {
      var ahref = document.getElementById('ahref');
      var modal = document.getElementById('modal');
      var btn = document.getElementById('btn-submit');
      var u = navigator.userAgent;
      var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var height = document.body.clientHeight;
      ahref.style.height = height + 'px';
      ahref.style.display = "block"
      modal.style.display = "block"
      btn.onclick=function() {
        var checkCode = $("#code").val();
        var phone = $("#phone").val();
        openAndDownload(phone, checkCode, url);
      }
    }
  }, 500);
});

function openAndDownload(phone, checkCode, url){
  if(!phone){
    // toastr.error("请输入手机号码");
    showToast("请输入手机号码",3000);

    return ;
  }
  if(!checkCode){
    // toastr.error("请输入验证码");
    showToast("请输入验证码",3000);
    return ;
  }
  $.ajax({
    type: "GET",

    url: "http://183.239.162.211:8090/api/v1/matchMobileValidateCode",

   data: {phone: phone,validateCode:checkCode},

    dataType: "json",
    success: function(data){
      if(data.O_CODE == 1){
         window.location.href = url;
      } else {
        // toastr.error(data.O_NOTE);
        showToast(data.O_NOTE,3000);
      }
      
    }
  })
}


// 创建iframe	
var createIframe = (function() {
  var iframe;
  return function() {
    if (iframe) {
      return iframe;
    } else {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      return iframe;
    }
  }
})();

function isWeiXinFunc(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
  }else{
      return false;
  }
}

// $(function () {
//   if(isWeiXinFunc()){
//       $('div').css("display","none");
//       $('.mask').show();  
//   }else{
//       $('.mask').hide();
//   }
// })


/*判断是否是ios9以上*/
function isIOS9() {
  //获取固件版本
  var getOsv = function() {
    var reg = /OS ((\d+_?){2,3})\s/;
    if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
      var osv = reg.exec(navigator.userAgent);
      if (osv.length > 0) {
        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
      }
    }
    return '';
  };
  var osv = getOsv();
  var osvArr = osv.split('.');
  //初始化显示ios9引导
  if (osvArr && osvArr.length > 0) {
    if (parseInt(osvArr[0]) >= 9) {
      return true;
    }
  }
  return false;
}

function getLocalUrl(){
  var url = '';
  // if(params['FLAG'] !== ''){
  //   url += 'action:52004/mall/'+params['URL']+'?channel=zz&belong=1&pdtId='+params['CPDM'];
  // } else {
  //   url += 'action'+params['URL'];
  // }
  url += 'action'+params['URL'];
  return url;
}

//打开APP主函数
var openApp = function(appName, ipaUrl, apkUrl, params, callback) {
  // var paramStr = encodeURI(JSON.stringify(params));
  var paramStr = getLocalUrl();
  var localUrl = appName + "://" + paramStr;
  // var localUrl = 'com.wanhesec://action:52003/?permissionOpen/otc.html?channel=zz';
  var openIframe = createIframe();
  var u = navigator.userAgent;
  var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
  if (isIos) {
    // window.location.href = localUrl;
    if (isIOS9()) {
      openIframe.src = localUrl;
      //判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号
      /* localUrl=createScheme({type:1,id:"sdsdewe2122"},true);//代码还可以优化一下*/
      //实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里
      //return;
    } else{
      window.location = localUrl;
    }
    //判断是否是ios,具体的判断函数自行百度
    callback(ipaUrl);
    // var loadDateTime = Date.now();
    // window.setTimeout(function () {
    //   var timeOutDateTime = Date.now();
    //   if (timeOutDateTime - loadDateTime < 5000) {
    //     callback(ipaUrl);
    //   } else {
    //     window.close();
    //   }
    // }, 500);
    // openIframe.src = localUrl;
  } else if (isAndroid) {
    openIframe.src = localUrl;
    //判断是否是android，具体的判断函数自行百度
    // if (isChrome) {
    //   //chrome浏览器用iframe打不开得直接去打开，算一个坑
    //   callback(localUrl);
    // } else {
    //   //抛出你的scheme
    //   openIframe.src = localUrl;
    // }
    callback(apkUrl)
    // setTimeout(function() {
    //   /* http://t.cn/RcxMVvL*/
    //   callback(apkUrl);
    // }, 500);
  } else {
    //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
    openIframe.src = localUrl;
    callback(apkUrl)
    // setTimeout(function() {
    //   callback(apkUrl);
    // }, 500);
  }
}         
