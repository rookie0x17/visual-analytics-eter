// set the dimensions and margins of the graph
var margin = {top: 70, right: 10, bottom: 10, left: 100},
    width = 600 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

var svg1 = d3.select("#pca-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");  
  
  

var arr_country = [];

var div = d3.select("#pca-chart").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

  d3.csv("data/pca.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-0.1e+9, 2.5e+9])
    .range([ 0, width*2.3 ]);
  svg1.append("g")
    .attr("id" , "x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    svg1.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top -10) + ")")
      .style("text-anchor", "middle").style("fill" , "black")
      .text("X1");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-600e+2, 300e+3])
    .range([ height, 0]);
  svg1.append("g")
    .attr("id" , "y")
    .call(d3.axisLeft(y));

    svg1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left )
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("X2");

  // Add dots
  svg1.append('g')
    .attr("id" , "pca-chart-1")
    .selectAll("dot")
    .data(data)
    .enter()
    .filter(function(d){
      return d.reference_year == ref_year.value;
    })
    .append("circle")
      .attr("cx", function (d) { return x(d.x); } )
      .attr("cy", function (d) { return y(d.y); } )
      .attr("r", 1.5)
      .attr("class" , function(d){return d.country_code;})
      .attr("id" , "pca-circle")
      .style("fill", "#69b3a2")
      .on('mouseover', mouseoverPCA)
      .on('mouseout',mouseoutPCA);
  
 

});

function mouseoverPCA(d){
  // Highlight hovered province

  d3.select(this).style('fill', 'blue').attr("r" , 3);
  
  d3.selectAll("."+this.className.baseVal).style("fill" , "blue").attr("r" , 3);

  div.transition()		
      .duration(200)		
      .style("opacity", .8);	
  div.html(d.institution_name)	
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY - 100) + "px");	

}

function mouseoutPCA(d){
  // Highlight hovered province

  d3.select(this).style('fill', '#69b3a2').attr("r" , 1.5);

  d3.selectAll("." + this.className.baseVal).style("fill" , "#69b3a2").attr("r" , 1.5);
  
  div.style("opacity" , "0");
  	

}

