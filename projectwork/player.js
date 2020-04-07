var canvaswidth=1600;
var canvasheight=900;
var playerdata=JSON.parse(playerdata);
var injurydata=JSON.parse(injurydata);


var nbaGmstat=[19.47,5.28,1.16];
var nbaGastat=[4.59,2.49,2.34,0.41]; //Guard Main and Arbitrary stats for NBA players


var nbaFmstat=[17.81, 6.61, 1.12];
var nbaFastat=[3.32,1.95,0.68,2.38]; //Forward Main and Arbitrary stats for NBA players


var nbaCmstat=[3.42,8.33,1.38];
var nbaCastat=[18.64,3.08,1.07,2.9]; //Center Main and Arbitrary stats for NBA players

var ncaamstat=new Array;
var ncaaastat=new Array;

var mstatvalues=new Array;
var astatvalues=new Array;

var avgmstatvalues=new Array;
var avgastatvalues=new Array;

d3.select("body").append("div").attr("id","svgcontainer");
var svg = d3.select("#svgcontainer")
        .append("svg")
        .attr("width", canvaswidth)
        .attr("height", canvasheight); //initializing the SVG canvas
var item=sessionStorage.getItem("thename");
var uni=sessionStorage.getItem("theuni"); //Get player name and team name
var thisindex;
var injuryindex;
playerdata.forEach( function(data,index) {
	if (data.name==item) {
		thisindex=index; //store index of the player from dataset
	}
	
});
var summ0=0;
var summ1=0;
var summ2=0;

var suma0=0;
var suma1=0;
var suma2=0;
var suma3=0;
var plnum=0;
playerdata.forEach( function(data,index) {
	if (data.pos==playerdata[thisindex].pos && playerdata[thisindex].pos=="G") {
		summ0=summ0+parseFloat(data.pts/data.games);	
		summ1=summ1+parseFloat(data.ast/data.games);
		summ2=summ2+parseFloat(data.stl/data.games);
		suma0=suma0+parseFloat(data.trb/data.games);
		suma1=suma1+parseFloat(data.tov/data.games);
		suma2=suma2+parseFloat(data.pf/data.games);
		suma3=suma3+parseFloat(data.blk/data.games); //average for NCAA Guards
		plnum++;
	}
	else if (data.pos==playerdata[thisindex].pos && playerdata[thisindex].pos=="F") {		
		summ0=summ0+parseFloat(data.pts/data.games);
		summ1=summ1+parseFloat(data.trb/data.games);
		summ2=summ2+parseFloat(data.stl/data.games);
		suma0=suma0+parseFloat(data.ast/data.games);
		suma1=suma1+parseFloat(data.tov/data.games);
		suma2=suma2+parseFloat(data.blk/data.games);
		suma3=suma3+parseFloat(data.pf/data.games); //average for NCAA Forwards
		plnum++;
	}
	else if (data.pos==playerdata[thisindex].pos && playerdata[thisindex].pos=="C") {
		summ0=summ0+parseFloat(data.orb/data.games);	
		summ1=summ1+parseFloat(data.drb/data.games);
		summ2=summ2+parseFloat(data.blk/data.games);
		suma0=suma0+parseFloat(data.pts/data.games);
		suma1=suma1+parseFloat(data.ast/data.games);
		suma2=suma2+parseFloat(data.stl/data.games);
		suma3=suma3+parseFloat(data.pf/data.games); //average for NCAA Centers
		plnum++;
	}	
});
ncaamstat[0]=summ0/plnum;
ncaamstat[1]=summ1/plnum;
ncaamstat[2]=summ2/plnum;

ncaaastat[0]=suma0/plnum;
ncaaastat[1]=suma1/plnum;
ncaaastat[2]=suma2/plnum;
ncaaastat[3]=suma3/plnum;


var mainstat=new Array;
var astat=new Array;
var avgmstat=new Array;
var avgastat=new Array;
var mstattext=new Array;
var astattext=new Array;
svg.append("rect").attr("id","border").attr("x",650).attr("y",100).attr("width",300).attr("height",300).attr("fill-opacity",0.1)
	.attr("fill","white").attr("stroke-width",2).attr("stroke","white");
svg.append("image").attr("x",675).attr("y",125).attr("width",250).attr("height",250).attr("href","logos/"+uni+".png"); //team logo
svg.append("image").attr("x",1100).attr("y",400).attr("width",350).attr("height",350).attr("href","shooting.png").attr("opacity",0.7); //shooting chart
svg.append("text").attr("id","playername").attr("x",800).attr("y",450).attr("text-anchor","middle").text(item).attr("font-size",45).attr("fill","white").attr("font-weight","bold");
svg.append("text").attr("id","playerpos").attr("x",800).attr("y",500).attr("text-anchor","middle").text(function() {
																											if (playerdata[thisindex].pos=="F") return "Forward";
																											else if (playerdata[thisindex].pos=="C") return "Center";
																											else return "Guard";})
		.attr("font-size",45).attr("fill","white").attr("font-weight","bold");
		
//populate the main and arbitrary stats according to position
if (playerdata[thisindex].pos=="G") {
	mainstat[0]=(playerdata[thisindex].pts/playerdata[thisindex].games)*10;
	mstatvalues[0]=mainstat[0]/10;
	mainstat[1]=(playerdata[thisindex].ast/playerdata[thisindex].games)*25;
	mstatvalues[1]=mainstat[1]/25;
	mainstat[2]=(playerdata[thisindex].stl/playerdata[thisindex].games)*50;
	mstatvalues[2]=mainstat[2]/50;
	astat[0]=(playerdata[thisindex].trb/playerdata[thisindex].games)*17;
	astatvalues[0]=astat[0]/17;
	astat[1]=(playerdata[thisindex].tov/playerdata[thisindex].games)*50;
	astatvalues[1]=astat[1]/50;
	astat[2]=(playerdata[thisindex].pf/playerdata[thisindex].games)*50;
	astatvalues[2]=astat[2]/50;
	astat[3]=(playerdata[thisindex].blk/playerdata[thisindex].games)*50;
	astatvalues[3]=astat[3]/50;
	avgmstat[0]=nbaGmstat[0]*10;
	avgmstat[1]=nbaGmstat[1]*25;
	avgmstat[2]=nbaGmstat[2]*50;
	mstattext[0]="Points";
	mstattext[1]="Assists";
	mstattext[2]="Steals";
	alttext="Per Game";
	avgastat[0]=nbaGastat[0]*17;
	avgastat[1]=nbaGastat[1]*50;
	avgastat[2]=nbaGastat[2]*50;
	avgastat[3]=nbaGastat[3]*50;
	astattext[0]="Rebounds";
	astattext[1]="Turnovers";
	astattext[2]="Personal Fouls";
	astattext[3]="Blocks"; //popoulate the main and arbitrary stats according to position
}

if (playerdata[thisindex].pos=="F") {
	mainstat[0]=(playerdata[thisindex].pts/playerdata[thisindex].games)*10;
	mstatvalues[0]=mainstat[0]/10;
	mainstat[1]=(playerdata[thisindex].trb/playerdata[thisindex].games)*17;
	mstatvalues[1]=mainstat[1]/17;
	mainstat[2]=(playerdata[thisindex].stl/playerdata[thisindex].games)*50;
	mstatvalues[2]=mainstat[2]/50;
	astat[0]=(playerdata[thisindex].ast/playerdata[thisindex].games)*25;
	astatvalues[0]=astat[0]/25;
	astat[1]=(playerdata[thisindex].tov/playerdata[thisindex].games)*50;
	astatvalues[1]=astat[1]/50;
	astat[2]=(playerdata[thisindex].blk/playerdata[thisindex].games)*50;
	astatvalues[2]=astat[2]/50;
	astat[3]=(playerdata[thisindex].pf/playerdata[thisindex].games)*50;
	astatvalues[3]=astat[3]/50;
	avgmstat[0]=nbaFmstat[0]*10;
	avgmstat[1]=nbaFmstat[1]*17;
	avgmstat[2]=nbaFmstat[2]*50;
	mstattext[0]="Points";
	mstattext[1]="Rebounds";
	mstattext[2]="Steals";
	alttext="Per Game";
	avgastat[0]=nbaFastat[0]*25;
	avgastat[1]=nbaFastat[1]*50;
	avgastat[2]=nbaFastat[2]*50;
	avgastat[3]=nbaFastat[3]*50;
	astattext[0]="Assists";
	astattext[1]="Turnovers";
	astattext[2]="Blocks";
	astattext[3]="Personal Fouls";
}

if (playerdata[thisindex].pos=="C") {
	mainstat[0]=(playerdata[thisindex].orb/playerdata[thisindex].games)*50;
	mstatvalues[0]=mainstat[0]/50;
	mainstat[1]=(playerdata[thisindex].drb/playerdata[thisindex].games)*25;
	mstatvalues[1]=mainstat[1]/25;
	mainstat[2]=(playerdata[thisindex].blk/playerdata[thisindex].games)*50;
	mstatvalues[2]=mainstat[2]/50;
	astat[0]=(playerdata[thisindex].pts/playerdata[thisindex].games)*10;
	astatvalues[0]=astat[0]/10;
	astat[1]=(playerdata[thisindex].ast/playerdata[thisindex].games)*25;
	astatvalues[1]=astat[1]/25;
	astat[2]=(playerdata[thisindex].stl/playerdata[thisindex].games)*50;
	astatvalues[2]=astat[2]/50;
	astat[3]=(playerdata[thisindex].pf/playerdata[thisindex].games)*50;
	astatvalues[3]=astat[3]/50;
	avgmstat[0]=nbaCmstat[0]*50;
	avgmstat[1]=nbaCmstat[1]*25;
	avgmstat[2]=nbaCmstat[2]*50;
	mstattext[0]="Off. Reb.";
	mstattext[1]="Def. Reb.";
	mstattext[2]="Blocks";
	alttext="Per Game";
	avgastat[0]=nbaCastat[0]*10;
	avgastat[1]=nbaCastat[1]*25;
	avgastat[2]=nbaCastat[2]*50;
	avgastat[3]=nbaCastat[3]*50;	
	astattext[0]="Points";
	astattext[1]="Asists";
	astattext[2]="Steals";
	astattext[3]="Personal Fouls";
}

//set the graphs according to the mainstat values, allow for number viewing if hovering over the graphs
svg.append("rect").attr("id","mainstat1").attr("x",175).attr("y",100).attr("width",mainstat[0]).attr("height",40).attr("fill","orange").on("mouseover",function() {
	svg.select("#mainstattext1").text(mstatvalues[0].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgmstattext1").text(avgmstatvalues[0].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#mainstattext1").transition().attr("opacity",0.0);
	svg.select("#avgmstattext1").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","mainstattext1").attr("x",180+mainstat[0]).attr("y",125).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("text").attr("id","avgmstattext1").attr("x",180+avgmstat[0]).attr("y",165).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("rect").attr("id","avgmstat1").attr("x",175).attr("y",140).attr("width",avgmstat[0]).attr("height",40).attr("fill","white");
svg.append("text").text(mstattext[0]).attr("x",15).attr("y",130).attr("font-size",30).attr("fill","white");
svg.append("text").text(alttext).attr("x",15).attr("y",160).attr("font-size",30).attr("fill","white");

svg.append("rect").attr("id","mainstat2").attr("x",175).attr("y",200).attr("width",mainstat[1]).attr("height",40).attr("fill","orange").on("mouseover",function() {
	svg.select("#mainstattext2").text(mstatvalues[1].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgmstattext2").text(avgmstatvalues[1].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#mainstattext2").transition().attr("opacity",0.0);
	svg.select("#avgmstattext2").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","mainstattext2").attr("x",180+mainstat[1]).attr("y",225).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("text").attr("id","avgmstattext2").attr("x",180+avgmstat[1]).attr("y",265).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("rect").attr("id","avgmstat2").attr("x",175).attr("y",240).attr("width",avgmstat[1]).attr("height",40).attr("fill","white");
svg.append("text").text(mstattext[1]).attr("x",15).attr("y",230).attr("font-size",30).attr("fill","white");
svg.append("text").text(alttext).attr("x",15).attr("y",260).attr("font-size",30).attr("fill","white");

svg.append("rect").attr("id","mainstat3").attr("x",175).attr("y",300).attr("width",mainstat[2]).attr("height",40).attr("fill","orange").on("mouseover",function() {
	svg.select("#mainstattext3").text(mstatvalues[2].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgmstattext3").text(avgmstatvalues[2].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#mainstattext3").transition().attr("opacity",0.0);
	svg.select("#avgmstattext3").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","mainstattext3").attr("x",180+mainstat[2]).attr("y",325).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("text").attr("id","avgmstattext3").attr("x",180+avgmstat[2]).attr("y",365).attr("font-size",20).attr("opacity",0.0).attr("fill","white");
svg.append("rect").attr("id","avgmstat3").attr("x",175).attr("y",340).attr("width",avgmstat[2]).attr("height",40).attr("fill","white");
svg.append("text").text(mstattext[2]).attr("x",15).attr("y",330).attr("font-size",30).attr("fill","white");
svg.append("text").text(alttext).attr("x",15).attr("y",360).attr("font-size",30).attr("fill","white");


//set the graphs according to the arbitrary stat values, allow for number viewing if hovering over the graphs
svg.append("rect").attr("id","astat1").attr("x",1425-astat[0]).attr("y",100).attr("width",astat[0]).attr("height",25).attr("fill","orange").on("mouseover",function() {
	svg.select("#astattext1").text(astatvalues[0].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgastattext1").text(avgastatvalues[0].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#astattext1").transition().attr("opacity",0.0);
	svg.select("#avgastattext1").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","astattext1").attr("x",1420-astat[0]).attr("y",115).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("text").attr("id","avgastattext1").attr("x",1420-avgastat[0]).attr("y",140).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("rect").attr("id","avgastat1").attr("x",1425-avgastat[0]).attr("y",125).attr("width",avgastat[0]).attr("height",25).attr("fill","white");
svg.append("text").text(astattext[0]).attr("x",1450).attr("y",120).attr("font-size",20).attr("fill","white");
svg.append("text").text(alttext).attr("x",1450).attr("y",145).attr("font-size",20).attr("fill","white");

svg.append("rect").attr("id","astat2").attr("x",1425-astat[1]).attr("y",170).attr("width",astat[1]).attr("height",25).attr("fill","orange").on("mouseover",function() {
	svg.select("#astattext2").text(astatvalues[1].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgastattext2").text(avgastatvalues[1].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#astattext2").transition().attr("opacity",0.0);
	svg.select("#avgastattext2").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","astattext2").attr("x",1420-astat[1]).attr("y",185).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("text").attr("id","avgastattext2").attr("x",1420-avgastat[1]).attr("y",210).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("rect").attr("id","avgastat2").attr("x",1425-avgastat[1]).attr("y",195).attr("width",avgastat[1]).attr("height",25).attr("fill","white");
svg.append("text").text(astattext[1]).attr("x",1450).attr("y",190).attr("font-size",20).attr("fill","white");
svg.append("text").text(alttext).attr("x",1450).attr("y",215).attr("font-size",20).attr("fill","white");

svg.append("rect").attr("id","astat3").attr("x",1425-astat[2]).attr("y",240).attr("width",astat[2]).attr("height",25).attr("fill","orange").on("mouseover",function() {
	svg.select("#astattext3").text(astatvalues[2].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgastattext3").text(avgastatvalues[2].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#astattext3").transition().attr("opacity",0.0);
	svg.select("#avgastattext3").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","astattext3").attr("x",1420-astat[2]).attr("y",255).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("text").attr("id","avgastattext3").attr("x",1420-avgastat[2]).attr("y",280).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("rect").attr("id","avgastat3").attr("x",1425-avgastat[2]).attr("y",265).attr("width",avgastat[2]).attr("height",25).attr("fill","white");
svg.append("text").text(astattext[2]).attr("x",1450).attr("y",260).attr("font-size",20).attr("fill","white");
svg.append("text").text(alttext).attr("x",1450).attr("y",285).attr("font-size",20).attr("fill","white");

svg.append("rect").attr("id","astat4").attr("x",1425-astat[3]).attr("y",310).attr("width",astat[3]).attr("height",25).attr("fill","orange").on("mouseover",function() {
	svg.select("#astattext4").text(astatvalues[3].toFixed(2)).transition().attr("opacity",1.0);
	statChanger();
	svg.select("#avgastattext4").text(avgastatvalues[3].toFixed(2)).transition().attr("opacity",1.0);
}).on("mouseout", function() {
	svg.select("#astattext4").transition().attr("opacity",0.0);
	svg.select("#avgastattext4").transition().attr("opacity",0.0);
});
svg.append("text").attr("id","astattext4").attr("x",1420-astat[3]).attr("y",325).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("text").attr("id","avgastattext4").attr("x",1420-avgastat[3]).attr("y",350).attr("font-size",15).attr("opacity",0.0).attr("fill","white").attr("text-anchor","end");
svg.append("rect").attr("id","avgastat4").attr("x",1425-avgastat[3]).attr("y",335).attr("width",avgastat[3]).attr("height",25).attr("fill","white");
svg.append("text").text(astattext[3]).attr("x",1450).attr("y",330).attr("font-size",20).attr("fill","white");
svg.append("text").text(alttext).attr("x",1450).attr("y",355).attr("font-size",20).attr("fill","white");



//populating the shooting chart with this players shooting percentages, display No Data if there arent any available values
var ftp=playerdata[thisindex].ft*100/playerdata[thisindex].fta;
if (playerdata[thisindex].ft==0 || playerdata[thisindex].fta==0) ftp="No Data";

var twop=playerdata[thisindex].twop*100/playerdata[thisindex].twopa;
if (playerdata[thisindex].twop==0 || playerdata[thisindex].twopa==0) twop="No Data";

var threep=playerdata[thisindex].threep*100/playerdata[thisindex].threepa;
if (playerdata[thisindex].threep==0 || playerdata[thisindex].threepa==0) threep="No Data";

if (ftp=="No Data"){
	
	svg.append("text").text(ftp).attr("x",1242).attr("y",585).attr("font-size",20).attr("fill","black").attr("font-weight","bold");
}
else { //display the actual numbers if the percentages are hovered over
	svg.append("text").text("FTs: "+playerdata[thisindex].ft+"/"+playerdata[thisindex].fta).attr("x",1462).attr("y",585).attr("font-size",20).attr("fill","white").attr("id","ftnums").attr("opacity",0.0).attr("font-weight","bold");
	svg.append("text").text(ftp.toFixed(2)+"%").attr("x",1242).attr("y",585).attr("font-size",20).attr("fill","black").attr("font-weight","bold").on("mouseover",function() {
		svg.select("#ftnums").transition().attr("opacity",1.0);
	}).on("mouseout",function() {
		svg.select("#ftnums").transition().attr("opacity",0.0);
	});
}

if (twop=="No Data"){
	svg.append("text").text(twop).attr("x",1242).attr("y",500).attr("font-size",20).attr("fill","black").attr("font-weight","bold");
}
else { //display the actual numbers if the percentages are hovered over
	svg.append("text").text("2s: "+playerdata[thisindex].twop+"/"+playerdata[thisindex].twopa).attr("x",1462).attr("y",500).attr("font-size",20).attr("fill","white").attr("id","twonums").attr("opacity",0.0).attr("font-weight","bold");
	svg.append("text").text(twop.toFixed(2)+"%").attr("x",1242).attr("y",500).attr("font-size",20).attr("fill","black").attr("font-weight","bold").on("mouseover",function() {
		svg.select("#twonums").transition().attr("opacity",1.0);
	}).on("mouseout",function() {
		svg.select("#twonums").transition().attr("opacity",0.0);
	});
}
if (threep=="No Data"){
	svg.append("text").text(threep).attr("x",1242).attr("y",650).attr("font-size",20).attr("fill","black").attr("font-weight","bold");
}
else { //display the actual numbers if the percentages are hovered over
	svg.append("text").text("3s: "+playerdata[thisindex].threep+"/"+playerdata[thisindex].threepa).attr("x",1462).attr("y",650).attr("font-size",20).attr("fill","white").attr("id","threenums").attr("opacity",0.0).attr("font-weight","bold");
	svg.append("text").text(threep.toFixed(2)+"%").attr("x",1242).attr("y",650).attr("font-size",20).attr("fill","black").attr("font-weight","bold").on("mouseover",function() {
		svg.select("#threenums").transition().attr("opacity",1.0);
	}).on("mouseout",function() {
		svg.select("#threenums").transition().attr("opacity",0.0);
	});
}
//draw injury timeline
svg.append("rect").attr("id","injuries").attr("x",80).attr("y",810).attr("width",360*4).attr("height",40).attr("fill","#11bdfe");
var totduration=0;
var injuryarray=new Array;
var namesarray=new Array;
if (injurydata[thisindex].injuries!="") { //get the start and end of each injury
	injuryarray=injurydata[thisindex].injuries.split(" ");
}
if (injurydata[thisindex].injurynames!="") { //get the type of each injury
	namesarray=injurydata[thisindex].injurynames.split(",");
}
for(let i=0;i<injuryarray.length;i+=2) { //place red boxes according to the duration of the injury, show details if hovered over
	var duration=injuryarray[i+1]-injuryarray[i];
	totduration+=duration;
	svg.append("text").text("Injury: "+namesarray[i/2]).attr("x",(80+injuryarray[i]*4)+(duration*2)).attr("y",760).attr("font-size",20).attr("fill","white").attr("opacity",0.0).attr("id",function() {return "injurytype"+i/2}).attr("text-anchor","middle");
	svg.append("text").text("Duration: "+duration+" days").attr("x",(80+injuryarray[i]*4)+(duration*2)).attr("y",780).attr("font-size",20).attr("fill","white").attr("opacity",0.0).attr("id",function() {return "injuryduration"+i/2}).attr("text-anchor","middle");
	svg.append("rect").attr("id",function() {return "injury"+i/2}).attr("x",80+injuryarray[i]*4).attr("y",800).attr("width",duration*4).attr("height",60).attr("fill","red")
		.on("mouseover",function() {
			svg.select("#injuryduration"+i/2).transition().attr("opacity",1.0);
			svg.select("#injurytype"+i/2).transition().attr("opacity",1.0);
			svg.select("#injury"+i/2).transition().attr("fill","orange");
		})
		.on("mouseout",function() {
			svg.select("#injuryduration"+i/2).transition().attr("opacity",0.0);
			svg.select("#injurytype"+i/2).transition().attr("opacity",0.0);
			svg.select("#injury"+i/2).transition().attr("fill","red");
		});
}
//for comparing vs NBA players of that position
svg.append("image").attr("id","nbastat").attr("x",80).attr("y",480).attr("width",150).attr("height",150).attr("href","nbalogo.jpg").on("click",function() {
			svg.select("#avgtext").transition().text("NBA Averages");
			if (playerdata[thisindex].pos=="G") {
				avgmstat[0]=nbaGmstat[0]*10;
				avgmstat[1]=nbaGmstat[1]*25;
				avgmstat[2]=nbaGmstat[2]*50;
				avgastat[0]=nbaGastat[0]*17;
				avgastat[1]=nbaGastat[1]*50;
				avgastat[2]=nbaGastat[2]*50;
				avgastat[3]=nbaGastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
			else if(playerdata[thisindex].pos=="F") {
				avgmstat[0]=nbaFmstat[0]*10;
				avgmstat[1]=nbaFmstat[1]*17;
				avgmstat[2]=nbaFmstat[2]*50;
				avgastat[0]=nbaFastat[0]*25;
				avgastat[1]=nbaFastat[1]*50;
				avgastat[2]=nbaFastat[2]*50;
				avgastat[3]=nbaFastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
			else {
				avgmstat[0]=nbaCmstat[0]*50;
				avgmstat[1]=nbaCmstat[1]*25;
				avgmstat[2]=nbaCmstat[2]*50;
				avgastat[0]=nbaCastat[0]*10;
				avgastat[1]=nbaCastat[1]*25;
				avgastat[2]=nbaCastat[2]*50;
				avgastat[3]=nbaCastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
		});;
svg.append("text").attr("x",155).attr("y",480).attr("font-size",20).attr("text-anchor","middle").attr("fill","white").text(function() {
																											if (playerdata[thisindex].pos=="F") return "vs NBA forwards";
																											else if (playerdata[thisindex].pos=="C") return "vs NBA Centers";
																											else return "vs NBA Guards";})
//for comparing vs NCAA players of that position		
svg.append("image").attr("id","ncaastat").attr("x",80).attr("y",630).attr("width",150).attr("height",150).attr("href","ncaalogo.png").on("click",function() {
			svg.select("#avgtext").transition().text("NCAA Averages");
			if (playerdata[thisindex].pos=="G") {
				avgmstat[0]=ncaamstat[0]*10;
				avgmstat[1]=ncaamstat[1]*25;
				avgmstat[2]=ncaamstat[2]*50;
				avgastat[0]=ncaaastat[0]*17;
				avgastat[1]=ncaaastat[1]*50;
				avgastat[2]=ncaaastat[2]*50;
				avgastat[3]=ncaaastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
			else if(playerdata[thisindex].pos=="F") {
				avgmstat[0]=ncaamstat[0]*10;
				avgmstat[1]=ncaamstat[1]*17;
				avgmstat[2]=ncaamstat[2]*50;
				avgastat[0]=ncaaastat[0]*25;
				avgastat[1]=ncaaastat[1]*50;
				avgastat[2]=ncaaastat[2]*50;	
				avgastat[3]=ncaaastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
			else {
				avgmstat[0]=ncaamstat[0]*50;
				avgmstat[1]=ncaamstat[1]*25;
				avgmstat[2]=ncaamstat[2]*50;
				avgastat[0]=ncaaastat[0]*10;
				avgastat[1]=ncaaastat[1]*25;
				avgastat[2]=ncaaastat[2]*50;
				avgastat[3]=ncaaastat[3]*50;
				svg.select("#avgmstat1").transition().attr("width",avgmstat[0]);
				svg.select("#avgmstat2").transition().attr("width",avgmstat[1]);
				svg.select("#avgmstat3").transition().attr("width",avgmstat[2]);
				svg.select("#avgastat1").transition().attr("x",1425-avgastat[0]).attr("width",avgastat[0]);
				svg.select("#avgastat2").transition().attr("x",1425-avgastat[1]).attr("width",avgastat[1]);
				svg.select("#avgastat3").transition().attr("x",1425-avgastat[2]).attr("width",avgastat[2]);
				svg.select("#avgastat4").transition().attr("x",1425-avgastat[3]).attr("width",avgastat[3]);
			}
		});;
svg.append("text").attr("x",155).attr("y",655).attr("font-size",20).attr("text-anchor","middle").attr("fill","white").text(function() {
																											if (playerdata[thisindex].pos=="F") return "vs NCAA forwards";
																											else if (playerdata[thisindex].pos=="C") return "vs NCAA Centers";
																											else return "vs NCAA Guards";})
																											
//calculating the players weighted score
var weightedscore;
if (playerdata[thisindex].pos=="G") {
	var ptsweight=(mstatvalues[0]/15)*10;
	var astweight=(mstatvalues[1]/8)*10;
	var stlweight=(mstatvalues[2]/3)*10;
	weightedscore=0.5*ptsweight+0.4*astweight+0.1*stlweight;
}
else if (playerdata[thisindex].pos=="F") {
	var ptsweight=(mstatvalues[0]/20)*10;
	var trbweight=(mstatvalues[1]/6)*10;
	var stlweight=(mstatvalues[2]/3)*10;
	weightedscore=0.6*ptsweight+0.3*trbweight+0.1*stlweight;
}
else {
	var orbweight=(mstatvalues[0]/3)*10;
	var drbweight=(mstatvalues[1]/7)*10;
	var blkweight=(mstatvalues[2]/3)*10;
	weightedscore=0.3*orbweight+0.4*drbweight+0.3*blkweight;
}
svg.append("circle").attr("cx",800).attr("cy",640).attr("r",90).attr("stroke","black").attr("stroke-width",8).attr("fill","white");
svg.append("text").attr("x",800).attr("y",630).text(weightedscore.toFixed(1)).attr("fill","black").attr("text-anchor","middle").attr("font-size",60).attr("font-weight","bold");
svg.append("line").attr("x1",745).attr("y1",650).attr("x2",855).attr("y2",650).attr("stroke","black").attr("stroke-width",10);
svg.append("text").attr("x",800).attr("y",705).text("10").attr("fill","black").attr("text-anchor","middle").attr("font-size",60).attr("font-weight","bold");


svg.append("text").attr("x",800).attr("y",887).text("Injury timeline for the past year. Total duration:"+totduration+" days").attr("fill","black").attr("text-anchor","middle").attr("font-size",25).attr("font-weight","bold");


svg.append("rect").attr("x",630).attr("y",50).attr("width",20).attr("height",20).attr("fill","orange");
svg.append("text").attr("x",660).attr("y",68).text("Player Averages").attr("font-size",20).attr("fill","white");
svg.append("rect").attr("x",850).attr("y",50).attr("width",20).attr("height",20).attr("fill","white");
svg.append("text").attr("x",880).attr("y",68).text("NBA Averages").attr("font-size",20).attr("fill","white").attr("id","avgtext");

//for changing the statistics when moving from NBA to NCAA players and vice versa
function statChanger() {
	if (playerdata[thisindex].pos=="G") {
		avgmstatvalues[0]=avgmstat[0]/10;
		svg.select("#avgmstattext1").attr("x",180+avgmstat[0]);
		avgmstatvalues[1]=avgmstat[1]/25;
		svg.select("#avgmstattext2").attr("x",180+avgmstat[1]);
		avgmstatvalues[2]=avgmstat[2]/50;
		svg.select("#avgmstattext3").attr("x",180+avgmstat[2]);
		avgastatvalues[0]=avgastat[0]/17;
		svg.select("#avgastattext1").attr("x",1420-avgastat[0]);
		avgastatvalues[1]=avgastat[1]/50;
		svg.select("#avgastattext2").attr("x",1420-avgastat[1]);
		avgastatvalues[2]=avgastat[2]/50;
		svg.select("#avgastattext3").attr("x",1420-avgastat[2]);
		avgastatvalues[3]=avgastat[3]/50;
		svg.select("#avgastattext4").attr("x",1420-avgastat[3]);
			
	}
	else if (playerdata[thisindex].pos=="F") {
		avgmstatvalues[0]=avgmstat[0]/10;
		svg.select("#avgmstattext1").attr("x",180+avgmstat[0]);
		avgmstatvalues[1]=avgmstat[1]/17;
		svg.select("#avgmstattext2").attr("x",180+avgmstat[1]);
		avgmstatvalues[2]=avgmstat[2]/50;
		svg.select("#avgmstattext3").attr("x",180+avgmstat[2]);
		avgastatvalues[0]=avgastat[0]/25;
		svg.select("#avgastattext1").attr("x",1420-avgastat[0]);
		avgastatvalues[1]=avgastat[1]/50;
		svg.select("#avgastattext2").attr("x",1420-avgastat[1]);
		avgastatvalues[2]=avgastat[2]/50;
		svg.select("#avgastattext3").attr("x",1420-avgastat[2]);
		avgastatvalues[3]=avgastat[3]/50;
		svg.select("#avgastattext4").attr("x",1420-avgastat[3]);
	}
	else {
		avgmstatvalues[0]=avgmstat[0]/50;
		svg.select("#avgmstattext11").attr("x",180+avgmstat[0]);
		avgmstatvalues[1]=avgmstat[1]/25;
		svg.select("#avgmstattext2").attr("x",180+avgmstat[1]);
		avgmstatvalues[2]=avgmstat[2]/50;
		svg.select("#avgmstattext3").attr("x",180+avgmstat[2]);
		avgastatvalues[0]=avgastat[0]/10;
		svg.select("#avgastattext1").attr("x",1420-avgastat[0]);
		avgastatvalues[1]=avgastat[1]/25;
		svg.select("#avgastattext2").attr("x",1420-avgastat[1]);
		avgastatvalues[2]=avgastat[2]/50;
		svg.select("#avgastattext3").attr("x",1420-avgastat[2]);
		avgastatvalues[3]=avgastat[3]/50;
		svg.select("#avgastattext4").attr("x",1420-avgastat[3]);
	}
}