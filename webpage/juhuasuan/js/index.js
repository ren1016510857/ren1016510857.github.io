// <!--聚划算-->
//设置字体的大小
(function(win,doc){
    win.onload=win.onresize=function(){
        doc.documentElement.style.fontSize=20*doc.documentElement.clientWidth/320+'px'
    };
})(window,document);