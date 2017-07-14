
/**
 * 批量设置对象样式
 * @param obj   object   被设置样式的对象
 * @param json  json     样式 {'width':'200px'}
 */
function setStyle(obj, json)
{
	for (var name in json)
	{
		obj.style[name]=json[name];
	}
}

/**
 * 通过class名字获取元素
 * @param oParent   object   指定父级
 * @param sClass    string   class名字
 *
 * @return aRes     array    获取到的一组对象
 */
/*function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}else{
		var aChild=oParent.getElementsByTagName('*');
		var aRes=[];
		for (var i=0; i<aChild.length; i++)
		{
			var aTmp=aChild[i].className.split(' ');
			if (findInArr(aTmp, sClass))
			{
				aRes.push(aChild[i]);
			}
		}
		return aRes;
	}
}*/
//正则版
//通过Class名来获取元素
function getByClass(oParent,sClass){
    //return oParent.getElementsByClassName(sClass);
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{ //IE 6 7 8
        var arr=[];
        //var reg=/\bred\b/;
        var reg=new RegExp('\\b'+sClass+'\\b');

        var aEle=oParent.getElementsByTagName('*');
        for(var i=0; i<aEle.length; i++){
            if(reg.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
//测试这个对象有没有这个clsss名
function hasClass(obj,sClass){
    var reg=new RegExp('\\b'+sClass+'\\b'); //
    return reg.test(obj.className);
}
//添加class名
function addClass(obj,sClass){
    if(obj.className){
        if(!hasClass(obj,sClass)){
            obj.className+=' '+sClass;
        }
    }else{
        obj.className=sClass;
    }
}
//删除class名
function removeClass(obj,sClass){
    var reg=new RegExp('\\b'+sClass+'\\b','g');
    if(hasClass(obj,sClass)){
        obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
    }
}
//转换class
function toggleClass(obj,sClass){
    if(hasClass(obj,sClass)){
        removeClass(obj,sClass);
    }else{
        addClass(obj,sClass);
    }
}
//去重函数
function findInArr(arr, target)
{
	for (var i=0; i<arr.length; i++)
	{
		if (arr[i] == target)
		{
			return true;
		}
	}
	return false;
}
//随机数
function rnd(n, m)
{
	return Math.floor(Math.random()*(m-n)+n);
}
function rndColor()
{
	return 'rgb('+rnd(0,255)+','+rnd(0,255)+','+rnd(0,255)+')';
}
//时间戳处理
function getDate(time)
{
	var oDate=new Date();
	oDate.setTime(time*1000);
	var m=oDate.getMonth();
	var d=oDate.getDate();
	var h=oDate.getHours();
	var f=oDate.getMinutes();
	var s=oDate.getSeconds();
	return zeroFill(m+1)+'-'+zeroFill(d)+'&nbsp;'+zeroFill(h)+':'+zeroFill(f)+':'+zeroFill(s);
}
//补零函数
function zeroFill(n)
{
	return n<10 ? '0'+n : ''+n;
}
// 千位分隔符
function commafy(num) {
	return num && num
		.toString()
		.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
		  return $1 + ",";
	});
}
console.log(commafy(1234567.90)); //1,234,567.90
//获取行间样式
function getStyle(obj,sName)
{
	return (obj.currentStyle || getComputedStyle(obj,false))[sName];
}
//判断一个对象是不是数组
function isArray(a) {
  return Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
}
isArray = Array.isArray || function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

//获取对象到页面的距离 obj为对象
function getPos(obj)
{
	var left=0;
	var top=0;
	while(obj)//body的offsetParent为null
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {'left':left,'top':top};
};
//get post jsonp
function ajax(options)
{
	/*{
		'url':'index.php',
		'data':{},
		'type':'GET',
		'async':true,//异步
		'dataType':'jsonp',
		'timeout':,
		success:function(){},
		fail:function(){}
	}*/
	options=options || {};
	if(!options.url)return;
	var data=options.data || {};
	var type=options.type || 'get';
	var cbName=options.cbName || 'cb';
	var async=typeof options.async === 'undefined' ? true : options.async;
	var timeout=options.timeout || 3000;
	//jsonp
	var jsonp=options.jsonp || 'callback';
	if(options.dataType=='jsonp')
	{
		var fnName=('callback'+Math.random()).replace('.', '');
		data[cbName]=fnName;
		window[fnName]=function (res){
			options.success && options.success(res);
			oHead.removeChild(oS);
		};
		
		var oS=document.createElement('script');
		oS.src=options.url+'?'+json2url(data);
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);
		return;
	}

	//ajax
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	var arr=[];
	data.t=Math.random();
	for(var name in data)
	{
		arr.push(name+'='+data[name]);
	}
	var str=arr.join('&');
	switch(type.toLowerCase())
	{
		case 'get':
			oAjax.open('get',options.url+'?'+str,async);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('post',options.url,async);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(str);
			break;
	}
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4)
		{
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.success && options.success(oAjax.responseText);
			}else{
				options.fail && options.fail(oAjax.status);
			}
		}
	};
	if(!async){
		oAjax.onreadystatechange();
	}
	var timer=setTimeout(function(){
		options.fail && options.fail('链接超时，请重新加载！');
		oAjax.onreadystatechange=null;
	},timeout);
}
//hash 哈希
var hash=[];
hash.length=10;
var count=0;
function hash_add(n)
{
	var pos=n%hash.length;
	if(hash[pos])
	{
		while(hash[pos])
		{
			if(hash[pos]==n)return;
			pos++;
			(pos==hash.length) && (pos=0);
		}
		hash[pos]=n;
	}else{
		hash[pos]=n;
	}
	count++;
	if(count==hash.length)
	{
		var arr=hash;
		hash=[];
		count=0;
		hash.length=arr.length*2;
		for(var i=0;i<arr.length;i++)
		{
			hash_add(arr[i]);
		}
	}
}
function hash_find(n)
{
	var pos=n%hash.length;
	if(!hash[pos])
	{
		return false;
	}else{
		if(hash[pos]==n)
		{
			return true;
		}else{
			while(hash[pos])
			{
				pos++;
				(pos==hash.length) && (pos=0);
				if(hash[pos]==n)return true;
			}
			return false;
		}
	}
}
hash_add(56); alert(hash);
hash_add(101); alert(hash);
hash_add(44); alert(hash);
hash_add(55); alert(hash);
hash_add(99); alert(hash);
hash_add(78); alert(hash);
hash_add(88); alert(hash);
alert(hash_find(55));


//大神的快速排序
// （1）在数据集之中，找一个基准点
// （2）建立两个数组，分别存储左边和右边的数组
// （3）利用递归进行下次比较
function quickSort(arr){
    if(arr.length<=1){
        return arr;//如果数组只有一个数，就直接返回；
    }

    var num = Math.floor(arr.length/2);//找到中间数的索引值，如果是浮点数，则向下取整

    var numValue = arr.splice(num,1);//找到中间数的值
    var left = [];
    var right = [];

    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);//基准点的左边的数传到左边数组
        }
        else{
           right.push(arr[i]);//基准点的右边的数传到右边数组
        }
    }

    return quickSort(left).concat([numValue],quickSort(right));//递归不断重复比较
}

alert(quickSort([32,45,37,16,2,87]));//弹出“2,16,32,37,45,87”
//二分法排序
var arr=[56,10,-100,300,90,8];

function mySort(arr,s,e){
    if(s>e){
        return [];
    }else if(s==e){
        return [arr[s]];
    }

    var c=Math.floor((s+e)/2);
    var left=mySort(arr,s,c);
    var right=mySort(arr,c+1,e);

    var result=[];

    while(left.length>0 || right.length>0){
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }

        if(left.length==0){
            result=result.concat(right);
            break;
        }else if(right.length==0){
            result=result.concat(left);
            break;
        }
    }
    return result;
}

alert(mySort(arr,0,arr.length-1));


//自己写的排序函数
function mySort(arr)
{
	// 排序
	for (var i=0; i<arr.length; i++)
	{
		// 找最小数
		var nMinIndex=findMinIndex(i, arr);
		// 换位置
		var tmp=arr[i];
		arr[i]=arr[nMinIndex]
		arr[nMinIndex]=tmp;
	}
	return arr;
}	

//找最小值的下标
function findMinIndex(start, arr)
{
	var nMin=9999;
	var nMinIndex=-1;
	for (var i=start; i<arr.length; i++)
	{
		if (arr[i] < nMin)
		{
			nMin=arr[i];
			nMinIndex=i;
		}
	}
	return nMinIndex;
}


//2016.2.17
//事件绑定兼容函数 sEv：事件不带on； fn是执行函数
function addEvent(obj,sEv,fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv,function(ev){
			var oEvent=ev || event;
			var rd=fn.call(obj,oEvent);
			if(rd==false)
			{
				oEvent.stopPropagation();
				oEvent.preventDefault();
			}
		},false);
	}else{
		obj.attachEvent('on'+sEv,function(ev){
			var oEvent=ev || event;
			var rd=fn.call(obj,oEvent);
			if(rd==false)
			{
				oEvent.cancelBubble=true;
				return false;
			}
		});
	}
}

//解除事件绑定 fn要传命名函数的函数名
function removeEvent(obj,sEv,fnName){
	if(obj.removeEventListener)
	{
		obj.removeEventListener(sEv,fnName,false);
	}else{
		obj.detachEvent('on'+sEv,fnName);
	}
};


//2016.2.19
//滚轮事件兼容版封装
function addWheel(obj,fn)
{	
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
	{
		obj.addEventListener('DOMMouseScroll',function (ev){
			if(ev.detail > 0)
			{
				fn(true);
			}else{
				fn(false);
			}
		},false);
	}else{
		obj.onmousewheel=function(){
			if(event.wheelDelta > 0)
			{
				fn(false);
			}else{
				fn(true);
			}
		};
	}
}	
//获取连接的参数
function hrefData(name)
{
	var str=window.location.href;
    var arr=str.substring(str.indexOf('?')+1).split('&');
    for(var i=0;i<arr.length;i++)
    {
    	var arr2=arr[i].split('=');
    	if(arr2[0] == name)
    	{
    		return arr2[1];
    	}
    }
    return '';
}

//reday事件封装 结构加载玩就执行
function ready(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete')
			{
				fn && fn();
			}
		});
	}
}

// 碰撞检测 obj1是拖拽对象 obj2是被碰撞对象
function collTest(obj1,obj2)
{
	var l1=obj1.offsetLeft;
	var r1=l1+obj1.offsetWidth;
	var t1=obj1.offsetTop;
	var b1=t1+obj1.offsetHeight;
	
	var l2=obj2.offsetLeft;
	var r2=l2+obj2.offsetWidth;
	var t2=obj2.offsetTop;
	var b2=t2+obj2.offsetHeight;
	if(l2>r1 || l1>r2 || t2>b1 || t1>b2)
	{
		return false;
	}else{
		return true;
	}
	/*var r2=obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth;
	var b2=obj2.offsetTop+obj2.offsetHeight+obj1.offsetHeight;
	if(r2>=r1 && r1>=l2 && b2>=b1 && b1>=t2)
	{
		return true;
	}else{
		return false;
	}*/
}


//2016.2.24
//匀速  加速 减速运动
//json可以传要改变的样式
//options是一个json可以传时间 匀速  加速 减速和完成后的函数
function move(obj,json,options)
{
	options=options || {};
	var duration=options.duration || 1000;
	var easing=options.easing || Tween.Linear;
	
	var n=0;
	var count=Math.floor(duration/30);
	var start={};
	var dis={};
	for(var name in json)
	{
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=parseFloat(json[name])-start[name];
	}
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json)
		{
			var cur=easing(n/count*duration,start[name],dis[name],duration);
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count)
		{
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	},30);
}

//t  当前时间
//b  初始值
//c  总距离
//d  总时间
//var cur=fx(t,b,c,d)
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}

//cookie
//可以储存用户的帐号密码不用频繁登陆
function addCookie(name, value, iDay)
{
    if(iDay){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+'; path=/; expires='+oDate.toUTCString();
    }else{
        document.cookie=name+'='+value+'; path=/;';
    }
}
function getCookie(name)
{
    var arr=document.cookie.split('; ');
    // [a=12, b=5, c=8];
    for(var i=0; i<arr.length; i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
function removeCookie(name){
    addCookie(name, 'abc', -1);
}


//角度转弧度
function a2b(a)
{
	return Math.PI*a/180;
}

//控制iframe高度
function dyniframesize() {  
    dyniframe= document.getElementById('checkListFrame');  
    if (dyniframe && !window.opera) {  
        if (dyniframe.contentDocument && dyniframe.contentDocument.body.offsetHeight)  //ie,firefox,chrome,opera,safari
            dyniframe.height = dyniframe.contentDocument.body.offsetHeight;  
        else if (dyniframe.Document && dyniframe.Document.body.scrollHeight) //ie自有属性 
            dyniframe.height = dyniframe.Document.body.scrollHeight;  
    }   
}  
if(window.addEventListener)
{
    window.addEventListener('load',dyniframesize,false);
    window.addEventListener('resize',dyniframesize,false);
}else if(window.attachEvent){
    window.attachEvent('onload',dyniframesize);
    window.attachEvent('onresize',dyniframesize);
}

function trigger(el,sEv,arg){//事件触发函数 trigger(aTab[1],'touchstart');
	if (window.CustomEvent) {
	  var event = new CustomEvent(sEv, arg);
	} else {
	  var event = document.createEvent(sEv);
	  event.initCustomEvent('custom-event', true, true, arg);
	}
	el.dispatchEvent(event);
}
function autoTextarea(elem, extra, maxHeight) {//自适应高度textarea
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function (type, callback) {
                    elem.addEventListener ?
                            elem.addEventListener(type, callback, false) :
                            elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];

                    if (name === 'height' && val.search(/px/i) !== 1) {
                            var rect = elem.getBoundingClientRect();
                            return rect.bottom - rect.top -
                                    parseFloat(getStyle('paddingTop')) -
                                    parseFloat(getStyle('paddingBottom')) + 'px';        
                    };

                    return val;
            } : function (name) {
                            return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));

    elem.style.resize = 'none';

    var change = function () {
            var scrollTop, height,
                    padding = 0,
                    style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                            height = maxHeight - padding;
                            style.overflowY = 'auto';
                    } else {
                            height = elem.scrollHeight - padding;
                            style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
            };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
}
!function(){//可以报错
	throw new Error('Missing parameter');
}();
//trigger  模拟jq的  事件调用方法
Element.prototype.trigger = function (type, data) {
　　var event = document.createEvent('HTMLEvents');
　　event.initEvent(type, true, true);
　　event.data = data || {};
　　event.eventName = type;
　　event.target = this;
　　this.dispatchEvent(event);
　　return this;
};
NodeList.prototype.trigger = function (event) {
　　[]['forEach'].call(this, function (el) {
　　　　el['trigger'](event);
　　});
　　return this;
};
//或
function trigger(el,sEv,arg){//事件触发函数 trigger(aTab[1],'touchstart');
	if (window.CustomEvent) {
	  var event = new CustomEvent(sEv, arg);
	} else {
	  var event = document.createEvent(sEv);
	  event.initCustomEvent('custom-event', true, true, arg);
	}
	el.dispatchEvent(event);
}
//模拟ES6的Object.is()  方法 
//和 === 的不同  Object.is(+0, -0) // false  Object.is(NaN, NaN) // true
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
//面试题
(function(){
	var x=10;
	var foo={
		x:30,
		bar:function(){
			var x=20;
			return this;
		}
	};
	//alert((foo.bar = foo.bar)());赋值表达式输出 值 this -> window
	//alert(foo.bar());this -> foo
})();
(function(){
	['1','2','3'].map(parseInt);//[1,NaN,NaN]
	parseInt()有两个参数第二个是 多少进制
	map 传三个参数  数值 index 数组本身
})();
(function(){
	if(!('b' in window)){
        var b=1;
    }
    console.log(b);//undefined
    var va=5;
    function va(){
        return 1;
    }
    console.log(typeof va);//number

    function va2(){
        return 1;
    }
    var va2;
    console.log(typeof va2);//function
    function A(c){
        this.c=c;
    }
    A.prototype.c=1;
    console.log(new A(2).c);//2
})();

(function(){
	for(var i=0;i<5;i++){
        setTimeout(function(){
            console.log(new Date(),i);
        },1000);
    }
    console.log(new Date(),i);
    //先输出一个 Fri Mar 24 2017 15:36:56 GMT+0800 (中国标准时间) 5
   	//然后输出5个
   	for(let i=0;i<5;i++){
        setTimeout(function(){
            console.log(new Date(),i);
        },1000);
    }
    console.log(new Date(),i);
    //先报错 i is not defined 
    //然后输出Fri Mar 24 2017 15:36:56 GMT+0800 (中国标准时间)  0
    //															...
    //															5
})();
(function(){
	var num=5;
	if(num == 5,false){//,表达式取最后的值 就是false
		console.log(1);
	}
	if(num == 8,false,true){//true

	}
})();
(function(){
	var A = {n: 999};
	var B = function(){ this.n = 888;};
	var C = function(){ var n = 666;};
	B.prototype = A ;
	C.prototype = A ;
	var b = new B();
	var c = new C();
	A.n ++;
	console.log(b.n);//888
	console.log(c.n);//1000
	
	B的this.n是自有属性，在没作为构造函数之前，默认this为window，所以直接运行B()，会undefined，
	C中n是变量，非属性。后面修改了B,C的原型，指向对象为A，从而继承了A的n。之后实例化了b,c，b中的this指向B，运行了A.n++,A.n为1000。
	此时在查找b.n和c.n。优先查找自有属性，若无，则往原型链方向找。所以b.n为888，c无n属性，则指向A.n。此时delete b.n，再输出b.n，为4400

})();
(function() {
	var a = 'test';
	a.len = 4;
	var b = a.len;//undefined

	字符串并不是对象 为什么会有属性呢？ 
	只要引用了字符串a 的属性 js就会通过new String(a) 的方法转换成对象 这个对象继承了字符串的方法 ，并用来处理属性的引用 一旦引用结束就会销毁这个对象

	数字 布尔值 也是这样；
})();