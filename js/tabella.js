d3.csv("data/statistic_per_uni.csv", function(error, data) {
	
	var myColor = d3.scaleLinear()
  .range(["limegreen", "red"])
  .domain([0,100])
  
	var myColor2 = d3.scaleLinear()
  .range(["red", "limegreen"])
  .domain([0,100])
    if (error) throw error;
    

    var sortAscending = true;
    var table = d3.select("#tabella2").append('table').attr("height" , "400").attr("weight" , "400").attr("overflow","auto");
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
    var headers = table.append('thead').attr("id" , "marcatore").append('tr')
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
                          
                         } else {
                           rows.sort(function(a, b) { return b[cerca] > a[cerca]; });
                           sortAscending = true;
                           this.className = 'des';
                         }
                         
                     });
    
              


    var rows = table.append('tbody').selectAll('tr')
                 .data(data).enter().filter(function(d){
                    return d.reference_year == ref_year.value;
                 })
                 .append('tr')
                 .attr("class", "row-line");

    
  

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
	}).style("stroke-width" , "1").style("stroke" , "black").attr("rx" , "3").attr("ry" , "3");

  bar.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .attr("dy", ".35em")
    .style("fill" , "black")
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

