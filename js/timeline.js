// set the dimensions and margins of the graph
var margin6 = {top: 70, right: 50, bottom: 50, left: 250},
    width6 = 800 - margin6.left - margin6.right,
    height6 = 400 - margin6.top - margin6.bottom;

// append the svg object to the body of the page
var svg6 = d3.select("#timeline")
  .append("svg")
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
    .attr("id" , "timeline-svg")
  .append("g")
    .attr("transform",
          "translate(" + margin6.left + "," + margin6.top + ")");

var legend = 1;
 //missing perc
 //consistency
d3.select("#timeline-svg").append("text").attr("x", 70).attr("y", 30).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle");
d3.select("#timeline-svg").append("text").attr("x", 60).attr("y", 60).text("%miss").style("font-size", "10px").attr("alignment-baseline","middle"); 
d3.select("#timeline-svg").append("text").attr("x", 130).attr("y", 60).text("%cons").style("font-size", "10px").attr("alignment-baseline","middle");      

d3.select("#timeline-svg").append("text").attr("id" , "all-legend").attr("x", 0).attr("y", 90).text("All").style("font-size", "10px").attr("alignment-baseline","middle");
d3.select("#timeline-svg").append("circle").attr("id" , "all-legend").attr("cx",80).attr("cy",85).attr("r", 5).style("fill", "#e41a1c");
d3.select("#timeline-svg").append("circle").attr("id" , "all-legend").attr("cx",150).attr("cy",85).attr("r", 5).style("fill", "#377eb8");



d3.csv("data/stastic_per_entiredb.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["missing_perc", "cons_perc"];
        
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
        name: grpName,
        values: data.filter(function(d){
           return true;
            
        }).map(function(d) {
            return {time: d.reference_year, value: +d[grpName] * 100};
               })
        };
    });   
    
    

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet1);

    var years = [2011,2017];
    // Add X axis --> it is a date format
    var x6 = d3.scaleLinear()
      .domain(years)
      .range([ 0, 500 ]);
    svg6.append("g")
      .attr("transform", "translate(0," + height6 + ")")
      .call(d3.axisBottom(x6).ticks(7));

      svg6.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top - 40) + ")")
      .style("text-anchor", "middle").style("fill" , "black")
      .text("Years");



      var y6 = d3.scaleLinear()
      .domain( [0,100])
      .range([ height6, 0 ]);
    svg6.append("g")
      .call(d3.axisLeft(y6));


      svg6.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage");

    
      var line = d3.line()
      .x(function(d) { return x6(+d.time) })
      .y(function(d) { return y6(+d.value) });
    svg6.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .attr("id" , "line-entire-db-timeline")
        .style("stroke-width", 4)
        .style("fill", "none")
        .on('mouseover', mouseoverLineEntiredb)
        .on('mouseout', mouseoutLineEntiredb)

        svg6
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
          .append('g')
          .style("fill", function(d){ return myColor(d.name) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function(d){ return d.values })
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x6(d.time)  })
          .attr("cy", function(d) { return y6(d.value)  })
          .attr("r", 5)
          .attr("id" , "point-entiredb-timeline")
          .attr("stroke", "white")

   
    
});

function mouseoverLineEntiredb(d){
  
  if(legend==1){
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 0.5);
    
    d3.select(this).style('stroke-width', 8).style('opacity', 0.7);

    div_timeline.transition()		
          .duration(200)		
          .style("opacity", .8);	
      div_timeline.html("All")	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 100) + "px");
  }
  d3.selectAll("#line-country-timeline").style("opacity" , 0.5);
  d3.selectAll("#line-uni").style("opacity" , 0.5);
    

  

 

}

function mouseoutLineEntiredb(d){
  if(legend==1){
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 1);
    
    d3.select(this).style('stroke-width', 4).style('opacity', 1);
    div_timeline.style("opacity" , 0);

  }
  d3.selectAll("#line-country-timeline").style("opacity" , 1);
  d3.selectAll("#line-uni").style("opacity" , 1);


  

  

}


button_remove_all = document.getElementById("legend-clear");

button_remove_all.onclick = function(){

  if(legend == 1){

    d3.selectAll("#all-legend").style("opacity" , 0);
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 0);
    d3.selectAll("#point-entiredb-timeline").style("opacity" , 0);
    legend = 0;

    button_remove_all.innerHTML = "Display All";
    
  } else {

    d3.selectAll("#all-legend").style("opacity" , 1);
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 1);
    d3.selectAll("#point-entiredb-timeline").style("opacity" , 1);
    button_remove_all.innerHTML = "Remove All";
    legend=1;
  }
};
