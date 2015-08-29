(function(){
// x:859, y:20, z:-994, ry:287
angular.module('css3d').controller('myController',['$scope',function(s){  
	dropDownNodes = initDropDownNodes();
	s.$parent.freeman=false;
	s.$parent.l.t.x=859;
	s.$parent.l.t.z=-994;
	s.$parent.l.r.y=287;	
	
	s.$parent.floors=floors;
	s.$parent.updateFloor(function(){
		keepgoing=true;s.$parent.animate();
	});
	
	
	//animation states
	s.as={d1:{},dr:{},dl:{},ldr:[{},{},{}]};//to preserve all animationstates
	s.os={startNode:'liftroom0',endNode:'cubicle3',locateNode:'carridor_2'};
	
	animId=0;
	s.startNavigation = function(){			
		s.$parent.hcontrol=false;
		s.$parent.l.r.x=0;
		cancelAnimFrame(animId);
		nodes = findPath(s.os.startNode.name,s.os.endNode.name,0,[]).visited;		
		keepgoing = true;		   
		cnode = 0, step=0;
		stepLength=10;//1: veryslow 100
		animate(navigateImpl,function(){cnode++;if(cnode<nodes.length-2){ step=0; keepgoing=true;}});
	}
	s.locateNode = function(){	
		cancelAnimFrame(animId);
		s.$parent.hcontrol=false;
		console.log(s.os.locateNode)
		var p = nodeMap[s.os.locateNode.name].p;		
		s.$parent.l.t.x=p.x; s.$parent.l.t.y=p.y;s.$parent.l.t.z=p.z;
		s.$parent.l.r.x=p.rx||0;	s.$parent.l.r.y=p.ry||0;
		
		keepgoing = true;rotateY=0;	animate(locateImpl,function(){cancelAnimFrame(animId);})
	}
	
	s.takeToFloor = function(floorNumber){
		console.log(floorNumber);
		cancelAnimFrame(animId);
		s.$parent.hcontrol=false;
		
		targetY=floorNumber*500;
		currentY = s.$parent.l.t.y;
		if(currentY!==targetY){
			sign =targetY>currentY?1:-1;
			step=0; 
			lSpeed=5;
			console.log({currentY:currentY,targetY:targetY,sign:sign})
			//console.log(+=100)
			pSurface = s.$parent.surfaces;//previousSurface
			lift = s.$parent.surfaces.lift;
			keepgoing = true;rotateY=0;	animate(liftMotionImpl,function(){cancelAnimFrame(animId);})
		}
		
	}
	function initDropDownNodes(){
		var dropDownNodes=[];
		for(var name in nodeMap){
			var node = nodeMap[name];
			if(node.show){	
				dropDownNodes.push({name:name,label:node.label});
			}	
		}
		return dropDownNodes;
	}
	function liftMotionImpl(callback){
		currentY+=sign*lSpeed;
		//lift = s.$parent.surfaces.lift;
		s.$parent.surfaces.lift.p[1]=-currentY/100;
		s.$parent.l.t.y=currentY;			
		
		if((sign==1 && currentY>=targetY) || (sign==-1 && currentY < targetY+10)){
			s.$parent.update();	
			
			var lift = pSurface.lift;
			lift.p[1]=0;
			delete pSurface.lift;
			s.$parent.surfaces.lift = lift;			
			s.$parent.update();				
			keepgoing=false;
			callback();
		}
			  
	
	
	}
	
	function locateImpl(callback){	
		rotateY++;
		if(rotateY<20){			
			s.$parent.l.r.y+=0.1;	
			s.$parent.update();	
		}else{
			callback();
		}		
	}	
	function navigateImpl(callback){		
		step++;
		n1=nodeMap[nodes[cnode]].p;
		n2 = nodeMap[nodes[cnode+1]].p;
		n3 = nodeMap[nodes[cnode+2]].p;			
		p = getPointOnLine(n1,n2,step*stepLength);		
		steps = distance(n1,n2)/stepLength;						
		a1=getLineAngle(n1,n2);	a2=getLineAngle(n2,n3);					
		
		//travell in a less angular deviation path
		if(Math.abs(a2-a1-360)<Math.abs(a2-a1)){
			a1+=360;
		}else if(Math.abs(a2+360-a1)<Math.abs(a2-a1)){
			a2+=360;
		}
		
		y2=n1.y+(n2.y-n1.y)*step/steps;			
		s.$parent.l.t.x=p.x; s.$parent.l.t.y=y2;	s.$parent.l.t.z=p.z;			
		s.$parent.l.r.y=a1+(a2-a1)*Math.pow(step/steps,4);				
		s.$parent.update();			
		
		if(step>=steps){
			keepgoing=false;
			callback();
		}		  
	}

	
	//directions code	
	s.$parent.nodeMap=dropDownNodes;
	//populating distances....
	for(var i in nodeMap){
		var node = nodeMap[i];		
		for(var path in node.paths){
			node.paths[path]=distance(node.p,nodeMap[path].p)/100;
		}		
	}	
    function animate(impl,callback) {
      if(keepgoing){
		animId= requestAnimFrame( animate.bind(this,impl,callback) );        
			if(!s.$$phase){
			s.$apply(function() {
				impl(callback);			
			});       
		}
      }
    }    
	function getTimeStep(){
		return Math.round(new Date().getMilliseconds())
	}
	function getLineAngle(p1,p2){
		var a=Math.atan((p2.z-p1.z)/(p2.x-p1.x))*180/Math.PI;
		return (p2.x<p1.x)?(a+90+360)%360:(a-90+360)%360;		
	}
	function getPointOnLine(p1,p2,d){
		var r=d/distance(p1,p2);
		return{x:r*p2.x+(1-r)*p1.x,z:r*p2.z+(1-r)*p1.z}
	}

	function distance(p1,p2){
		return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.z-p2.z)*(p1.z-p2.z));
	}
	function cloneArray(t){
		var a=[];for(var i=0;i<t.length;i++){a.push(t[i]);}return a;
	}
	function findPath(nodeName,tnodeName,dist,visited){	
		visited.push(nodeName);
		if(nodeName==tnodeName){		
			//console.log(dist+" visited:"+visited)
			return {dist:dist,visited:visited};	
		}else{		
			var node = nodeMap[nodeName].paths;		
			var result={dist:Infinity,visited:[]}		
			for(var childNodeName in node){	
				if(visited.indexOf(childNodeName)==-1){	
					var r= findPath(childNodeName,tnodeName,dist+node[childNodeName],cloneArray(visited));		
					if(r.dist<result.dist){	result = r;}
				}
			}
			return result
		}
	}
	

		
	}]);
}());

