(function(){
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');ctx.globalAlpha=0.5;
var keydown,mousemove,src;

angular.module('css3d',[]).controller('css3dController',['$scope',function(s){
	//s.room=[cubicleZone,floor,ceil,walls];
	s.freeman=false;
	s.isReady=false;
	s.l = {r: {x: 0,y: 0,s:0.75},t: {x: 0,y: 0,z:-225,s:20},c:{r:125,g:125,b:125}};
	var dstyle = document.documentElement.style;
	s.prefix=void 0 !== dstyle.WebkitTransform && "-webkit-" || void 0 !== dstyle.MozTransform && "-moz-" || void 0 !== dstyle.transform && "";
	var a;
	//var d={y:130};
	s.bc={rdy:130,bdy:130,rpy:0,bpy:0};
	
	s.mouseMove=function(e){		
		mousemove=e;
		//look(s,b);
	};
	s.dblClick=function(){
		s.hcontrol=!s.hcontrol;		
		cancelAnimFrame(animId);			
		keepgoing=true;s.animate();	
	}
	s.keyDown=function(c){
		if(s.hcontrol){			

			keydown=c;
			//walk(s,c);
		}		 
	};	
	s.keyUp = function(){		
		keydown=false;		
	}
	s.loadSurfaces = function(callback){
		var l=0;for(var k in s.surfaces){l++;}
		var loaded=1;		
		for(var k in s.surfaces){
			
			var surface = s.surfaces[k];			
			surface.img = new Image();
			surface.img.src = surface.map;
			surface.img.onload=function(){
				loaded++;if(loaded==l){
				s.surface=getSurface(s);
				s.loadCanvas(s.surface);
				callback();				
				}			
			}
		}			
	}
	s.loadCanvas = function(surface){
		s.surface = surface||{x:[-2.5,2.5],y:[0,5],z:[-2.5,2.5],width:5,height:5};
			ctx.clearRect(0,0,canvas.width,canvas.height);
		if(surface!=null){
			ctx.drawImage(s.surface.img,0,0,canvas.width,canvas.height);		
		}else{
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}		
		src = ctx.getImageData(0,0, canvas.width,canvas.height);
		s.isReady = true;	
	}
	s.update = function(){
		//find the surface
		//console.log('update....');
		if(!isOnsurface(s, s.surface)){
			console.log('out of  bounds.........');
			s.updateFloor(function(){});
			s.loadCanvas(getSurface(s));
		}		
		updateFP(s);
	}
	s.updateFloor = function(callback){
		console.log('updatefloor');
		for(var f in s.floors){
			var floor = s.floors[f];			
			if(floor.y*100<=s.l.t.y && s.l.t.y<floor.y*100+500){				
				if(!s.floor || floor.name!=s.floor.name){
					console.log({newflour:floor})
					s.floor=floor;	
					keepgoing=false;
					s.surfaces=floor.surfaces;
					s.loadSurfaces(function(){
						console.log('surfaces loaded..........................................');
						keepgoing=true;
						callback();
					});					
				}		
				break;			
			}
		}
	}	
	s.animate=function() {		
      if(keepgoing){
	 // console.log('animation....')
		animId= requestAnimFrame(s.animate);        
			if(!s.$$phase){
			s.$apply(function() {
				if(mousemove)
					look(s,mousemove);
				if(keydown)					
					walk(s,keydown);
				if(src)s.update();
			});       
		}
      }
    }    
	
}]).filter('fnumber', function() {
  return function(input, n) {   
    return Math.round(input || 0);
  };
}).filter('fangle', function() {
  return function(input, n) {   
    return Math.round(input % 360);
  };
});
var look = function(s,b){
	s.hcontrol && s.isReady && !b.altKey && a && (s.l.r.x -= (b.pageY - a.y)*s.l.r.s, s.l.r.y += (b.pageX - a.x)*s.l.r.s, s.l.r.x = Math.max(Math.min(s.l.r.x, 90), -90));
	a = {x: b.pageX,y: b.pageY,};		
	//s.update();
}
var walk = function(s,c){
	 var f = "keydown" == c.type;
		  switch (c.keyCode) {
			case 87:x=s.l.t.x-s.l.t.s * cos(s.l.r.y - 90); z=s.l.t.z-s.l.t.s * sin(s.l.r.y - 90);break;//up
			case 83:x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 90);z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 90);break;//down
			case 65:x = s.l.t.x+s.l.t.s * cos(s.l.r.y);z = s.l.t.z+s.l.t.s * sin(s.l.r.y); break;//left
			case 68:x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 180);z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 180);break;//right
			case 32: //jumb			  
		  }			  
			y = getY(x,z,s);					
			s.bc.rdy=y.r-s.l.t.y;
			s.bc.bdy=(y.b-s.l.t.y);
			if(s.freeman){
				s.l.t.x = x;	s.l.t.z = z;
			}else if(Math.abs(s.bc.rdy)<156){			
				s.l.t.x = x;s.l.t.z = z;s.l.t.y = y.r;			
			}else if(Math.abs(s.bc.bdy)<100){
				s.l.t.x = x;s.l.t.z = z;s.l.t.y = y.b;	
			}	
		// s.update();
}

var isOnsurface = function(sc,s){	
	x=-sc.l.t.x/100,z=-sc.l.t.z/100,y=sc.l.t.y/100;	
	return s.x[0] < x && x <= s.x[1] && s.z[0] < z && z <= s.z[1] && s.y[0]+sc.floor.y <=y && y< s.y[1]+sc.floor.y;
};
var getSurface = function(s){
	for(var k in s.surfaces){
		var surface = s.surfaces[k];
		//console.log({msg:'cecking the surface ',surface:surface});
		if(isOnsurface(s,surface)){
			console.log('surface found '+surface.map);
			return surface;
		}
	}
	console.log('no surface found');
	return null;
};
var map = function(o,s){
	return {
		x:Math.max(Math.min(Math.floor(-o.x*canvas.width/(s.surface.x[1]-s.surface.x[0])/100+canvas.width/2),canvas.width-1),0),
		z:Math.max(Math.min(Math.floor(canvas.height/2-o.z*canvas.height/(s.surface.z[1]-s.surface.z[0])/100),canvas.height-1),0)
		}
};


var cos = function(deg){return Math.cos(rad(deg));};
var sin = function(deg){return Math.sin(rad(deg));};
var rad = function(deg){return deg*Math.PI/180;};
var getk = function(x,y,width){return 4*(y*width+x);};
function getY(x,z,s){
	x=x+(s.surface.x[0]+(s.surface.x[1]-s.surface.x[0])/2)*100;
	z=z+(s.surface.z[0]+(s.surface.z[1]-s.surface.z[0])/2)*100;
	m=map({x:x,z:z},s); 	s.bc.m=m;
	i=getk(m.x,m.z,canvas.width);	
	s.bc.r=src.data[i];s.bc.b=src.data[i+2];
	s.bc.er=(s.bc.r-124)*5+0.001+(s.surface.y[0]+s.floor.y)*100;
	s.bc.eb=(s.bc.b-124)*5+0.001+(s.surface.y[0]+s.floor.y)*100;
	return {r:s.bc.er||0.1,b:s.bc.eb||0.1};
	};
var copyImageData=function(settings){var dst = settings.ctx.createImageData(settings.src.width, settings.src.height);dst.data.set(settings.src.data);return dst;};
function updateFP(s){		
	x=s.l.t.x+(s.surface.x[0]+(s.surface.x[1]-s.surface.x[0])/2)*100;	
	z=s.l.t.z+(s.surface.z[0]+(s.surface.z[1]-s.surface.z[0])/2)*100;
	th=s.l.r.y;
	m=map({x:x,z:z},s);var l=10;x2 = m.x+l*cos(th-90);z2 = m.z+l*sin(th-90);i=getk(m.x,m.z,canvas.width);ctx.putImageData(src,0,0);ctx.fillStyle='#afa';ctx.beginPath();ctx.arc(m.x,m.z,10,0,Math.PI*2,true);ctx.strokeStyle="#000";ctx.moveTo(m.x,m.z);ctx.lineTo(x2,z2);ctx.closePath();ctx.fill();ctx.stroke();
}
//construction functions.....
var each = function(data,fn){for(var key in data){if(fn(key,data[key])===false)break;}};
var extend = function(obj1,obj2){for(var key in obj2){obj1[key]=obj2[key];}return obj1};
function object3d(){this.name='object3d';this.t=[0,0,0];this.r=[0,0,0];}
function Plane(){this.xType='Plane';this.w=1;this.h=1;}Plane.prototype = new object3d;
function Container(){this.xType='Container';this.contains=[];}Container.prototype = new object3d;
css3dUtil={
	createPlane:function(options){return extend(new Plane(),options);},
	createContainer:function(options){return extend(new Container(),options);},	
}
}());

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
window.cancelAnimFrame =(function(){
	return window.cancelAnimationFrame	||
		 window.webkitCancelAnimationFrame ||
          window.mozkitCancelAnimationFrame    ||
		  function(id) {
            clearTimeout(id);
			};
})();
