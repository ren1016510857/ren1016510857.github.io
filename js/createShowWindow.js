// JavaScript Document

define(function (require, exports, module)
{
	var Common=require('common_pure.js');
	
	var Website=require('website.js');
	var Modular=require('modular.js');
	var Games=require('games.js');
	var WebQQ=require('webQQ.js');
	var Resume=require('resume.js');
	var About=require('about.js');
	
	module.exports={
		
		createShowWindow:	function (parent, top)
							{
								
								var oDiv=document.createElement('div');
								
								parent.appendChild(oDiv);
								
								top=top || 0;
								
								oDiv.className='showWindow';
								oDiv.style.position='absolute';
								oDiv.style.width='900px';
								oDiv.style.background='#fff';
								oDiv.style.left=180+'px';
								oDiv.style.marginTop=0;
								oDiv.style.top=top+'px';
								oDiv.style.overflow='hidden';
								oDiv.style.height=0;
								
								//记录导航内容
								oDiv.navCont=[];
								
								var sResume=	Resume.resume();
												
								var sWorks=		'<div class="allWorks">'+
												'<ul class="worklist">'+
    											/*'<li class="workItem">整站</li>'+*/
    											'<li class="workItem" class="workItem_anli"><img src="img/allWorks/anli.png" alt="" /><span>案例</span></li>'+
    											'<li class="workItem" class="workItem_youxi"><img src="img/allWorks/youxi.png" alt="" /><span>游戏</span></li>'+
    											'<li class="workItem"><img src="img/allWorks/Static Pages.png" alt="" /><span>静态页面</span></li>'+
												'<span class="worklist_tips">鼠标长按拖拽<br />鼠标单击显示<i></i></span>'+
    											'</ul>'+
												'</div>';
								
								var sAbout=	About.sAbout();
												
								var sWebSite=	'<div class="fullWebsite worksDetail">'+
												'<ul class="websiteList">'+
												'<li class="li"><span>新浪首页</span></li>'+
												'<li class="li"><span>360导航</span></li>'+
												/*'<li class="li"><span>天猫首页</span></li>'+
												'<li class="li"><span>京东首页</span></li>'+*/
												'</ul>'+
												'<div class="close"><span></span><i></i></div>'+
												'</div>';
							
								var sModular=	'<div class="modular worksDetail">'+
												'<ul class="mdCont">'+
												'</ul>'+
												'<div class="pages">'+
												'<a href="javascript:;"><</a>'+
												'<a href="javascript:;" class="active">1</a>'+
												'<a href="javascript:;">2</a>'+
												'<a href="javascript:;">></a>'+
												'</div>'+
												'<a href="javascript:;" class="prev"></a>'+
												'<a href="javascript:;" class="next"></a>'+
												'<div class="modular_goBack"><span></span><i></i></div>'+
												'<div class="close"><span></span><i></i></div>'+
												'<div class="modular_bg"></div>'+
												'</div>';
							
								var sGames=		'<div class="games worksDetail">'+
												'<div class="close"><span></span><i></i></div>'+	
												'<ul class="gameDire">'+
												'<h3>(一)游戏操作说明</h3>'+
												'<li>1.向上：<em></em>↑</li>'+
												'<li>2.向下：<em></em>↓</li>'+
												'<li>3.向左：<em></em>←</li>'+
												'<li>4.向右：<em></em>→</li>'+
												'<li>5.毁灭: <em></em>点击左下角炸弹按钮(收到炸弹后)</li>'+
												'<li>6.暂停：<em></em>空格键、点击左上角暂停按钮</li>'+
												'<li>7.退出：<em></em>点击右上角关闭按钮</li>'+
												'<h3>(二)兼容</h3>'+
												'<li class="txt_center">Chrome</li>'+
												'<li class="txt_center">Firefox</li>'+
												'<li class="txt_center">Safari</li>'+
												'<li class="txt_center">IE8.0+</li>'+
												/*
												'<h3></h3>'+
												'<li>bug：爆炸及飞行时图像频闪<br><span></span>预计解决办法：图片预加载</li>'+
												'<li><span></span></li>'+
												*/
												'</ul>'+
												'<ul class="gamesUl">'+
												'	<li class="plane gamesLi">'+
												'		<div class="progress"><p>已加载0%</p><span><span></div>'+
												'		<span class="title">打飞机</span>'+
												'		<div class="startGame">点击开始游戏</div>'+
												'		<div class="closeGame"><i></i></div>'+
												'		<div class="ask_if_quit">'+
                								'			<p>确定退出吗？</p>'+
                								'			<a href="javascript:;">退出游戏</a>'+
                								'			<a href="javascript:;">返回游戏</a>'+
           										'		</div>'+														
												'		<div class="ask_if_gameover">'+
												'			<a href="javascript:;">退出游戏</a>'+
												'			<a href="javascript:;">再来一次</a>'+
												'		</div>'+
												'		<ul class="play play_plane">'+
												'			<li class="hero"></li>'+
												'			<li class="bomb_icon"></li>'+
												'			<li class="pause"></li>'+
												'			<li class="loading"></li>'+
												'			<li class="score">0</li>'+
												'			<li class="bomb_number">×0</li>'+
												'		</ul>'+
												'	</li>'+
												'</ul>'+
												'</div>';
								
								var sWebQQ=		'<div class="webQQ worksDetail">'+
												'	<ul class="webQQ_ul">'+
												'		<li><a href="webpage/jd/index.html" target="_blank"><img src="img/webpage/jd.jpg" alt="" /><p>京东</p></a></li>'+
												'		<li><a href="webpage/Beautiful/index.html" target="_blank"><img src="img/webpage/mls.jpg" alt="" /><p>美丽说</p></a></li>'+
												'		<li><a href="webpage/Guokr/index.html" target="_blank"><img src="img/webpage/guoke.jpg" alt="" /><p>果壳</p></a></li>'+
												'		<li><a href="webpage/EchoOFSoul/index.html" target="_blank"><img src="img/webpage/lhhx.jpg" alt="" /><p>灵魂回响</p></a></li>'+												
												'		<li><a href="webpage/MonaLisa/index.html" target="_blank"><img src="img/webpage/mnls.jpg" alt="" /><p>蒙娜丽莎</p></a></li>'+
												'		<li><a href="webpage/juhuasuan/index.html" target="_blank"><img src="img/webpage/jhs.jpg" alt="" /><p>聚划算</p></a></li>'+
												'	</ul>'+
												'<div class="close"><span></span><i></i></div>'+
												'</div>';
					
								oDiv.innerHTML=sResume+	sWorks+ sAbout+ sModular+ sGames+ sWebQQ;//+ sWebSite;
								
								for(var i=0; i<oDiv.children.length; i++)
								{
									var child=oDiv.children[i];
									
									if(child.className.indexOf('fullWebsite')!=-1)
									{
										child.index='works0';
									}
									else if(child.className.indexOf('modular')!=-1)
									{
										child.index='works1';
									}
									else if(child.className.indexOf('games')!=-1)
									{
										child.index='works2';
									}
									else if(child.className.indexOf('webQQ')!=-1)
									{
										child.index='works3';
									}
								}
								
								//给close加事件
								var aClose=Common.getByClass(oDiv, 'close');
								var oWorks=Common.getByClass(oDiv, 'allWorks')[0];
								
								for(var i=0; i<aClose.length; i++)
								{
									(function (index)
									{
										Common.addEvent(aClose[i], 'click', function ()
										{
											Common.startMove(aClose[index].parentNode, {opacity: 0}, {time: 400, end: function ()
											{
												aClose[index].parentNode.style.display='none';
												
												oWorks.style.display='block';
												
												Common.startMove(oWorks, {opacity: 100});
											}});
										});
									})(i);
									
								}
								
								/*//控制website	
								Website.websiteAct();*/
								
								//控制modular
								Modular.modularAct();
								
								//games页面添加动作
								Games.games_act();
								
								//webQQ
								//WebQQ.webQQ_login_register();
								
								//我的简历
								Resume.resume_act();
								
								return oDiv;
							},
		
		};
});