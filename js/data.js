floor0={	
	liftroom:{name:'liftroom',template:'objects/lift/liftroom3x3.html',connects:['liftroomL','liftroomU','AC1'],map:'./img/sf/liftroom.png',
		p:[0,0,0,0,0,0],x:[0-7.5,0+7.5],z:[0-7.5,0+7.5],y:[0,5]},
	liftroomL:{name:'liftroomL',template:'objects/lift/liftroom3x3.html',connects:[],map:'./img/sf/liftroom.png',
		p:[0,5.05,0,0,0,0],x:[0-7.5,0+7.5],z:[0-7.5,0+7.5],y:[5,10]},
	liftroomU:{name:'liftroomL',template:'objects/lift/liftroom3x3.html',connects:[],map:'./img/sf/liftroom.png',
		p:[0,-5.05,0,0,0,0],x:[0-7.5,0+7.5],z:[0-7.5,0+7.5],y:[-5,0]},
	AC1:{name:'AC1',template:'objects/rooms/corridor7x1.html',connects:['DC1','liftroom','AC2','BC1'],map:'./img/sf/AC1.png',
		p:[-10,0,-10,0,90,0],x:[-10-2.5,-10+2.5],z:[-10-17.5,-10+17.5],y:[0,5]},
	AC2:{name:'AC2',template:'objects/rooms/corridor6x1.html',connects:['liftroom','AC1','AZ'],map:'./img/sf/AC2.png',
		p:[2.5,0,-30,0,0,0],x:[2.5-15,2.5+15],z:[-30-2.5,-30+2.5],y:[0,5]},
	AZ:{name:'AZ',template:'objects/rooms/zone5x3.html',connects:['AC2'],map:'./img/sf/AZ.png',
		p:[5,0,-20,0,180,0],x:[5-12.5,5+12.5],z:[-20-7.5,-20+7.5],y:[0,5]},
	BC1:{name:'BC1',template:'objects/rooms/corridor7x1.html',connects:['AC1','liftroom','BC2','CC1'],map:'./img/sf/BC1.png',
		p:[10,0,-10,0,0,0],x:[10-17.5,10+17.5],z:[-10-2.5,-10+2.5],y:[0,5]},	
	BC2:{name:'BC2',template:'objects/rooms/corridor6x1.html',connects:['liftroom','BC1','BZ'],map:'./img/sf/BC2.png',
		p:[30,0,2.5,0,-90,0],x:[30-2.5,30+2.5],z:[2.5-15,2.5+15],y:[0,5]},
	BZ:{name:'BZ',template:'objects/rooms/zone5x3.html',connects:['BC2'],map:'./img/sf/BZ.png',
		p:[20,0,5,0,90,0],x:[20-7.5,20+7.5],z:[5-12.5,5+12.5],y:[0,5]},	
	CC1:{name:'CC1',template:'objects/rooms/corridor7x1.html',connects:['BC1','liftroom','CC2','DC1','liftroomL','liftroomU'],map:'./img/sf/CC1.png',
		p:[10,0,10,0,-90,0],x:[10-2.5,10+2.5],z:[10-17.5,10+17.5],y:[0,5]},	
	CC2:{name:'CC2',template:'objects/rooms/corridor6x1.html',connects:['liftroom','CC1','CZ'],map:'./img/sf/CC2.png',
		p:[-2.5,0,30,0,180,0],x:[-2.5-15,-2.5+15],z:[30-2.5,30+2.5],y:[0,5]},
	CZ:{name:'CZ',template:'objects/rooms/zone5x3.html',connects:['CC2'],map:'./img/sf/CZ.png',
		p:[-5,0,20,0,0,0],x:[-5-12.5,-5+12.5],z:[20-7.5,20+7.5],y:[0,5]},	
	DC1:{name:'DC1',template:'objects/rooms/corridor7x1.html',connects:['CC1','liftroom','DC2','AC1'],map:'./img/sf/DC1.png',
		p:[-10,0,10,0,180,0],x:[-10-17.5,-10+17.5],z:[10-2.5,10+2.5],y:[0,5]},	
	DC2:{name:'DC2',template:'objects/rooms/corridor6x1.html',connects:['liftroom','DC1','DZ'],map:'./img/sf/DC2.png',
		p:[-30,0,-2.5,0,90,0],x:[-30-2.5,-30+2.5],z:[-2.5-15,-2.5+15],y:[0,5]},
	DZ:{name:'DZ',template:'objects/rooms/zone5x3.html',connects:['DC2'],map:'./img/sf/DZ.png',
		p:[-20,0,-5,0,-90,0],x:[-20-7.5,-20+7.5],z:[-5-12.5,-5+12.5],y:[0,5]},	
};
		
		
		


floors=[
		{name:'floor0',y:0,surfaces:floor0},
			
		];


nodeMap={
		f0e1:{p:{ x:3040, y:0, z:-3334, ry:348.75 },paths:{f0e2:0},show:false},
		f0e2:{p:{ x:2311, y:0, z:-3705, ry:-18.75 },paths:{f0e1:0,f0e3:0},show:true},
		f0e3:{ p:{ x:1245, y:0, z:-3309, ry:-29.25 },paths:{f0e2:0,foz2r1:0 },show:true},
		foz2r1:{p:{ x:1225, y:10, z:-2093, ry:156.75 },paths:{f0e3:0,folifte:0},show:true},
		folifte:{ p:{ x:1210, y:10, z:-1538, ry:40.5 },paths:{foz2r1:0,caff1:0,foliftr1:0},show:true},
			foliftr1:{  p:{ x:770, y:10, z:-1554, ry:54 },paths:{folifte:0,foliftr2:0,folifts1:0},show:true},
			foliftr2:{  p:{ x:-100, y:10, z:-1367, ry:232 },paths:{foliftr1:0},show:true},
			folifts1:{   p:{ x:764, y:10, z:-1186, ry:70 },paths:{foliftr1:0,folifts2:0},show:true},
			folifts2:{  p:{ x:-335, y:245, z:-1167, ry:273 },paths:{folifts1:0,folifts3:0},show:true},
			folifts3:{ p:{ x:-244, y:295, z:-913, ry:263 },paths:{folifts2:0,folifts4:0},show:true},
			folifts4:{ p:{ x:685, y:510, z:-1027, ry:207 },paths:{folifts3:0,f1lifts1:0},show:true},		
		caff1:{ p:{ x:1252, y:10, z:-180, ry:-59.25 },paths:{folifte:0,caff2:0},show:true},	
		caff2:{ p:{ x:1837, y:10, z:165, ry:-64.5}	,paths:{caff1:0,caff3:0},show:true},	
		caff3:{ p:{ x:2010, y:10, z:1169, ry:267 },paths:{caff2:0,caff4:0}, show:true},
		caff4:{ p:{ x:3952, y:0, z:1058, ry:48 }, paths:{caff3:0,caff5:0}, show:true},
		caff5:{ p:{ x:4109, y:0, z:1234, ry:64 }, paths:{caff4:0,caff6:0}, show:false},
		caff6:{  p:{ x:4157, y:0, z:810, ry:56 }, paths:{caff7:0,caff5:0}, show:false, dummy:true},
		caff7:{ p:{ x:4157, y:0, z:810, ry:56 }, paths:{caff6:0}, show:false,dummy:true},
		 
		 
		
		 
		f1z2r0:{ p:{ x:1277, y:510, z:-2770, ry:225 },paths:{f1z2r1:0},show:true},
		f1z2r1:{p:{ x:1225, y:10+500, z:-2093, ry:156.75 },paths:{f1lifte:0,f1z2r0:0},show:true},
		f1lifte:{ p:{ x:1210, y:10+500, z:-1538, ry:40.5 },paths:{f1z2r1:0,f1liftr1:0,f1cr0:0},show:true},
			f1liftr1:{  p:{ x:770, y:10+500, z:-1554, ry:54 },paths:{f1lifte:0,f1liftr2:0,f1lifts1:0},show:true},
			f1liftr2:{  p:{ x:-100, y:10+500, z:-1367, ry:232 },paths:{f1liftr1:0},show:true},
			f1lifts1:{   p:{ x:764, y:10+500, z:-1186, ry:70 },paths:{folifts4:0,f1liftr1:0,f1lifts2:0},show:true},
			f1lifts2:{  p:{ x:-335, y:245+500, z:-1167, ry:273 },paths:{f1lifts1:0,f1lifts3:0},show:true},
			f1lifts3:{ p:{ x:-244, y:295+500, z:-913, ry:263 },paths:{f1lifts2:0,f1lifts4:0},show:true},
			f1lifts4:{ p:{ x:685, y:510+500, z:-1027, ry:207 },paths:{f1lifts3:0},show:true},		
		f1cr0:{ p:{ x:1208, y:510, z:-673, ry:209 },paths:{f1lifte:0,f1cr1:0},show:true},	
		f1cr1:{ p:{ x:1326, y:510, z:299, ry:162 },paths:{f1cr0:0,f1cr2:0},show:true},			
		f1cr2:{ p:{ x:1095, y:500, z:1000, ry:116 },paths:{f1cr1:0,f1z1cue:0},show:true},
		f1z1cue:{ p:{ x:-930, y:500, z:1044, ry:210 },paths:{f1cr2:0,f1z1cu0:0},show:true},
		f1z1cu0:{ p:{ x:-835, y:500, z:516, ry:222 },paths:{f1z1cue:0,f1z1cu1:0},show:true},
		f1z1cu1:{p:{ x:-838, y:500, z:-446, ry:311 },paths:{f1z1cu0:0,f1z1cu2:0},show:true},
		f1z1cu2:{p:{ x:504, y:500, z:-633, ry:33 },paths:{f1z1cu1:0,f1z1cu3:0},show:true},
		f1z1cu3:{ p:{ x:802, y:500, z:471, ry:125 },paths:{f1z1cu2:0,f1z1cu4:0},show:true},
		f1z1cu4:{ p:{ x:-24, y:500, z:182, ry:180 },paths:{f1z1cu3:0,f1z1cu5:0},show:true},
		f1z1cu5:{ p:{ x:-24, y:500, z:182, ry:180 },paths:{f1z1cu4:0,f1z1cu6:0},show:false,dummy:true},
		f1z1cu6:{ p:{ x:-24, y:500, z:182, ry:180 },paths:{f1z1cu5:0},show:false,dummy:true},
		
		
		
		};
		
		
		



		


