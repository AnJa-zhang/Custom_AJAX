(function($) {

	'use strict'

	var customAjax = $.ajax;

	//使用方法如下：
	//1.设置shortHandModel属性为TRUE，使用简写模式，选择性提供custom_success方法以及custom_fail方法。
	//2.不设置shortHandModel属性或者设置shortHandModel属性为FALSE，使用正常模式。
	$.ajax = function(options){

		//定义常用的回调函数；
		var fn = {

			then : function(resp, context){
				if( resp.result === 'success') {
					options.custom_success&&options.custom_success(context);
				}else{
					this.fail();
				}
			},
			fail : function(){
				if(options.custom_fail){
					options.custom_fail();
				}else{
					if(!alert_Message){
					    var alert_Message = new ala.litMessage;
					    alert_Message.init({
					        autohide: true,
					        duration : 3000,
					        size :"small"
					    });
					}
					alert_Message.show('网络有点问题，等下再试试看吧。','failure');
				}
			}
		};

		//判断是否处于简写模式，是则直接调用；
		if(options.shortHandModel){
			return customAjax(options).then(function(resp){
				fn.then.call(this,resp);
			}).fail(function(){
				fn.fail.call(this);
			});
		}
		return customAjax(options);
	};

})(jQuery);
