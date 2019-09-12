(function($) {
	'use strict';
	
		var ModuleName = 'banner';
//設定模組名稱，與HTML相同
		var Module = function ( ele, options ) {
			this.ele = ele;
			this.$ele = $(ele);
			this.option = options;
		};
//設定模組屬性(Moudle為建構函數)，ele、options為參數
		Module.DEFAULT = {
			style: 'classname',
			openAtStart: true,
			autoToggle: true,
			whenClickCallback: function() {
				console.log('whenClickCallback');
			}
		};
//Default，預設參數
		Module.prototype.init = function(){
			$('.wrap').append("<p class=" + "btn"+">收合</p>");	
			console.log('this123', this)
			if (this.option.openAtStart){
				this.open();
			}else{
				this.close();
			}
			
			if (this.option.autoToggle) {
				if(this.option.openAtStart){
					// setTimeout(this.close(), 3000);
					this.close();
				}else{
				this.open();
				}
			}
		};
		Module.prototype.move = function(){
			$('.btn').click(function(){
				$('.banner').toggleClass('close');
		})
		};

		Module.prototype.open = function(){
		
			setTimeout(() => {
			$('.banner').removeClass('close');
			}, 1000);
		};
		Module.prototype.close = function(){

			setTimeout(() => {
			$('.banner').addClass('close');
			}, 1000);
		};
		

		//Default的值
		Module.prototype.func = function () {
			console.log('this is a prototype function!!!');
		};
	
		Module.prototype.func1 = function (option) {
			console.log('this is a prototype function1!!!');
			console.log(option);
		};
	//function區
		
		$.fn[ModuleName] = function ( methods, options ) {
			console.log('this in FN', this)
			return this.each(function(){
	//.fn[ModuleName] 等同於 .fn.ModuleName			
				console.log('module', module)
				var $this = $(this);
				var module = $this.data( ModuleName );
				var opts = null;
				if ( !!module ) {
					console.log("!!module")
					if ( typeof options === 'string' &&  typeof options2 === 'undefined' ) {
						module[options]();
					} else if ( typeof options === 'string' &&  typeof options2 === 'object' ) {
						module[options](options2);
					} else {
						console.log('unsupported options!');
						throw 'unsupported options!';
					}
				} else {
					console.log('!!else')
					opts = $.extend( {}, Module.DEFAULT, ( typeof methods === 'object' && methods ), ( typeof options === 'object' && options ) );
					// Object.assign
					console.log('this in Else', this)
					module = new Module(this, opts);
					$this.data( ModuleName, module );
					console.log('module', module);
					module.init();
					module.move();
					// if(module.option.autoToggle){
					// 	module.move()
					// }

				}
			});
		};
	
	})(jQuery);
	
	//需要init