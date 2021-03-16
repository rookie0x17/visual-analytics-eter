//Width and height
var w = 636;
var h = 450;

//Define map projection
/*
var projection = d3.geo.azimuthalEquidistant()
                       .translate([w/5, h/1.7])
                       .scale([500]);
*/
var projection = d3.geo.mercator().translate([w/3, h/1.7]).scale([300]);

//Define path generator
var path = d3.geo.path().projection(projection);

//Create SVG element
var svg = d3.select("#map-chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", 'background');

const zoom = d3.zoom()
.scaleExtent([1, 4])
.on('zoom', zoomed);

svg.call(zoom);

var div = d3.select("#map-chart").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);
            
//Load in GeoJSON data
d3.json("js/europe.geojson", function(json) {

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("id" , "map-path")
       .attr("d", path)
       .attr("transform", "translate(0,300)")
       .style("fill", "#99cbff")
       .on('mouseover', mouseOverCount)
       .on('mouseout', mouseOutCount)
       .on('click', clicked);
       

});

d3.csv("data/FINALE.csv", function(rows){

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("university")
        .data(rows)
        .enter()
        .append("circle")
        .attr("class","university")
        .attr("transform", "translate(0,300)")
        .attr("fill" , "orange")
        .attr("cx", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[0];})
        .attr("cy", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[1];})
        .attr("r", "1px")
        .on('mouseover', mouseoverUni)
        .on('mouseout', mouseoutUni);
   

});

function zoomed() {
    svg
      .selectAll('path') // To prevent stroke width from scaling
      .attr('transform', d3.event.transform);
    
    svg
      .selectAll('circle') // To prevent stroke width from scaling
      .attr('transform', d3.event.transform);
  }

function mouseOverCount(d){
    // Highlight hovered province
    d3.select(this).style('fill', 'blue');
    div.transition()		
        .duration(200)		
        .style("opacity", .8);	
    div.html(d.properties.NAME)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 100) + "px");
    

}

function mouseOutCount(d){
    d3.select(this).style('fill', '#99cbff');
}

function clicked(d){
    console.log(d.properties.ISO3);
}

function mouseoverUni(d){
    // Highlight hovered province
    console.log(d)
    d3.select(this).style('fill', 'red');
    div.transition()		
        .duration(200)		
        .style("opacity", .8);	
    div.html(d.institution_name)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 100) + "px");		

}

function mouseoutUni(d){
    d3.select(this).style('fill', 'green');
}

            
            
            
            


            

       
 