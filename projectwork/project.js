var canvaswidth=1840;
var canvasheight=945;
var str;
var coords=JSON.parse(logocoords);
var teamdata=JSON.parse(teamdata);
var avgwin=0;
var avgscore=0;
var avgallow=0;
var hwratio=new Array;
var awratio=new Array;
var imageindex;

d3.select("body").append("div").attr("id","svgcontainer");
d3.select("body").append("button").text("Go").attr("type","button").attr("onclick","window.location.href = 'rosterinfo.html';"); //Button for next page

var dropdown=d3.select("body").append("select").attr("id","dropdown").attr("onchange","clickFunction()"); //creating and populating the team list
teamdata.forEach( function(data,index) {
	var i=index+1;
	dropdown.append("option").attr("value",data.city).text(data.city).attr("style","float:right").attr("id",function () {return "team"+i});
	
	avgwin=avgwin+parseInt(data.w);
	avgscore=avgscore+parseInt(data.pts);
	avgallow=avgallow+parseInt(data.opts);
	
	var temp=parseInt(data.hw)/(parseInt(data.hw)+parseInt(data.hl));
	var temp2=parseInt(data.aw)/(parseInt(data.aw)+parseInt(data.al));
	hwratio.push(temp);
	awratio.push(temp2);
});
avgwin=avgwin/68;
avgscore=avgscore/68;
avgallow=avgallow/68; //average stats

var svg = d3.select("#svgcontainer")
        .append("svg")
        .attr("width", canvaswidth)
        .attr("height", canvasheight); //initializing the SVG canvas
		
svg.append("rect").attr("id","reco").attr("x",0).attr("y",0).attr("width",canvaswidth).attr("height",canvasheight).attr("fill-opacity",0.0)
	.attr("fill","red").attr("stroke-width",4).attr("stroke","black"); //border

coords.forEach( function(data,index) {
	var i=index+1;
	svg.append("image").attr("width",data.w).attr("height",data.h).attr("x",data.x).attr("y",data.y).attr("href","logos/"+i+".png").attr("id", function() {return "img"+i}) //using the coordinates to place each image in the correct location
		.on("click", function() {
			listselect=document.getElementById('dropdown');
			listselect.selectedIndex=i-1; //allowing users to use the images to change selection
			clickFunction();
		});
});
str=document.getElementById('dropdown');
svg.append("line").attr("x1",870).attr("x2",940).attr("y1",460).attr("y2",380).attr("stroke-width",2).attr("stroke","black"); //indiana university
svg.append("line").attr("x1",910).attr("x2",940).attr("y1",180).attr("y2",330).attr("stroke-width",2).attr("stroke","black"); //ND
svg.append("line").attr("x1",1070).attr("x2",1050).attr("y1",240).attr("y2",360).attr("stroke-width",2).attr("stroke","black"); //cincinatti
svg.append("line").attr("x1",1350).attr("x2",1320).attr("y1",160).attr("y2",260).attr("stroke-width",2).attr("stroke","black"); //RI
svg.append("line").attr("x1",1350).attr("x2",1320).attr("y1",220).attr("y2",260).attr("stroke-width",2).attr("stroke","black"); //providence
svg.append("line").attr("x1",1300).attr("x2",1260).attr("y1",350).attr("y2",335).attr("stroke-width",2).attr("stroke","black"); //rutgers
svg.append("line").attr("x1",1300).attr("x2",1260).attr("y1",450).attr("y2",335).attr("stroke-width",2).attr("stroke","black"); //pirates
svg.append("line").attr("x1",1310).attr("x2",1250).attr("y1",550).attr("y2",400).attr("stroke-width",2).attr("stroke","black"); //maryland
svg.append("line").attr("x1",1290).attr("x2",1220).attr("y1",630).attr("y2",440).attr("stroke-width",2).attr("stroke","black"); //virginia richmond
svg.append("line").attr("x1",1340).attr("x2",1270).attr("y1",630).attr("y2",575).attr("stroke-width",2).attr("stroke","black"); //virginia commonwealth
svg.append("line").attr("x1",1410).attr("x2",1410).attr("y1",50).attr("y2",850).attr("stroke-width",2).attr("stroke","black");

svg.append("image").attr("width",300).attr("height",300).attr("x",1500).attr("y",50).attr("href","").attr("id","mainimage").attr("href","logos/1.png");

//Team stat graphs along with the values
svg.append("rect").attr("x",1450).attr("y",400).attr("width",30).attr("height",30).attr("fill","blue");
svg.append("text").attr("x",1490).attr("y",420).text("Team Stats").attr("font-size",15).attr("text-anchor","left");
svg.append("rect").attr("x",1650).attr("y",400).attr("width",30).attr("height",30).attr("fill","grey");
svg.append("text").attr("x",1690).attr("y",420).text("League Average").attr("font-size",15).attr("text-anchor","left");

svg.append("rect").attr("x",1500).attr("y",450).attr("width",teamdata[0].w*10).attr("height",30).attr("fill","blue").attr("id","teamwin");
svg.append("rect").attr("x",1500).attr("y",480).attr("width",avgwin*10).attr("height",30).attr("fill","grey");
svg.append("text").attr("x",1510).attr("y",475).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","teamwinnum").text(teamdata[str.selectedIndex].w);
svg.append("text").attr("x",1510).attr("y",505).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","avgwinnum").text(avgwin.toFixed(1));
svg.append("text").attr("x",1460).attr("y",490).text("Wins").attr("font-size",20).attr("text-anchor","middle");

svg.append("rect").attr("x",1500).attr("y",550).attr("width",teamdata[0].pts/10).attr("height",30).attr("fill","blue").attr("id","teamscore");;
svg.append("rect").attr("x",1500).attr("y",580).attr("width",avgscore/10).attr("height",30).attr("fill","grey");
svg.append("text").attr("x",1510).attr("y",575).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","teamscorenum").text(teamdata[str.selectedIndex].pts);
svg.append("text").attr("x",1510).attr("y",605).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","avgscorenum").text(avgscore.toFixed(1));
svg.append("text").attr("x",1460).attr("y",570).text("Points").attr("font-size",20).attr("text-anchor","middle");
svg.append("text").attr("x",1460).attr("y",600).text("Scored").attr("font-size",20).attr("text-anchor","middle");

svg.append("rect").attr("x",1500).attr("y",650).attr("width",teamdata[0].opts/10).attr("height",30).attr("fill","blue").attr("id","teamallow");;
svg.append("rect").attr("x",1500).attr("y",680).attr("width",avgallow/10).attr("height",30).attr("fill","grey");
svg.append("text").attr("x",1510).attr("y",675).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","teamallownum").text(teamdata[str.selectedIndex].opts);
svg.append("text").attr("x",1510).attr("y",705).attr("font-size",20).attr("font-weight","bold").attr("fill","white").attr("id","avgallownum").text(avgallow.toFixed(1));
svg.append("text").attr("x",1460).attr("y",670).text("Points").attr("font-size",20).attr("text-anchor","middle");
svg.append("text").attr("x",1460).attr("y",700).text("Allowed").attr("font-size",20).attr("text-anchor","middle");



svg.append("text").attr("x",1620).attr("y",370).text("Kansas").attr("font-size",20).attr("text-anchor","middle").attr("font-weight","bold").attr("id","uniname"); //college name
svg.append("text").attr("x",1600).attr("y",390).text("AP Ranking:").attr("font-size",20).attr("text-anchor","middle").attr("font-weight","bold"); //rankings
svg.append("text").attr("x",1680).attr("y",390).text(function(){return "1 "}).attr("font-size",20).attr("text-anchor","middle").attr("font-weight","bold").attr("font-family","Verdana").attr("id","ranktext");
//home away pies

var mainarc=d3.arc().innerRadius(40).outerRadius(55).startAngle(0).endAngle(hwratio[0]*2*Math.PI); //arc for home wins
var otherarc=d3.arc().innerRadius(40).outerRadius(55).startAngle(hwratio[0]*2*Math.PI).endAngle(2*Math.PI); //arc for home losses
svg.append("path").attr("d",mainarc).attr("transform","translate (1520 800)").attr("fill","blue").attr("id","hwinarc3"); 
svg.append("path").attr("d",otherarc).attr("transform","translate (1520 800)").attr("fill","red").attr("id","hwinarc4");

svg.append("text").attr("x",1520).attr("y",880).attr("font-size",20).attr("fill","black").attr("font-weight","bold").text("Wins: "+teamdata[str.selectedIndex].hw).attr("text-anchor","middle").attr("id","hwnum").attr("opacity",0.0);;
svg.append("text").attr("x",1520).attr("y",900).attr("font-size",20).attr("fill","black").attr("font-weight","bold").text("Losses: "+teamdata[str.selectedIndex].hl).attr("text-anchor","middle").attr("id","hlnum").attr("opacity",0.0);;
svg.append("text").attr("x",1520).attr("y",805).text("Home").attr("font-size",15).attr("text-anchor","middle").attr("font-weight","bold").on("mouseover", function() {
	svg.select("#hwnum").text("Wins: "+teamdata[str.selectedIndex].hw).transition().attr("opacity",1.0);
	svg.select("#hlnum").text("Losses: "+teamdata[str.selectedIndex].hl).transition().attr("opacity",1.0); //wins and losses appear if hovered over
}).on("mouseout", function() {
	svg.select("#hwnum").transition().attr("opacity",0.0);
	svg.select("#hlnum").transition().attr("opacity",0.0);
});

var amainarc=d3.arc().innerRadius(40).outerRadius(55).startAngle(0).endAngle(awratio[0]*2*Math.PI); //arc for away wins
var aotherarc=d3.arc().innerRadius(40).outerRadius(55).startAngle(awratio[0]*2*Math.PI).endAngle(2*Math.PI); //arc for away losses
svg.append("path").attr("d",amainarc).attr("transform","translate (1720 800)").attr("fill","blue").attr("id","awinarc3"); 
svg.append("path").attr("d",aotherarc).attr("transform","translate (1720 800)").attr("fill","red").attr("id","awinarc4");
svg.append("text").attr("x",1720).attr("y",880).attr("font-size",20).attr("fill","black").attr("font-weight","bold").text("Wins: "+teamdata[str.selectedIndex].aw).attr("text-anchor","middle").attr("id","awnum").attr("opacity",0.0);
svg.append("text").attr("x",1720).attr("y",900).attr("font-size",20).attr("fill","black").attr("font-weight","bold").text("Losses: "+teamdata[str.selectedIndex].al).attr("text-anchor","middle").attr("id","alnum").attr("opacity",0.0);;
svg.append("text").attr("x",1720).attr("y",805).text("Away").attr("font-size",15).attr("text-anchor","middle").attr("font-weight","bold").on("mouseover", function() {
	svg.select("#awnum").text("Wins: "+teamdata[str.selectedIndex].aw).transition().attr("opacity",1.0);
	svg.select("#alnum").text("Losses: "+teamdata[str.selectedIndex].al).transition().attr("opacity",1.0); //wins and losses appear if hovered over
}).on("mouseout", function() {
	svg.select("#awnum").transition().attr("opacity",0.0);
	svg.select("#alnum").transition().attr("opacity",0.0);
});


function  clickFunction() {
	str=document.getElementById('dropdown');
	console.log(str.selectedIndex);
	var i=str.selectedIndex+1;
	sessionStorage.setItem("thecity",i);
	
	d3.select("#mainimage").attr("href",function() { return "logos/"+i+".png"}); //change the logo
	d3.select("#ranktext").text(function() { 
			var i=str.selectedIndex+1; //change rank
			return i+" "
		});
	svg.select("#teamwin").transition().duration(500).attr("width",teamdata[str.selectedIndex].w*10);
	svg.select("#teamscore").transition().duration(500).attr("width",teamdata[str.selectedIndex].pts/10);
	svg.select("#teamallow").transition().duration(500).attr("width",teamdata[str.selectedIndex].opts/10); //change the graphs for each team
	mainarc.endAngle(hwratio[str.selectedIndex]*2*Math.PI);
	otherarc.startAngle(hwratio[str.selectedIndex]*2*Math.PI);
	svg.select("#hwinarc3").transition().attr("d",mainarc);
	svg.select("#hwinarc4").transition().attr("d",otherarc);
	amainarc.endAngle(awratio[str.selectedIndex]*2*Math.PI);
	aotherarc.startAngle(awratio[str.selectedIndex]*2*Math.PI);
	svg.select("#awinarc3").transition().attr("d",amainarc);
	svg.select("#awinarc4").transition().attr("d",aotherarc); //change the home and away pies
	svg.select("#uniname").text(str.value);
	svg.select("#teamwinnum").transition().text(teamdata[str.selectedIndex].w);
	svg.select("#teamscorenum").transition().text(teamdata[str.selectedIndex].pts);
	svg.select("#teamallownum").transition().text(teamdata[str.selectedIndex].opts); //change the stat values
	
}