/**
 *  @ Date: 2016/3/28.
 */
 'use strict';
//ZQuery
function ZQuery(arg)
{
	this.ele=[];
	this.domString='';
	switch(typeof arg)
	{
		case 'function':
			domReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')!=-1)
			{
				this.domString=arg;
			}else{
				this.ele=getEle(arg);
				this.length=this.ele.length;
			}
			break;
		default://this document 数组
			if(arg instanceof Array){
				this.ele=arg;
			}else{
				this.ele.push(arg);	
			}
			break;
	}
	for(var i=0;i<this.ele.length;i++) {
		this[i] = this.ele[i];
	}
}
function $(arg)
{
	//if ( window == this ) 先mark下来
	return new ZQuery(arg);
}
//方法
//css
ZQuery.prototype.css=function(name,value){
	if(arguments.length==1)
	{
		if(typeof name=='string')
		{//获取
			return getStyle(this.ele[0],name);
		}else{//批量设置
			var json=name;
			this.each(function(index){
				for(var name in json)
				{
					this.style[name]=json[name];
				}
			});
		}
	}else if(arguments.length==2){
		this.each(function(index){
			this.style[name]=value;
		});
	}
	return this;
};
//attr
ZQuery.prototype.attr=function(name,value){
	if(arguments.length==1)
	{
		if(typeof name=='string')
		{//获取
			return this.ele[0].getAttribute(name);
		}else{//批量设置
			var json=name;
			this.each(function(index){
				for(var name in json)
				{
					this.setAttribute(name,json[name]);
				}
			});
		}
	}else if(arguments.length==2){
		this.each(function(index){
			this.setAttribute(name,value);
		});
	}
	return this;
};
//each
ZQuery.prototype.each=function(fn){
	for(var i=0;i<this.ele.length;i++)
	{
		fn.call(this.ele[i],i,this.ele[i]);
	}
	return this;
};
//html
ZQuery.prototype.html=function(str){
	if(arguments.length)
	{
		this.each(function(index){
			this.innerHTML=str;
		});
		return this;
	}else{
		return this.ele[0].innerHTML;
	}
};
//val
ZQuery.prototype.val=function(str){
	if(arguments.length)
	{
		this.each(function(index){
			this.value=str;
		});
	}else{
		return this.ele[0].value;
	}
	return this;
};
//addClass
ZQuery.prototype.addClass=function(sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	this.each(function(index){
		if(this.className)
		{
			if(!reg.test(this.className))
			{
				this.className+=' '+sClass;
			}
		}else{
			this.className=sClass;
		}
	});
	return this;
};
//removeClass
ZQuery.prototype.removeClass=function(sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	this.each(function(index){
		if(reg.test(this.className))
		{
			this.className=this.className.replace(reg,'').replace(/^\s+|\s+&/g,'').replace(/\s+/g,' ');
		}
	});
	return this;
};
//hasClass
ZQuery.prototype.hasClass=function(sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	return reg.test(this.ele[0].className);
};
//toggleClass
ZQuery.prototype.toggleClass=function(sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	this.each(function(index){
		if(reg.test(this.className))
		{
			this.className=this.className.replace(reg,'').replace(/^\s+|\s+&/g,'').replace(/\s+/g,' ');
		}else{
			if(this.className)
			{
				if(!reg.test(this.className))
				{
					this.className+=' '+sClass;
				}
			}else{
				this.className=sClass;
			}
		}
	});
	return this;
};
/*
*基本事件
*/
'click mouseover mouseout mousemove mousedown mouseup contextmenu resize load error forcus blur scroll'.replace(/\w+/g,function(sEv){
	ZQuery.prototype[sEv]=function(fn){
		this.each(function(){
			addEvent(this,sEv,fn);
		});
		return this;
	};
});
//hide
ZQuery.prototype.hide=function(){
	this.css('display','none');
	return this;
};
//show
ZQuery.prototype.show=function(){
	this.css('display','block');
	return this;
};
//index
ZQuery.prototype.index=function(){
	var aStr=this.ele[0].parentNode.children;
	for(var i=0;i<aStr.length;i++)
	{
		if(aStr[i]==this.ele[0])return i;
	}
	return this;
};
//eq
ZQuery.prototype.eq=function(index){
	return $(this.ele[index]);
};
//get
ZQuery.prototype.get=function(index){
	return this.ele[index];
};
//animate
ZQuery.prototype.animate=function(json,options){
	this.each(function(index){
		move(this,json,options);
	});
	return this;
};
/*
*DOM
*/
//appendTo
ZQuery.prototype.appendTo=function(str){
	var aParent=getEle(str);
	for(var i=0;i<aParent.length;i++)
	{
		aParent[i].insertAdjacentHTML('beforeEnd',this.domString);
	}
	return this;
};
//prependTo
ZQuery.prototype.prependTo=function(str){
	var aParent=getEle(str);
	for(var i=0;i<aParent.length;i++)
	{
		aParent[i].insertAdjacentHTML('afterBegin',this.domString);
	}	
	return this;
};
//insertBefore
ZQuery.prototype.insertBefore=function(str){
	var aParent=getEle(str);
	for(var i=0;i<aParent.length;i++)
	{
		aParent[i].insertAdjacentHTML('beforeBegin',this.domString);
	}
	return this;
};
//insertAfter
ZQuery.prototype.insertAfter=function(str){
	var aParent=getEle(str);
	for(var i=0;i<aParent.length;i++)
	{
		aParent[i].insertAdjacentHTML('afterEnd',this.domString);
	}
	return this;
};
//remove
ZQuery.prototype.remove=function(){
	this.each(function(){
		this.parentNode.removeChild(this);
	});
	return this;
};
/*
*其它事件
*/
ZQuery.prototype.mouseenter=function(fn){
	this.mouseover(function(ev){
		var oSrc=ev.fromElement || ev.relatedTarget;
		if(!this.contains(oSrc))
		{
			fn.call(this,ev);
		}
	});
	return this;
};
ZQuery.prototype.mouseleave=function(fn){
	this.mouseout(function(ev){
		var oSrc=ev.toElement || ev.relatedTarget;
		if(!this.contains(oSrc))
		{
			fn.call(this,ev);
		}
	});
	return this;
};
ZQuery.prototype.hover=function(fnOver,fnOut){
	this.mouseenter(fnOver).mouseleave(fnOut);
	return this;
};
ZQuery.prototype.toggle=function(){
	var arg=arguments;
	this.each(function(){
		this.n=0;
	});
	this.click(function(){
		arg[this.n%arg.length].apply(this,arguments);
		this.n++;
	});
	return this;
};
ZQuery.prototype.find=function(str){
	return $(getEle(str,this.ele));
};

//ajax jsonp
$.ajax=function(options){
	ajax(options);
};

//插件机制
$.fn=ZQuery.prototype;
$.fn.extend=function(json){
	for(var name in json)
	{
		ZQuery.prototype[name]=json[name];
	}
};
//公共函数
function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
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
function getStyle(obj,name)
{
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function domReady(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete')
			{
				fn && fn();
			}
		});
	}
}
function getByClass(obj,sClass)
{
	if(obj.getElementsByClassName)
	{
		return obj.getElementsByClassName(sClass);
	}else{
		var arr=[];
		var aEle=obj.getElementsByTagName('*');
		var reg=new RegExp('\\b'+sClass+'\\b');
		for(var i=0;i<aEle.length;i++)
		{
			if(reg.test(aEle[i].className))
			{
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
function getByStr(aParent,str)
{
	var aChild=[];
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var aEle=getByClass(aParent[i],str.substring(1));
				for(var j=0;j<aEle.length;j++)
				{
					aChild.push(aEle[j]);
				}
				break;
			default:
				if(/\w+>\w+/.test(str))
				{
					var aStr=str.split('>');
					var aEle=aParent[i].getElementsByTagName(aStr[0]);
					for(var j=0;j<aEle.length;j++)
					{
						for(var k=0;k<aEle[j].children.length;k++)
						{
							if(aEle[j].children[k].tagName.toLowerCase()==aStr[1])
							{
								aChild.push(aEle[j].children[k]);
							}
						}
					}
				}else if(/\w+\[\w+=\w+\]/.test(str))
				{
					var aStr=str.split(/\[|=|\]/);
					var aEle=aParent[i].getElementsByTagName(aStr[0]);
					for(var j=0;j<aEle.length;j++)
					{
						if(aEle[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(aEle[j]);
						}
					}
				}else if(/\w+:\w+(\(\d+\))?/.test(str))
				{
					var aStr=str.split(/\:|\(|\)/);
					var aEle=aParent[i].getElementsByTagName(aStr[0]);
					switch(aStr[1])
					{
						case 'first':
							aChild.push(aEle[0]);
							break;
						case 'last':
							aChild.push(aEle[aEle.length-1]);
							break;
						case 'eq':
							aChild.push(aEle[aStr[2]]);
							break;
						case 'lt':
							for(var j=0;j<aStr[2];j++)
							{
								aChild.push(aEle[j]);
							}
							break;
						case 'gt':
							for(var j=aStr[2]+1;j<aEle.length;j++)
							{
								aChild.push(aEle[j]);
							}
							break;
						case 'odd':
							for(var j=1;j<aEle.length;j+=2)
							{
								aChild.push(aEle[j]);
							}
							break;
						case 'even':
							for(var j=0;j<aEle.length;j+=2)
							{
								aChild.push(aEle[j]);
							}
							break;
					}
				}else{
					var aEle=aParent[i].getElementsByTagName(str);
					for(var j=0;j<aEle.length;j++)
					{
						aChild.push(aEle[j]);
					}
				}
				break;
		}
	}
	return aChild;
}
function getEle(str,aParent)
{
	var arr=str.replace(/^\s+|\s+$/g,'').split(/\s+/);
	var aParent=aParent || [document];
	var aChild=[];
	for(var i=0;i<arr.length;i++)
	{
		aChild=getByStr(aParent,arr[i]);
		aParent=aChild;
	}
	return aChild;
}
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
				obj.style[name]=cur;
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