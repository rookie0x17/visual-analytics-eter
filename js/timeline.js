// set the dimensions and margins of the graph
var margin6 = {top: 100, right: 10, bottom: 30, left: 30},
    width6 = 600 - margin6.left - margin6.right,
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

d3.select("#timeline-svg").append("circle").attr("cx",150).attr("cy",30).attr("r", 6).style("fill", "#69b3a2"); //missing perc
d3.select("#timeline-svg").append("circle").attr("cx",150).attr("cy",60).attr("r", 6).style("fill", "orange"); //consistency
d3.select("#timeline-svg").append("text").attr("x", 170).attr("y", 30).text("% missing value").style("font-size", "15px").attr("alignment-baseline","middle");
d3.select("#timeline-svg").append("text").attr("x", 170).attr("y", 60).text("% consistency").style("font-size", "15px").attr("alignment-baseline","middle");       
          
d3.csv("data/statistic_per_uni.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["missing_perc", "cons_perc"];
        
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
        name: grpName,
        values: data.filter(function(d){
            if(arr_country.length == 0){
                return d.ETER_ID == "FR0003";
            } else {
                return (arr_country.includes(d.country_code) || arr_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value;
            }
            
        }).map(function(d) {
            return {time: d.reference_year, value: +d[grpName] * 100};
               })
        };
    });   
    
    

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    var years = [2011,2017];
    // Add X axis --> it is a date format
    var x6 = d3.scaleLinear()
      .domain(years)
      .range([ 0, 500 ]);
    svg6.append("g")
      .attr("transform", "translate(0," + height6 + ")")
      .call(d3.axisBottom(x6).ticks(7));

      var y6 = d3.scaleLinear()
      .domain( [0,100])
      .range([ height6, 0 ]);
    svg6.append("g")
      .call(d3.axisLeft(y6));

    /*
      var line = d3.line()
      .x(function(d) { return x6(+d.time) })
      .y(function(d) { return y6(+d.value) });
    svg6.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .attr("id" , "line-uni")
        .style("stroke-width", 4)
        .style("fill", "none")

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
          .attr("id" , "point-uni")
          .attr("stroke", "white")*/

   
    
});