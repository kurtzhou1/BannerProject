(function($) {
	"use strict";
  
	var ModuleName = "banner";
	//設定模組名稱，與HTML相同
	var Module = function(ele, options) {
	  this.ele = ele;
	  this.$ele = $(ele);
	  this.option = options;
	  this.$btn = $('<div class="' + options.button.class + '"></div>');
	  this.statusCycle = ["closed", "opening", "opened", "closing"];
	  this.status = 0; // 0:closed, 1:opening, 2:opened, 3:closing
	};
	//設定模組屬性(Moudle為建構函數)，ele、options為參數
	Module.DEFAULT = {
	  style: "classname",
	  openAtStart: true,
	  autoToggle: true,
	  button: {
		closeText: "收合", // [string]
		openText: "展開", // [string]
		class: "btn" // [string]
	  },
	  // 設定模組在各狀態時的class
	  class: {
		closed: "closed", // [string]
		closing: "closing", // [string]
		opened: "opened", // [string]
		opening: "opening" // [string]
	  },
	  // 是否要有transition效果
	  transition: true,
	  // 當有transition時，要執行的callback function
	  whenClickCallback: function() {
		console.log("whenClickCallback");
	  }
	};
	//Default，預設參數
  
	Module.prototype.init = function() {
	  $(".wrap").append(this.$btn);
	  var Toggle = typeof this.option.autoToggle;
	if(this.option.transition){
	  if (Toggle === "boolean") {
		if (this.option.autoToggle) {
		  if (this.option.openAtStart) {
			this.open();
			setTimeout(() => {
			  this.clean();
			  this.close();
			}, 1000);
		  } else {
			this.close();
			setTimeout(() => {
			  this.clean();
			  this.open();
			}, 1000);
		  }
		} else {
		  if (this.option.openAtStart) {
			this.open();
		  } else {
			this.close();
		  }
		}
	  } else if (Toggle === "number") {
		var Second = this.option.autoToggle;
		if (this.option.openAtStart) {
		  this.Topen();
		  setTimeout(() => {
			this.clean();
			this.close();
		  }, Second);
		} else {
		  this.Tclose();
		  setTimeout(() => {
			this.clean();
			this.open();
		  }, Second);
		}
	  } else {
		alert("ERROR!!!!!");
	  }
	}else{
		this.nomove();
		if (Toggle === "boolean") {
			if (this.option.autoToggle) {
			  if (this.option.openAtStart) {
				this.Topen();
				setTimeout(() => {
				  this.clean();
				  this.Tclose();
				}, 1000);
			  } else {
				this.Tclose();
				setTimeout(() => {
				  this.clean();
				  this.Topen();
				}, 1000);
			  }
			} else {
			  if (this.option.openAtStart) {
				this.Topen();
			  } else {
				this.Tclose();
			  }
			}
		  } else if (Toggle === "number") {
			var Second = this.option.autoToggle;
			if (this.option.openAtStart) {
			  this.Topen();
			  setTimeout(() => {
				this.clean();
				this.Tclose();
			  }, Second);
			} else {
			  this.Tclose();
			  setTimeout(() => {
				this.clean();
				this.Topen();
			  }, Second);
			}
		  } else {
			alert("ERROR!!!!!");
		  }
		}
	}

	Module.prototype.move = function() {
	  var self = this;
	  $(".btn").click(function() {
		  console.log('status', self.status)
		if (!self.option.transition) {		
			var T2 = 0;
		  }else{
			var T2 = 1000;
			var timer2 = setInterval(function() {
				self.option.whenClickCallback()
			}, 100)
			
		}
		if (self.status === 2 || self.status ===  3) {
			setTimeout(() => {
				self.Tclose();
				self.clean();
				$('.banner').addClass('closing');
				}, 0);
				
				setTimeout(() => {
				self.clean();
				$('.banner').addClass('closed');
				self.status = 0;
				}, T2);
		} else if (self.status === 0 || self.status === 1) {
			setTimeout(() => {
				self.Topen();
				self.clean();
				$('.banner').addClass('opening');
				}, 0);
	
				setTimeout(() => {
				self.clean();
				$('.banner').addClass('opened');
				self.status = 2;
				}, T2);
		}
		// if (self.option.transition){
		// 	if(self.status === 0 || self.status === 2){
		// 		alert('123')
		// 		clearInterval(timer2);
		// 		// alert()
		// }

		// }

	  });
	};
  
	//   Module.prototype.toggle = function() {
	// this.clearTimer();
	// this.addTransition();
	//     if (this.status === 2) {
	//       alert("2");
	//       this.close();
	//     } else if (this.status === 0) {
	//       alert("0");
	//       this.open();
	//     }
	//     this.timer = setInterval(this.option.whenTransition, 25);
	//   };

	Module.prototype.clearTimer = function () {
		clearInterval(this.timer);
		clearTimeout(this.timer);
	};

	Module.prototype.open = function() {
		// alert('open')
		this.$btn.text(this.option.button.closeText);
		this.status = 3;
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass(this.nextStatus()));
		$(".banner").removeClass("closed").addClass("opened");
	};
  
	Module.prototype.close = function() {
		this.$btn.text(this.option.button.openText);
		this.status = 1;
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass());
		$(".banner").removeClass("opened").addClass("closed");
	};

	Module.prototype.Topen = function() {
		this.$btn.text(this.option.button.closeText);
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass(this.nextStatus()));
		$(".banner").addClass("opened");
	};
  
	Module.prototype.Tclose = function() {
		this.$btn.text(this.option.button.openText);
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass());
		$(".banner").addClass("closed");
	};

  
	Module.prototype.clean = function() {
	  $(".banner").removeClass("opened closed opening closing");
	};
	Module.prototype.nomove = function() {
	  $(".banner").css("transition", "all 0s");
	  $(".img").css("transition", "all 0s");
	};
  
	// Module.prototype.addTransition = function() {
	//   if (this.option.transition && !this.$ele.hasClass("transition")) {
	// 	this.$ele.addClass("transition");
	//   }
	// };


  
	Module.prototype.transitionEnd = function () {
		if (!this.option.transition) {
			var T1 = 0;
			var T2 = 0;
		  }else{
			var T1 = 1000;
			var T2 = 1200;
		  }
		
		if (this.status === 1 ){
			setTimeout(() => {
			this.clean();
			$('.banner').addClass('opening');
			}, T1);

			setTimeout(() => {
			this.clean();
			$('.banner').addClass('opened');
			this.status = 2;
			}, T2);
		} else if
		 (this.status === 3){
			setTimeout(() => {
			this.clean();
			$('.banner').addClass('closing');
			}, T1);
			
			setTimeout(() => {
			this.clean();
			$('.banner').addClass('closed');
			this.status = 0;
			}, T2);
		}
	};
  
	//   Module.prototype.matchStatusClass = function(status) {
	//     return this.option.class[this.statusCycle[status]];
	//   };
	//function區

	$.fn[ModuleName] = function(options) {
	  console.log("this in FN", this);
	  return this.each(function() {
		//.fn[ModuleName] 等同於 .fn.ModuleName
		console.log("module", module);
		var $this = $(this);
		var module = $this.data(ModuleName);
		var opts = null;
		if (!!module) {
		  console.log("!!module");
		  console.log("typeof options", typeof options)
		//   if (typeof options === "string" && typeof options2 === "undefined") {
		  if (typeof options === "string") {
			module[options]();
		  } else {
			console.log("unsupported options!");
			throw "unsupported options!";
		  }
		} else {
		  console.log("!!else");
		  opts = $.extend(
			{},
			Module.DEFAULT,
			// typeof methods === "object" && methods,
			typeof options === "object" && options
		  );
		  // Object.assign
		  console.log("this in Else", this);
		  module = new Module(this, opts);
		  $this.data(ModuleName, module);
		  console.log("module", module);
		  module.init();
		  //module.move();
		  // if(module.option.autoToggle){
		  module.move();
		  module.transitionEnd();
		  // }
		}
	  });
	};
  })(jQuery);
  
  //需要init
  
