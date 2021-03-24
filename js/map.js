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
.scaleExtent([1, 10])
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
            .attr("transform", d3.select("#map-path").attr('transform'))
            .attr("fill" , "orange")
            .attr("cx", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[0];})
            .attr("cy", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[1];})
            .attr("r", "0.5px")
            .on('mouseover', mouseoverUni)
            .on('mouseout', mouseoutUni)
            .on('click' , mouseClickUni);
   

});



function zoomed() {
    svg
      .selectAll('path') // To prevent stroke width from scaling
      .attr('transform', d3.event.transform);
    
    svg
      .selectAll('circle')
      .style('r' , '0.5px') // To prevent stroke width from scaling
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
    drawTable();
}

function mouseoverUni(d){
    // Highlight hovered province
    if(!arr_uni.includes(d.ETER_ID)){
        d3.select(this).style('fill','red').style('r' , '2px');
    }

    console.log(d)
    
    div.transition()		
        .duration(200)		
        .style("opacity", .8);	
    div.html(d.institution_name)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 100) + "px");		

}

function mouseoutUni(d){
    if(!arr_uni.includes(d.ETER_ID)){
        d3.select(this).style('fill', 'orange').style('r','0.5px');
    }
}

function mouseClickUni(d){

    if(!arr_uni.includes(d.ETER_ID)){
        arr_uni.push(d.ETER_ID);
    } else {
        index = arr_uni.indexOf(d.ETER_ID);
        if (index > -1) {
            arr_uni.splice(index, 1);
        }
    }
    console.log(arr_uni);
    drawPCA();
    drawTable();

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
            if(arr_country.length == 0 && arr_uni.length == 0){
                return d.reference_year == ref_year.value;
            } else {
                return (arr_country.includes(d.country_code) || arr_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value;
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
                .attr("transform", d3.select("#map-path").attr('transform'))
                .attr("fill" , "orange")
                .attr("cx", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[0];})
                .attr("cy", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[1];})
                .attr("r", "1px")
                .on('mouseover', mouseoverUni)
                .on('mouseout', mouseoutUni);
       
    
    });

    

}

function drawTable(){
    d3.selectAll('tbody')
    .remove();
    d3.selectAll('thead')
    .remove();
    d3.csv("data/statistic_per_uni.csv", function(error, data) {
        var titles_tocatch = {
            institution_name: "vuoto",
            missing_perc: 0,
            cons_perc:0,
            timeillnes_occ:0,
        };
        
        var titles = d3.keys(titles_tocatch);
        var sortAscending = true;

        var headers = d3.select('table').append('thead').append('tr')
        .selectAll('th')
        .data(["Institution name" , "Missing value" , "Consistency" , "Timeilness"]).enter()
        .append('th')
        .text(function (d) {
             return d;
         })
        .on('click', function (d) {
          var cerca = "";
         if(d == "Institution name"){
           cerca = "institution_name" ;
         } else if (d == "Missing value") {
           cerca = "missing_perc";
         } else if (d == "Consistency"){
           cerca = "cons_perc"
         } else if (d == "Timeilness"){
           cerca = "timeillnes_occ"
         }



            headers.attr('class', 'header');
            
            if (sortAscending) {
              rows.sort(function(a, b) { return b[cerca] < a[cerca]; });
              sortAscending = false;
              this.className = 'aes';
              console.log("qui");
            } else {
              rows.sort(function(a, b) { return b[cerca] > a[cerca]; });
              sortAscending = true;
              this.className = 'des';
            }
            
        });
    
    var rows = d3.select('table').append('tbody').selectAll('tr')
                 .data(data).enter().filter(function(d){
                    if(arr_country.length == 0 && arr_uni.length == 0){
                        return d.reference_year == ref_year.value;
                    } else {
                        return (arr_country.includes(d.country_code) || arr_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value;
                    }
                 })
                 .append('tr')
                 .attr("class", "row-line");

    rows.selectAll('td')
      .data(function (d) {
          return titles.map(function (k) {
              return { 'value': d[k], 'name': k};
          });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
          return d.name;
      })
      .text(function (d) {
          if(d.name == "missing_perc" || d.name == "cons_perc"){
            return d.value*100 + "%";
          } else if(d.name == "timeillnes_occ") {
            return Math.trunc(d.value) + " of " + "7";
          } else {
              return d.value;
          }
      })
      .style("allign" , "center");
    });
}


ref_year.addEventListener('change', updateCharts);

function updateCharts(e){
    console.log(e.target.value);
    drawPCA();
    drawMap();
    drawTable();
    
}
            


            

       
 