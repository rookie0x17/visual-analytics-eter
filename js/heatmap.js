type= document.getElementById("var-select")


// Labels of row and columns
var myGroups = ["P_E", "N-P_E", "EXP_UN", "TOT_C_E", "CAP_E", "TOT_C_B", "TOT_T_P_F", "STU_F_F", "REV_UN", "TOT_C_REV"]
var myGroups2 = ["S_WOM_S_5-7", "S_WOM_A_S", "S_FOR_S_5-7", "PHD_I", "E_TOT_I_S","E_TOT_O_S"]
var myGroups3=["TOT_A_S","TOT_S","TOT_S_E_5-7","TOT_G_5-7","TOT_S_E_8","TOT_G_8"]




var myVars = ["Zero Values", "Missing Values",  "Tot_Z_M_Val", "c_val", "s_val", "nc_val", "out_val"]

	// set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 30, left: 80},
  width2 = 650 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
  
 var svg2 = d3.selectAll("#heatmap")
.append("svg")
  .attr("width", width2 + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", 'background')
  .attr("id" , "heatmap-svg");

//d3.select("#heatmap-svg").append("circle").attr("cx",50).attr("cy",30).attr("r", 6).style("fill", "#9acd32"); 
  d3.select("#heatmap-svg").append("text").attr("x", 150).attr("y", 10).text("good value").style("font-size", "15px").attr("alignment-baseline","middle");
  //d3.select("#heatmap-svg").append("circle").attr("cx",100).attr("cy",30).attr("r", 6).style("fill", "	#32cd32"); 
   //d3.select("#heatmap-svg").append("circle").attr("cx",150).attr("cy",30).attr("r", 6).style("fill", "#808000"); 
    //d3.select("#heatmap-svg").append("circle").attr("cx",200).attr("cy",30).attr("r", 6).style("fill", "#cd853f"); 
	 //d3.select("#heatmap-svg").append("circle").attr("cx",250).attr("cy",30).attr("r", 6).style("fill", "#dc143c"); 
	 //d3.select("#heatmap-svg").append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "red"); 
	 d3.select("#heatmap-svg").append("text").attr("x", 450).attr("y", 10).text("bad value").style("font-size", "15px").attr("alignment-baseline","middle");
	 
 
	
	
var dataSet = [1, 2, 3, 4, 5, 6]
	var myColorTab = d3.scaleLinear()
  .range(["	#9acd32", "red"])
  .domain([1,6])
  var i = 20;
   dataSet.forEach(element => {
        
        
       d3.select("#heatmap-svg").data(dataSet).append("rect").attr("x",150+i).attr("y",20).attr("width", 50).attr("height", 20).style("fill", function(d){return myColorTab(element) })
        
        i=i+50;
    });

	
	
	

	 
  
   // create a tooltip
  var tooltip = d3.select("#heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    
drawHeatmap(type.value);
 


function drawHeatmap(value){
	var g= d3.select("#heatmap").select('svg').selectAll('g')
	.remove()
	
	var svg2 = d3.select("#heatmap").selectAll("svg")
		.attr("id" , "heatmap-svg")
		.append("g")
		.attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
		

	


//Read the data
d3.csv("data/heatmap.csv", function(data) {
if (value=='Financial'){
		

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .domain(myGroups)
  .padding(0.04);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.04);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["	#9acd32", "red"])
  .domain([0,800])
  
   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black" )
	  .attr("stroke-width", 2.5)
      .style("opacity", .5)

  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
     tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
	

svg2.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
      .filter(function(d){return myGroups.includes(d.group)})
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    
  // add the squares
}
if (value=='Other'){
	
	
// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .domain(myGroups2)
  .padding(0.02);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.02);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["#9acd32", "red"])
  .domain([0,800])
	

   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black" )
	  .attr("stroke-width", 2.5)
      .style("opacity", .5)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
     tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }

  
svg2.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
      .filter(function(d){return myGroups2.includes(d.group)})
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
      
}

if (value=='Educational'){
	
	
// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .domain(myGroups3)
  .padding(0.02);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.03);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["#9acd32", "red"])
  .domain([0,800])
	

   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black" )
	  .attr("stroke-width", 2.5)
      .style("opacity", .5)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
     tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }

  
svg2.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
      .filter(function(d){return myGroups3.includes(d.group)})
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
      
}

})
}


type.addEventListener('change',updateHeatmap);

function updateHeatmap(e){
	console.log(e.target.value);
	drawHeatmap(e.target.value);
}
