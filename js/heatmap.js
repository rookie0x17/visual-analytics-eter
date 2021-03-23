type= document.getElementById("var-select")


// Labels of row and columns
var myGroups = ["P_E", "N-P_E", "EXP_UN", "TOT_C_E", "CAP_E", "TOT_C_B", "TOT_T_P_F", "STU_F_F", "REV_UN", "TOT_C_REV"]
var myGroups2 = ["S_WOM_S_5-7", "S_WOM_A_S", "S_FOR_S_5-7", "PHD_I", "E_TOT_I_S","E_TOT_O_S"]
var myGroups3=["TOT_A_S","TOT_S","LOW_D_D","HIGH_D_D","TOT_S_E_5","TOT_S_E_6",
"TOT_S_E_7","TOT_S_E_7_L","TOT_S_E_5-7","TOT_G_5","TOT_G_6","TOT_G_7","TOT_G_7_L",
"TOT_G_5-7","TOT_S_E_8","TOT_G_8"]


var myVars = ["Zero Values", "Missing Values", "% of Total Values", "Total Zero Missing Values", "% Total Zero Missing Values", "c_val", "s_val", "nc_val", "out_val"]

	// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 90},
  width2 = 1400 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
  
 var svg2 = d3.selectAll("#heatmap")
.append("svg")
  .attr("width", width2 + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  
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
  .padding(0.01);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#0000d2"])
  .domain([0,1000])
  
   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
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
if (value=='Educational'){
	
	
// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .domain(myGroups2)
  .padding(0.01);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#0000d2"])
  .domain([0,1000])
	

   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
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

if (value=='Instruction'){
	
	
// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width2 ])
  .domain(myGroups3)
  .padding(0.01);
svg2.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg2.append("g")
  .call(d3.axisLeft(y));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#0000d2"])
  .domain([0,1000])
	

   // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
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
