var canvaswidth=1640;
var canvasheight=945;
var playerdata=JSON.parse(playerdata);
var posdata=new Array;
d3.select("body").append("div").attr("id","svgcontainer");
var svg = d3.select("#svgcontainer")
        .append("svg")
        .attr("width", canvaswidth-400)
        .attr("height", canvasheight); //initializing the SVG canvas
		
var thisteam=new Array;		
var uni=sessionStorage.getItem("thecity");
var temp;
var n=0;
playerdata.forEach( function(data,index) {
	if (data.teamid==uni) {
		n++;
	}
})
var list=d3.select("#svgcontainer").append("select").attr("size",n+1).attr("style","float:left").attr("id","menu"); //popoulating the list with players from that team
playerdata.forEach( function(data,index) {
	if (data.teamid==uni) {
		thisteam.push(data);
		
	}
});
d3.select("#svgcontainer").append("button").text("Go").attr("type","button").attr("onclick","window.location.href = 'PlayerInfo.html';").attr("style","float:left");
thisteam.forEach( function(data,index) {
	list.append("option").attr("value",data.name).text(data.name);
	posdata.push(data.pos);
});
svg.append("rect").attr("id","reco").attr("x",0).attr("y",0).attr("width",canvaswidth-400).attr("height",canvasheight).attr("fill-opacity",1.0)
	.attr("fill","black").attr("stroke-width",4).attr("stroke","black");
svg.append("image").attr("x",0).attr("y",40).attr("width",canvaswidth*0.7).attr("height",canvasheight*0.9).attr("href","halfcourt.png");
svg.append("image").attr("x",330).attr("y",550).attr("width",canvaswidth*0.3).attr("height",canvasheight*0.3).attr("href","logos/"+uni+".png").attr("opacity",0.5); //placing the team logo

svg.append("circle").attr("cx",390).attr("cy",430).attr("r",50).attr("fill","blue").attr("id","circle1");
svg.append("circle").attr("cx",390).attr("cy",430).attr("r",40).attr("fill","#1196fe");
svg.append("text").text(posdata[0]).attr("text-anchor","middle").attr("x",390).attr("y",440).attr("fill","white").attr("font-size",30).attr("font-weight","bold").attr("id","text1"); 

svg.append("circle").attr("cx",765).attr("cy",430).attr("r",50).attr("fill","blue").attr("id","circle2");
svg.append("circle").attr("cx",765).attr("cy",430).attr("r",40).attr("fill","#1196fe");
svg.append("text").text(posdata[1]).attr("text-anchor","middle").attr("x",765).attr("y",440).attr("fill","white").attr("font-size",30).attr("font-weight","bold").attr("id","text2");

svg.append("circle").attr("cx",280).attr("cy",230).attr("r",50).attr("fill","blue").attr("id","circle3");
svg.append("circle").attr("cx",280).attr("cy",230).attr("r",40).attr("fill","#1196fe");
svg.append("text").text(posdata[2]).attr("text-anchor","middle").attr("x",280).attr("y",240).attr("fill","white").attr("font-size",30).attr("font-weight","bold").attr("id","text3");

svg.append("circle").attr("cx",875).attr("cy",230).attr("r",50).attr("fill","blue").attr("id","circle4");
svg.append("circle").attr("cx",875).attr("cy",230).attr("r",40).attr("fill","#1196fe");
svg.append("text").text(posdata[3]).attr("text-anchor","middle").attr("x",875).attr("y",240).attr("fill","white").attr("font-size",30).attr("font-weight","bold").attr("id","text4"); //placing each of the circles to represent a player (as 4 is the minimum value, 4 have been statically placed)

if (thisteam.length>4) {
	svg.append("circle").attr("cx",580).attr("cy",230).attr("r",50).attr("fill","blue").attr("id","circle5");
	svg.append("circle").attr("cx",580).attr("cy",230).attr("r",40).attr("fill","#1196fe");
	svg.append("text").text(posdata[4]).attr("text-anchor","middle").attr("x",580).attr("y",240).attr("fill","white").attr("font-size",30).attr("font-weight","bold").attr("id","text5"); //if 5 players
}

if (thisteam.length>5) {
	svg.append("circle").attr("cx",1120).attr("cy",230).attr("r",50).attr("fill","blue").attr("id","circle6");
	svg.append("circle").attr("cx",1120).attr("cy",230).attr("r",40).attr("fill","#1196fe");
	svg.append("text").text("SUB("+posdata[5]+")").attr("text-anchor","middle").attr("x",1120).attr("y",240).attr("fill","white").attr("font-size",20).attr("font-weight","bold").attr("id","text6"); //if 6 players
}

if (thisteam.length>6) {
	svg.append("circle").attr("cx",1120).attr("cy",300).attr("r",50).attr("fill","blue").attr("id","circle7");
	svg.append("circle").attr("cx",1120).attr("cy",300).attr("r",40).attr("fill","#1196fe");
	svg.append("text").text("SUB("+posdata[6]+")").attr("text-anchor","middle").attr("x",1120).attr("y",310).attr("fill","white").attr("font-size",20).attr("font-weight","bold").attr("id","text6"); //if 7 players
}


list.attr("onchange","changefunc()");

function changefunc() {
	str=document.getElementById('menu');
	sessionStorage.setItem("thename",str.value);
	sessionStorage.setItem("theuni",uni);
	var i=str.selectedIndex+1;
	svg.select("#text"+i).transition().duration(500).attr("fill","black");
	svg.select("#circle"+i).transition().duration(500).attr("fill","red"); //highlighting the corresponding circle according to selected player
	var j;
	for( j=1;j<=thisteam.length;j++) 
		if (i!=j) {
			svg.select("#text"+j).transition().duration(500).attr("fill","white");
			svg.select("#circle"+j).transition().duration(500).attr("fill","blue"); //dehighlighting the other players
		}
}
