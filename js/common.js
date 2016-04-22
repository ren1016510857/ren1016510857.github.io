//版权 北京智能社©, 保留所有权利

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
function getByClass(oParent, sClass)
{
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
	return 'rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
}
//补零函数
function toDub(n)
{
	return n<10 ? '0'+n : ''+n;
}

//获取行间样式
function getStyle(obj,sName)
{
	return (obj.currentStyle || getComputedStyle(obj,false))[sName];
}


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
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEv,fn);
	}else{
		obj.addEventListener(sEv,fn,false);
	}
};

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

//reday事件封装
function ready(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.onreadystatechange=function(){
			if(document.readyState == 'complete')
			{
				fn();
			}
		};
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

//版权 北京智能社©, 保留所有权利
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