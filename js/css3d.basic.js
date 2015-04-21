(function(){
	angular.module('myapp',[])
	.controller('MainController',['$scope',function(s){
		s.freeman=true;
		s.l = {r: {x: 0,y: 0,s:1},t: {x: 0,y: 0,z: -500,s:20}};
		var c = document.documentElement.style;
		s.prefix=void 0 !== c.WebkitTransform && "-webkit-" || void 0 !== c.MozTransform && "-moz-" || void 0 !== c.transform && "";
		var a;
		s.updateR=function(b){	
			 !b.altKey && a && (s.l.r.x -= (b.pageY - a.y)*s.l.r.s, s.l.r.y += (b.pageX - a.x)*s.l.r.s, s.l.r.x = Math.max(Math.min(s.l.r.x, 90), -90));
		  a = {
			x: b.pageX,
			y: b.pageY,
		  };		  
		};	
		s.keyDown=function(c){		
			  var f = "keydown" == c.type;
			  switch (c.keyCode) {
				case 87: //up 
				  x=s.l.t.x-s.l.t.s * cos(s.l.r.y - 90);
				  z=s.l.t.z-s.l.t.s * sin(s.l.r.y - 90);
				  	  
				  break;
				case 83: //down              
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 90);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 90);
				  break;
				case 65: //left              
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y);
				  break;
				case 68: //right               
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 180);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 180);
				  break;
				case 32: //jumb
				  //			 		  
			  }			  
			  s.l.t.x = x;s.l.t.z = z;		
			  
		};
	}]);
	
	
	var map = function(o){
		return {x:parseInt(-o.x/10+canvas.width/2),z:parseInt(canvas.height/2-o.z/10)}
	};
	
	var cos = function(deg){
		return Math.cos(rad(deg));
	};
	var sin = function(deg){
		return Math.sin(rad(deg));
	};
	var rad=function(deg){
		return deg*Math.PI/180;
	};
	
	
	
	

	
	
	
}());

