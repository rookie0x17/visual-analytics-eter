d3.csv("data/statistic_per_uni.csv", function(error, data) {
    if (error) throw error;
    

    var sortAscending = true;
    var table = d3.select("#tabella2").append('table').attr("height" , "612").attr("weight" , "612").attr("overflow","auto");
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
                         headers.attr('class', 'header');
                         
                         if (sortAscending) {
                           rows.sort(function(a, b) { return b[d] < a[d]; });
                           sortAscending = false;
                           this.className = 'aes';
                         } else {
                           rows.sort(function(a, b) { return b[d] > a[d]; });
                           sortAscending = true;
                           this.className = 'des';
                         }
                         
                     });
    


    var rows = table.append('tbody').selectAll('tr')
                 .data(data).enter().filter(function(d){
                    return d.reference_year == 2017;
                 })
                 .append('tr');

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


