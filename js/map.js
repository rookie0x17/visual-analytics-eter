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
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
   
};


slider_cons.oninput = function(){
    document.getElementById("cons_value_slider").innerHTML = this.value + "%";
    filter_consistency = this.value;

    drawPCA();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    
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
    svg.selectAll("path").style("fill", "#d8b365");
};
button_uni_clear.onclick = function(){
    arr_uni=[]
    console.log("clickato");
    drawPCA();
    drawTable();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
    drawTimeline();
    svg.selectAll(".university").style('fill', 'black').style('r','1px');
};



var margin_radar = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 50
},
    width_radar = Math.min(450, window.innerWidth - 10) - margin_radar.left - margin_radar.right,
    height_radar = Math.min(250, window.innerHeight - margin_radar.top - margin_radar.bottom - 20);

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
       .attr("class" , function(d) {if(d.properties.ISO2 == "GB") return "UKcountry"; else return d.properties.ISO2+"country"})
       .style("fill", "#d8b365")   //#C29682 cc9966
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
            .attr("fill" , "#black") //#735244
            .attr("cx", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[0];})
            .attr("cy", function(d) {return projection([d.longitude.replace("," , "."), d.latitude.replace("," , ".")])[1];})
            .attr("r", "1px")
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
    var to_prove = d.properties.ISO2;
    
    if(to_prove=="GB"){
        to_prove = "UK";
    }



    if(!arr_country.includes(to_prove ) ){
        d3.select(this).style('fill', '#01665e');
        console.log(to_prove);
    }

    div.transition()		
            .duration(200)		
            .style("opacity", .8);	
        div.html(d.properties.NAME)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 100) + "px");
    
  

}

function mouseOutCount(d){

    var to_prove = d.properties.ISO2;

    if(to_prove=="GB"){
        to_prove = "UK";
    }


    if(!arr_country.includes(to_prove )){
        d3.select(this).style('fill', '#d8b365');
        
    }

    div.style("opacity" , "0");
}

function clicked(d){
    if(!arr_country.includes(d.properties.ISO2) && !arr_country.includes("UK")  ){
        if(d.properties.ISO2 == "GB"){
            arr_country.push("UK");
        } else {
        arr_country.push(d.properties.ISO2);
        }
    } else if (arr_country.includes("UK")) {

        
            index = arr_country.indexOf("UK");
            if (index > -1) {
                arr_country.splice(index, 1);
            }
    } else {
        index = arr_country.indexOf(d.properties.ISO2);
        if (index > -1) {
            arr_country.splice(index, 1);
        }
    }

    


    console.log(arr_country);
    drawPCA();
    drawTable();
    drawTimeline();
	RadarChart("#radial", arr_uni,arr_country, radarChartOptions);
}

function mouseoverUni(d){
    // Highlight hovered province
    if(!arr_uni.includes(d.ETER_ID)){
        d3.select(this).style('fill','red').style('r' , '3px');
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
        d3.select(this).style('fill', 'black').style('r','1px');
    }
    div.style("opacity" , "0");
}

function mouseClickUni(d){

    if(!arr_uni.includes(d.ETER_ID)){
        arr_uni.push(d.ETER_ID);
        //arr_country.push(d.country_code);
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
    g.selectAll("#pca-circle")
    .remove();

    
    d3.csv("data/fusion_pca.csv", function(data) {

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
                return d.reference_year == ref_year.value && (d.missing_perc*100) <= filter_missing && ( d.cons_perc * 100)  >= filter_consistency;
            } else {
                return (arr_country.includes(d.country_code) || arr_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value
                && (d.missing_perc*100) <= filter_missing && ( d.cons_perc * 100)  >= filter_consistency;;
            }
            
        })
        .append("circle")
          .attr("cx", function (d) {return x(d.x); } )
          .attr("cy", function (d) { return y(d.y); } )
          .attr("r", 1.5)
          .attr("id" , "pca-circle")
          .style("fill", "#69b3a2")
          .attr("class" , function(d){return d.country_code;})
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
                .attr("r", "1px")
                .on('mouseover', mouseoverUni)
                .on('mouseout', mouseoutUni)
                .on('click' , mouseClickUni);
       
    
    });

    

}

function drawAVG(a1 , a2 , a3 , myColor , myColor2){

    var total = 0;
    for(var i = 0; i < a1.length; i++) {
        total += a1[i];
    }
    var datamiss = Math.trunc(total / a1.length);

    var total = 0;
    for(var i = 0; i < a2.length; i++) {
        total += a2[i];
    }
    var datacons = Math.trunc(total / a2.length);

    var total = 0;
    for(var i = 0; i < a3.length; i++) {
        total += a3[i];
    }
    var dataill = (total / a3.length);
    

    d3.select('tbody').append('tr').attr('id', 'avg-row').attr('class', 'row-line');

    var bar1 = d3.select("#avg-row").append('td').attr("id" , "td-avg").append("svg").attr("width", 100)
    .attr("height", 20);

    bar1.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	.text(function(d) { 
	  return "Average"});

    var bar2 =   d3.select("#avg-row").append('td').attr("id" , "td-avg")
      .append("svg").attr("width", 100)
      .attr("height", 20);
    
      bar2.append("rect")
      .attr('id','bars')
      .attr("height", 20)
	   .style("fill", function() { 
	   return myColor(datamiss);
   } )
      .attr("width", function() { 
	   return datamiss;
      
	}).style("stroke-width" , "1").style("stroke" , "black").attr("rx" , "3").attr("ry" , "3");

    bar2.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	.text(function() { 
	  return datamiss+"%"; });
    


     var bar3 = d3.select("#avg-row").append('td').attr("id" , "td-avg").attr("id" , "td-avg")
      .append("svg").attr("width", 100).attr("height", 20);

      bar3.append("rect")
      .attr('id','bars')
      .attr("height", 20)
	   .style("fill", function() { 
	   return myColor2(datacons);
   } )
      .attr("width", function() { 
	   return datacons;
      
	}).style("stroke-width" , "1").style("stroke" , "black").attr("rx" , "3").attr("ry" , "3");

    bar3.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	.text(function() { 
	  return datacons+"%"; });
     
      
      var bar4 = d3.select("#avg-row").append('td').attr("id" , "td-avg").attr("id" , "td-avg")
      .append("svg").attr("width", 100).attr("height", 20);

      bar4.append("rect")
      .attr('id','bars')
      .attr("height", 20)
	   .style("fill", function() { 
	   return myColor2(dataill*14);
   } )
      .attr("width", function() { 
	   return dataill * 14;
      
	}).style("stroke-width" , "1").style("stroke" , "black").attr("rx" , "3").attr("ry" , "3");

    bar4.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	.text(function() { 
	  return parseInt(dataill)+" of 7"; });
      

    
    

    
}

function drawTable(){

    var arr_miss = [];
    var arr_cons = [];
    var arr_timeill = [];
	var a=[];
	var b=[];

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
    d3.csv("data/fusion_db.csv", function(error, data) {
         var titles_tocatch = {  
			institution_name: "vuoto",
            missing_perc: 0,
            cons_perc:0,
            timeillnes_occ:0,
        };
		
		 var titles_tocatch2 = {
            ETER_ID: "vuoto",
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
           cerca = "ETER_ID" ;
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
                        return (arr_uni.includes(d.ETER_ID) || arr_country.includes(d.ETER_ID)) && d.reference_year == ref_year.value 
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
          if(d.value.length>2){
			 console.log(d.value);
			a.push(d.value);
		  }
		  else{
			  b.push(d.value);
		  }
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
	  if(d.name=="missing_perc"){
        arr_miss.push(d.value*100);
	  return d.value*100;
      }
	  else if(d.name=="cons_perc"){
          arr_cons.push(d.value*100);
		  return d.value*100;
    }
	  else if(d.name=="timeillnes_occ"){
            arr_timeill.push(d.value*1);
		  return d.value*14;
      }
	}).style("stroke-width" , "1").style("stroke" , "black").attr("rx" , "3").attr("ry" , "3");;

  bar.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
	
    .text(function(d) { 
	  if(d.name=="missing_perc")
	  return Math.trunc(d.value*100)+"%";
	  else if(d.name=="cons_perc")
		  return Math.trunc(d.value*100)+"%";
	  else if(d.name=="ETER_ID")
		  return d.value;
	  else if(d.name=="timeillnes_occ")
		  return parseInt(d.value)+" of 7";
		});
		
		RadarChart("#radial", a ,b, radarChartOptions);
        drawAVG(arr_miss , arr_cons , arr_timeill , myColor , myColor2);
    
	
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


var myColorConsUni = d3.scaleOrdinal()
.domain(arr_uni)
.range(d3.schemeCategory10);
var myColorMissUni= d3.scaleOrdinal()
.domain(arr_uni)
.range(d3.schemeSet2);

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
var myColorMissUni = d3.scaleOrdinal()
  .domain(arr_uni)
  .range(d3.schemeCategory10);

var myColorConsUni = d3.scaleOrdinal()
  .domain(arr_uni)
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
    .attr("stroke", function(d){ return myColorMissUni(d.eter_id) })
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
      .attr("stroke", function(d){ return myColorConsUni(d.eter_id) })
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
      .style("fill", function(d){ return myColorMissUni(d.eter_id) })
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
        .style("fill", function(d){ return myColorConsUni(d.eter_id) })
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


d3.csv("data/stastic_per_country.csv", function(data) {

    d3.selectAll("#line-country-timeline").remove();
    d3.selectAll("#point-country-timeline").remove();
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
datapre = arr_country.map(function(datax) {
    return {
        country_code: datax , 
        roba: allGroup.map(function(grpName) { // .map allows to do something for each element of the list
            return {
            name: grpName,
            values: data.filter(function(d){
                if(arr_country.length == 0){
                    return false;
                } else {
                    return  (d.country_code == datax);
                }
                
            }).map(function(d) {
                return {time: d.reference_year,
                     value: +d[grpName] * 100
                     };
                   })
                    
            };
        })
    };

});
  

//console.log(dataReady);
console.log("arrivo");
console.log(datapre);

console.log(arr_country);
// A color scale: one color for each group
var myColorMissing = d3.scaleOrdinal()
  .domain(arr_country)
  .range(d3.schemePastel1);

var myColorCons = d3.scaleOrdinal()
  .domain(arr_country)
  .range(d3.schemeDark2);

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
    .attr("stroke", function(d){ return myColorMissing(d.country_code) })
    .attr("id" , "line-country-timeline")
    .style("stroke-width", 2)
    .style("fill", "none")
    .on('mouseover', mouseoverLineCountry)
    .on('mouseout', mouseoutLineCountry)

    svg6.selectAll("myLines")
    .data(datapre)
    .enter()
    .append("path")
      .attr("d", function(d){ console.log(d.roba[1].values); return line(d.roba[1].values); } )
      .attr("stroke", function(d){ return myColorCons(d.country_code) })
      .attr("id" , "line-country-timeline")
      .style("stroke-width", 2)
      .style("fill", "none")
      .on('mouseover', mouseoverLineCountry)
    .on('mouseout', mouseoutLineCountry)
      

    svg6
    // First we need to enter in a group
    .selectAll("myDots")
    .data(datapre)
    .enter()
      .append('g')
      .style("fill", function(d){ return myColorMissing(d.country_code) })
    // Second we need to enter in the 'values' part of this group
    .selectAll("myPoints")
    .data(function(d){ return d.roba[0].values })
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x6(d.time)  })
      .attr("cy", function(d) { return y6(d.value)  })
      .attr("r", 5)
      .attr("id" , "point-country-timeline")
      .attr("stroke", "white")
    
      svg6
      // First we need to enter in a group
      .selectAll("myDots")
      .data(datapre)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColorCons(d.country_code) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.roba[1].values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x6(d.time)  })
        .attr("cy", function(d) { return y6(d.value)  })
        .attr("r", 5)
        .attr("id" , "point-country-timeline")
        .attr("stroke", "white")

    displayLegend(myColorMissing , myColorCons);

});




}
            

function displayLegend(m , c){

    d3.selectAll("#timelinelegend").remove();

    var i = 20;

    arr_country.forEach(element => {
        
        d3.select("#timeline-svg").append("text").attr("id", "timelinelegend").attr("x", 0).attr("y", 90+i).text(element).style("font-size", "10px").attr("alignment-baseline","middle");
        d3.select("#timeline-svg").append("circle").attr("id", "timelinelegend").attr("cx",80).attr("cy",85+i).attr("r", 5).style("fill", function(){ return m(element) } );
        d3.select("#timeline-svg").append("circle").attr("id", "timelinelegend").attr("cx",150).attr("cy",85+i).attr("r", 5).style("fill",  function(){ return c(element) });
        
        i=i+20;
    });

    arr_uni.forEach(element => {
        
        d3.select("#timeline-svg").append("text").attr("id", "timelinelegend").attr("x", 0).attr("y", 90+i).text(element).style("font-size", "10px").attr("alignment-baseline","middle");
        d3.select("#timeline-svg").append("circle").attr("id", "timelinelegend").attr("cx",80).attr("cy",85+i).attr("r", 5).style("fill", function(){ return myColorConsUni(element) } );
        d3.select("#timeline-svg").append("circle").attr("id", "timelinelegend").attr("cx",150).attr("cy",85+i).attr("r", 5).style("fill",  function(){ return myColorMissUni(element) });
        
        i=i+20;
    });
}






function mouseoverLine(d){

   if (legend == 1){
  d3.selectAll("#line-entire-db-timeline").style("opacity" , 0.5);
   }
  d3.selectAll("#line-country-timeline").style("opacity" , 0.5);
  d3.selectAll("#line-uni").style("opacity" , 0.5);

    
    d3.select(this).style('stroke-width', 5).style('opacity', 0.7);
    

    div_timeline.transition()		
            .duration(200)		
            .style("opacity", .8);	
        div_timeline.html(d.roba[0].values[0].isti_name + "<br> " + d.eter_id)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 100) + "px");

}

function mouseoutLine(d){
    if (legend == 1){
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 1);
    }
  d3.selectAll("#line-country-timeline").style("opacity" , 1);
  d3.selectAll("#line-uni").style("opacity" , 1);
    
    d3.select(this).style('stroke-width', 2).style('opacity', 1);

    div_timeline.style("opacity" , 0);

}

function mouseoverLineCountry(d){

  if(legend==1){  
  d3.selectAll("#line-entire-db-timeline").style("opacity" , 0.5);
  }
  d3.selectAll("#line-country-timeline").style("opacity" , 0.5);
  d3.selectAll("#line-uni").style("opacity" , 0.5);

    
    d3.select(this).style('stroke-width', 5).style('opacity', 0.7);
    

    div_timeline.transition()		
            .duration(200)		
            .style("opacity", .8);	
        div_timeline.html(d.country_code)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 100) + "px");

}

function mouseoutLineCountry(d){
    
    if(legend==1){
    d3.selectAll("#line-entire-db-timeline").style("opacity" , 1);
    }
    d3.selectAll("#line-country-timeline").style("opacity" , 1);
    d3.selectAll("#line-uni").style("opacity" , 1);


    d3.select(this).style('stroke-width', 2).style('opacity', 1);

    div_timeline.style("opacity" , 0);

}


            

       
 