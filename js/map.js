//global var 

ref_year = document.getElementById("ref_year");




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
.scaleExtent([1, 8])
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
        .filter(function(d){
           
            return d.reference_year == ref_year.value;
        })
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
    if(!arr_country.includes(d.properties.ISO2)){
        d3.select(this).style('fill', 'blue');
    }

    div.transition()		
            .duration(200)		
            .style("opacity", .8);	
        div.html(d.properties.NAME)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 100) + "px");

}

function mouseOutCount(d){
    if(!arr_country.includes(d.properties.ISO2)){
        d3.select(this).style('fill', '#99cbff');
    }
}

function clicked(d){
    if(!arr_country.includes(d.properties.ISO2)){
        arr_country.push(d.properties.ISO2);
    } else {
        index = arr_country.indexOf(d.properties.ISO2);
        if (index > -1) {
            arr_country.splice(index, 1);
        }
    }
    drawPCA();
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

            
            
function drawPCA(){

    var g = d3.selectAll('g')
    g.selectAll("circle")
    .remove();

    
    d3.csv("data/pca.csv", function(data) {

        var x = d3.scaleLinear()
        .domain([-0.1e+9, 2.5e+9])
        .range([ 0, width*2.3 ]);
     
    
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-600e+2, 300e+3])
        .range([ height, 0]);
    


        var g = d3.select('#pca-chart-1')
        .selectAll("dot")
        .data(data)
        .enter()
        .filter(function(d){
            if(arr_country.length == 0){
                return d.reference_year == ref_year.value;
            } else {
                return arr_country.includes(d.country_code) && d.reference_year == ref_year.value;
            }
            
        })
        .append("circle")
          .attr("cx", function (d) {return x(d.x); } )
          .attr("cy", function (d) { return y(d.y); } )
          .attr("r", 1.5)
          .style("fill", "#69b3a2")
          .on('mouseover', mouseover);

        
        
    }); 
}

function drawMap(){

    var g = d3.selectAll('.university')
    .remove();

    d3.csv("data/FINALE.csv", function(rows){

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("university")
            .data(rows)
            .enter()
            .filter(function(d){
               
                return d.reference_year == ref_year.value;
            })
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

}


ref_year.addEventListener('change', updateCharts);

function updateCharts(e){
    console.log(e.target.value);
    drawPCA();
    drawMap();
}
            


            

       
 