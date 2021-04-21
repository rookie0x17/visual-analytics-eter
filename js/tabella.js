d3.csv("data/statistic_per_uni.csv", function(error, data) {
    if (error) throw error;
    

    var sortAscending = true;
    var table = d3.select("#tabella2").append('table').attr("height" , "400").attr("weight" , "400").attr("overflow","auto");
    var titles_tocatch = {
        institution_name: "vuoto",
        missing_perc: 0,
        cons_perc:0,
        timeillnes_occ:0,
    };
    
    var titles = d3.keys(titles_tocatch);
    var headers = table.append('thead').append('tr')
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
    


    var rows = table.append('tbody').selectAll('tr')
                 .data(data).enter().filter(function(d){
                    return d.reference_year == ref_year.value;
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


