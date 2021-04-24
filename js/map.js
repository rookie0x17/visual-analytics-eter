//global var 

ref_year = document.getElementById("ref_year");
button_country_clear = document.getElementById("country-clear");
button_uni_clear = document.getElementById("uni-clear");
type= document.getElementById("var-select")

//slider

slider_miss = document.getElementById("range_missing");
slider_cons = document.getElementById("range_consistency");

apply_filter_btn = document.getElementById("filter");



var filter_missing=100;
var filter_consistency=0;

slider_miss.oninput = function(){
    document.getElementById("missing_value_slider").innerHTML = this.value + "%";
    filter_missing = this.value;
    
    drawPCA();
    drawTable();
   
};


slider_cons.oninput = function(){
    document.getElementById("cons_value_slider").innerHTML = this.value + "%";
    filter_consistency = this.value;

    drawPCA();
    drawTable();
    
};

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};

slider_miss.onstop = function(){
    drawTable();
};



button_country_clear.onclick = function(){
    arr_country=[]
    console.log("clickato");
    drawPCA();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    drawTimeline();
    svg.selectAll("path").style("fill", "#cc9966");
};
button_uni_clear.onclick = function(){
    arr_uni=[]
    console.log("clickato");
    drawPCA();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    drawTimeline();
    svg.selectAll(".university").style('fill', 'black').style('r','0.5px');
};



var margin_radar = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 200
},
    width_radar = Math.min(550, window.innerWidth - 10) - margin_radar.left - margin_radar.right,
    height_radar = Math.min(350, window.innerHeight - margin_radar.top - margin_radar.bottom - 20);

var color = d3.scale.ordinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);

var radarChartOptions = {
    w: width_radar,
    h: height_radar,
    margin: margin_radar,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color
};
arr_country=[]
arr_uni=[]



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
            .attr("class", 'background-map');

const zoom = d3.zoom()
.scaleExtent([1, 10])
.on('zoom', zoomed);

svg.call(zoom);

var div = d3.select("#map-chart").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

var div_timeline = d3.select("#timeline").append("div")	
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
       .style("fill", "#cc9966")
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
            .attr("fill" , "black")
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
      .attr('transform', d3.event.transform);
  }

function mouseOverCount(d){
    // Highlight hovered province
    if(!arr_country.includes(d.properties.ISO2)){
        d3.select(this).style('fill', '#86592d');
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
        d3.select(this).style('fill', '#cc9966');
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
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
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
        d3.select(this).style('fill', 'black').style('r','0.5px');
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
    
    drawPCA();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    drawTimeline();
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
          .on('mouseover', mouseoverPCA)
          .on('mouseout',mouseoutPCA);

        
        
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
                .attr("fill" , "black")
                .attr("cx", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[0];})
                .attr("cy", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[1];})
                .attr("r", "0.5px")
                .on('mouseover', mouseoverUni)
                .on('mouseout', mouseoutUni)
                .on('click' , mouseClickUni);
       
    
    });

    

}

function drawTable(){

    if(document.getElementById("marcatore")== null){
        return;
    }
	
	var myColor = d3.scaleLinear()
  .range(["limegreen", "red"])
  .domain([0,100])
  
	var myColor2 = d3.scaleLinear()
  .range(["red", "limegreen"])
  .domain([0,100])

    
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
		
		 var titles_tocatch2 = {
            institution_name: "vuoto",
        };
        
        var titles = d3.keys(titles_tocatch);
        var sortAscending = true;
		var titles2 = d3.keys(titles_tocatch2);

        var headers = d3.select('table').append('thead').attr("id" , "marcatore").append('tr')
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
                        return d.reference_year == ref_year.value && (d.missing_perc*100) <= filter_missing && ( d.cons_perc * 100)  >= filter_consistency ; 
                    } else {
                        return (arr_country.includes(d.country_code) || arr_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value 
                        && (d.missing_perc*100) <= filter_missing && ( d.cons_perc * 100)  >= filter_consistency;
                                  
                    }
                 })
                 .append('tr')
                 .attr("class", "row-line");

    /*rows.selectAll('td')
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
    }); */
	
	rows.selectAll('td')
      .data(function (d) {
          return titles2.map(function (k) {
              return { 'value': d[k], 'name': k};
          });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
          return d.name;
      })
      .text(function (d) {
          return d.value;
      })
      .style("allign" , "center"); 
    
				 
	

    var bar = rows.selectAll("td")
      .data(function(d) { return titles.map(function(k) {return { 'value': d[k], 'name': k};}); })
    .enter().append("td").append("svg")
      .attr("id", function(d,i){
        return i;
      })
      .attr("width", 100)
      .attr("height", 20)
      

  bar.append("rect")
      .attr('id','bars')
      .attr("height", 20)
	   .style("fill", function(d) { 
	   if(d.name=="missing_perc")
	   return myColor(d.value*100);
		 else if(d.name=="cons_perc")
			 return myColor2(d.value*100);
		 else if(d.name=="timeillnes_occ")
			 return myColor2(d.value*14);
   } )
      .attr("width", function(d) { 
	  if(d.name=="missing_perc")
	  return d.value*100;
	  else if(d.name=="cons_perc")
		  return d.value*100;
	  else if(d.name=="timeillnes_occ")
		  return d.value*14;
	});

  bar.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	
    .text(function(d) { 
	  if(d.name=="missing_perc")
	  return d.value*100+"%";
	  else if(d.name=="cons_perc")
		  return d.value*100+"%";
	  else if(d.name=="institution_name")
		  return d.value;
	  else if(d.name=="timeillnes_occ")
		  return parseInt(d.value)+" of 7";
		});
		
	
	
    });
}


ref_year.addEventListener('change', updateCharts);

function updateCharts(e){
    
    drawPCA();
    drawMap();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    
}

type.addEventListener('change', updateCharts2);

function updateCharts2(e){
    console.log(e.target.value);
   
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    
}

function drawTimeline(){

    

      
      
d3.csv("data/statistic_per_uni.csv", function(data) {

    d3.selectAll("#line-uni").remove();
    d3.selectAll("#point-uni").remove();
    var dataReady = undefined ;

// List of groups (here I have one group per column)
var allGroup = ["missing_perc", "cons_perc"];
    
// Reformat the data: we need an array of arrays of {x, y} tuples
    
    
/*
    dataReady = allGroup.map(function(grpName) { // .map allows to do something for each element of the list
    return {
    name: grpName,
    values: data.filter(function(d){
        if(arr_uni.length == 0){
            return false;
        } else {
            return  (d.ETER_ID == grpName);
        }
        
    }).map(function(d) {
        return {time: d.reference_year,
             value: +d[grpName] * 100,
            eter_id: d.ETER_ID };
           })
            
    };
});
*/
datapre = arr_uni.map(function(datax) {
    return {
        eter_id: datax , 
        roba: allGroup.map(function(grpName) { // .map allows to do something for each element of the list
            return {
            name: grpName,
            values: data.filter(function(d){
                if(arr_uni.length == 0){
                    return false;
                } else {
                    return  (d.ETER_ID == datax);
                }
                
            }).map(function(d) {
                return {time: d.reference_year,
                     value: +d[grpName] * 100,
                    isti_name: d.institution_name };
                   })
                    
            };
        })
    };

});
  

//console.log(dataReady);
console.log(datapre);
// A color scale: one color for each group
var myColor = d3.scaleOrdinal()
  .domain(allGroup)
  .range(d3.schemeSet2);

var years = [2011,2017];
// Add X axis --> it is a date format
var x6 = d3.scaleLinear()
  .domain(years)
  .range([ 0, 500 ]);


  var y6 = d3.scaleLinear()
  .domain( [0,100])
  .range([ height6, 0 ]);




  var line = d3.line()
  .x(function(d) { return x6(+d.time) })
  .y(function(d) { return y6(+d.value) });
svg6.selectAll("myLines")
  .data(datapre)
  .enter()
  .append("path")
    .attr("d", function(d){ console.log(d.roba[0].values); return line(d.roba[0].values); } )
    .attr("stroke", function(d){ return myColor(d.roba[0].name) })
    .attr("id" , "line-uni")
    .style("stroke-width", 2)
    .style("fill", "none")
    .on('mouseover', mouseoverLine)
    .on('mouseout', mouseoutLine)

    svg6.selectAll("myLines")
    .data(datapre)
    .enter()
    .append("path")
      .attr("d", function(d){ console.log(d.roba[1].values); return line(d.roba[1].values); } )
      .attr("stroke", function(d){ return myColor(d.roba[1].name) })
      .attr("id" , "line-uni")
      .style("stroke-width", 2)
      .style("fill", "none")
      .on('mouseover', mouseoverLine)
      .on('mouseout', mouseoutLine)

    svg6
    // First we need to enter in a group
    .selectAll("myDots")
    .data(datapre)
    .enter()
      .append('g')
      .style("fill", function(d){ return myColor(d.roba[0].name) })
    // Second we need to enter in the 'values' part of this group
    .selectAll("myPoints")
    .data(function(d){ return d.roba[0].values })
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x6(d.time)  })
      .attr("cy", function(d) { return y6(d.value)  })
      .attr("r", 5)
      .attr("id" , "point-uni")
      .attr("stroke", "white")
    
      svg6
      // First we need to enter in a group
      .selectAll("myDots")
      .data(datapre)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.roba[1].name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.roba[1].values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x6(d.time)  })
        .attr("cy", function(d) { return y6(d.value)  })
        .attr("r", 5)
        .attr("id" , "point-uni")
        .attr("stroke", "white")



});
}
            
function mouseoverLine(d){

    
    d3.select(this).style('stroke-width', 5).style('opacity', 0.7);
    

    div_timeline.transition()		
            .duration(200)		
            .style("opacity", .8);	
        div_timeline.html(d.roba[0].values[0].isti_name)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 100) + "px");

}

function mouseoutLine(d){
    
    d3.select(this).style('stroke-width', 2).style('opacity', 1);

    div_timeline.style("opacity" , 0);

}


            

       
 