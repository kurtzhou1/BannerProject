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
		  this.open();
		  setTimeout(() => {
			this.clean();
			this.close();
		  }, Second);
		} else {
		  this.close();
		  setTimeout(() => {
			this.clean();
			this.open();
		  }, Second);
		}
	  } else {
		alert("ERROR!!!!!");
	  }
  
	  if (!this.option.transition) {
		this.nomove();
	  }
	};
  
	Module.prototype.move = function() {
	  var self = this;
	  $(".btn").click(function() {
		self.clean();
		if (self.status === 2) {
		  self.close();
		} else if (self.status === 0) {
		  self.open();
		}
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
	// Module.prototype.open = function(){
	// 	$('.banner').addClass('opened');
	// };
	// Module.prototype.close = function(){
	// 	$('.banner').addClass('closed');
	// };
	Module.prototype.open = function() {
	  this.$btn.text(this.option.button.closeText);
	  this.status = 2;
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass(this.nextStatus()));
	  $(".banner").addClass("opened");
	  $(".img").css("top", "0px");
	//   console.log('OOOOO',this.matchStatusClass(this.status));
	//   console.log('NNNNN',this.nextStatus(this.status));
	//   console.log('BBBBB',this.matchStatusClass(this.nextStatus()));
	};
	//問問問問問問問問問問問問問問問問問問問問問問問問問問問問
  
	Module.prototype.close = function() {
	  this.$btn.text(this.option.button.openText);
	  this.status = 0;
	//   $(".banner").removeClass(this.matchStatusClass(this.status)).addClass(this.matchStatusClass());
	  $(".banner").addClass("closed");
	  $(".img").css("top", "-300px");

	};
	//問問問問問問問問問問問問問問問問問問問問問問問問問問問問
  
	Module.prototype.clean = function() {
	  $(".banner").removeClass("opened closed");
	};
	Module.prototype.nomove = function() {
	  $(".banner").css("transition", "all 0s");
	};
  
	Module.prototype.addTransition = function() {
	  if (this.option.transition && !this.$ele.hasClass("transition")) {
		this.$ele.addClass("transition");
	  }
	};

	Module.prototype.nextStatus = function () {
		this.status++;
		if (this.status > this.statusCycle.length - 1) {
			this.status = 0;
		}
		return this.status;
	};

	Module.prototype.matchStatusClass = function (status) {
		return this.option.class[this.statusCycle[status]];
		console.log('aaaaa',this.status)
	};
  
	//   Module.prototype.transitionEnd = function() {
	//     if (this.status === 1) {
	//       this.$ele
	//         .removeClass(this.matchStatusClass(this.status))
	//         .addClass(this.matchStatusClass(this.nextStatus()));
	//     } else if (this.status === 3) {
	//       this.$ele
	//         .removeClass(this.matchStatusClass(this.status))
	//         .addClass(this.matchStatusClass(this.nextStatus()));
	//     }
	//     this.clearTimer();
	//   };
	//   Module.prototype.clearTimer = function() {
	//     clearInterval(this.timer);
	//     clearTimeout(this.timer);
	//   };

  
	//   Module.prototype.matchStatusClass = function(status) {
	//     return this.option.class[this.statusCycle[status]];
	//   };
  
	//function區
	$.fn[ModuleName] = function(methods, options) {
	  console.log("this in FN", this);
	  return this.each(function() {
		//.fn[ModuleName] 等同於 .fn.ModuleName
		console.log("module", module);
		var $this = $(this);
		var module = $this.data(ModuleName);
		var opts = null;
		if (!!module) {
		  console.log("!!module");
		  if (typeof options === "string" && typeof options2 === "undefined") {
			module[options]();
		  } else if (
			typeof options === "string" &&
			typeof options2 === "object"
		  ) {
			module[options](options2);
		  } else {
			console.log("unsupported options!");
			throw "unsupported options!";
		  }
		} else {
		  console.log("!!else");
		  opts = $.extend(
			{},
			Module.DEFAULT,
			typeof methods === "object" && methods,
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
		  // }
		}
	  });
	};
  })(jQuery);
  
  //需要init
  
