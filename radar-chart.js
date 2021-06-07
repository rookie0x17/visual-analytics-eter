type= document.getElementById("var-select")
type2= document.getElementById("total")
init_c=[]
init_u=[]


RadarChart("#radial", init_c,init_u, radarChartOptions,);




function RadarChart(id, data_uni, data_count, options) {
		console.log(type2.value)
	if(data_uni.length>=25){
		data_uni=[];
		console.log("ok");
		}
	if(data_count.length>=6){
		data_count=[];
		console.log("ok");
		}
	
	if(type2.value=="si"){
	d3.csv("data/FINALE.csv", function(data){

	// console.log(flag)
// if(data.length === onceForRadar.length && data.sort().every(function(value, index) { return value === onceForRadar.sort()[index]})) {
// 	console.log("ok")
// 	onceForRadar_flag = false;
// }
	
	var alpha = -1;
	var tip = d3.select("#radial")
	.append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
	
    .style("padding", "5px")

	
	
	
	newdata=[];
	
	newdata= data.filter(function(d){
            if(data_uni.length == 0 && data_count.length == 0){
                return d.reference_year == ref_year.value;
            } else {
                return (data_count.includes(d.country_code) || data_uni.includes(d.ETER_ID) ) && d.reference_year == ref_year.value;
            }
            
        })
		
		console.log(newdata);
		
	var output = newdata.map(function (obj) {
		return Object.keys(obj).map(function (key) {
			return obj[key];
			});
		});
	keys = ["personnel_expenditure(PPP)",
	"total_academic_staff(FTE)"
	];
	
	console.log(output);
	
	for (i = 0; i < output.length; i++) {
			for (j = 0; j < 41; j++) {
				output[i][j]=output[i][j].replace("," , ".")
		
		}
		
		}
		
		
	out = [];
	mtot=[];
	mtot2=[];
	mtot3=[];
	
	total=[];
	total = data.filter(function(d){
                return d.reference_year == ref_year.value;   
        });
		
	var tot = total.map(function (obj) {
		return Object.keys(obj).map(function (key) {
			return obj[key];
			});
		});
		
		
	for (i = 0; i < tot.length; i++) {
			for (j = 0; j < 41; j++) {
				tot[i][j]=tot[i][j].replace("," , ".")
		
		}
		
		}
	for (i = 0; i < total.length; i++) {	
	mtot.push([{
				axis: "total current expenditure",
				value: parseFloat(tot[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(tot[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(tot[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(tot[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(tot[i][16])
			}



			])
	}
	
	
	for (i = 0; i < mtot.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(mtot[i][j].value))
					mtot[i][j].value=0;
		
		}
		
		}
		
		
		conttot1=0;
		contatoretot1=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot1 += mtot[i][0].value;
				contatoretot1++;
		
		}
		
		mediatot = conttot1/contatoretot1
		
		conttot2=0;
		contatoretot2=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot2 += mtot[i][1].value;
				contatoretot2++;
		
		}
		
		mediatot2 = conttot2/contatoretot2
		
		conttot3=0;
		contatoretot3=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot3 += mtot[i][2].value;
				contatoretot3++;
		
		}
		
		mediatot3 = conttot3/contatoretot3
		
		conttot4=0;
		contatoretot4=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot4 += mtot[i][3].value;
				contatoretot4++;
		
		}
		
		mediatot4 = conttot4/contatoretot4
		
		
		conttot5=0;
		contatoretot5=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot5 += mtot[i][4].value;
				contatoretot5++;
		
		}
		
		mediatot5 = conttot5/contatoretot5
		console.log(mediatot);
		console.log(mediatot2);
		console.log(mediatot3);
		console.log(mediatot4);
		console.log(mediatot5);
		
		
		
		
		
		//------------------------------------------------------------------------------------------------------------
		
		for (i = 0; i < total.length; i++) {	
	mtot2.push([{
				axis: "total academic staff(FTE)",
				value: parseFloat(tot[i][19]) 
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(tot[i][27])
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(tot[i][32])
			},
			{
				axis: "total student enrolled ISCED_8",
				value: parseFloat(tot[i][33])
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(tot[i][34])
			}



			])
	}
	
	
	for (i = 0; i < mtot2.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(mtot2[i][j].value))
					mtot2[i][j].value=0;
		
		}
		
		}
		
		
		conttot12=0;
		contatoretot12=0;
		
		
		
		for (i = 0; i < mtot.length; i++) {
			
				conttot12 += mtot2[i][0].value;
				contatoretot12++;
		
		}
		
		mediatot21 = conttot12/contatoretot12
		
		conttot22=0;
		contatoretot22=0;
		
		
		
		for (i = 0; i < mtot2.length; i++) {
			
				conttot22 += mtot2[i][1].value;
				contatoretot22++;
		
		}
		
		mediatot22 = conttot22/contatoretot22
		
		conttot32=0;
		contatoretot32=0;
		
		
		
		for (i = 0; i < mtot2.length; i++) {
			
				conttot32 += mtot2[i][2].value;
				contatoretot32++;
		
		}
		
		mediatot32 = conttot32/contatoretot32
		
		conttot42=0;
		contatoretot42=0;
		
		
		
		for (i = 0; i < mtot2.length; i++) {
			
				conttot42 += mtot2[i][3].value;
				contatoretot42++;
		
		}
		
		mediatot42 = conttot42/contatoretot42
		
		
		conttot52=0;
		contatoretot52=0;
		
		
		
		for (i = 0; i < mtot2.length; i++) {
			
				conttot52 += mtot2[i][4].value;
				contatoretot52++;
		
		}
		
		mediatot52 = conttot52/contatoretot52
		console.log(mediatot21);
		console.log(mediatot22);
		console.log(mediatot32);
		console.log(mediatot42);
		console.log(mediatot52);
		
		
		//------------------------------------------------------------------------------------------------------------
		
		
				for (i = 0; i < total.length; i++) {	
	mtot3.push([{
				axis: "share of woman academic staff",
				value: parseFloat(tot[i][36])
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(tot[i][35]) 
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(tot[i][37])
			},
			
			{
				axis: "PhD intensity",
				value: parseFloat(tot[i][38])
			}
			



			])
	}
	
	
	for (i = 0; i < mtot3.length; i++) {
			for (j = 0; j < 4; j++) {
				if(isNaN(mtot3[i][j].value))
					mtot3[i][j].value=0;
		
		}
		
		}
		
		
		conttot13=0;
		contatoretot13=0;
		
		
		
		for (i = 0; i < mtot3.length; i++) {
			
				conttot13 += mtot3[i][0].value;
				contatoretot13++;
		
		}
		
		mediatot31 = conttot13/contatoretot13
		
		conttot23=0;
		contatoretot23=0;
		
		
		
		for (i = 0; i < mtot3.length; i++) {
			
				conttot23 += mtot3[i][1].value;
				contatoretot23++;
		
		}
		
		mediatot23 = conttot23/contatoretot23
		
		conttot33=0;
		contatoretot33=0;
		
		
		
		for (i = 0; i < mtot3.length; i++) {
			
				conttot33 += mtot3[i][2].value;
				contatoretot33++;
		
		}
		
		mediatot33 = conttot33/contatoretot33
		
		conttot43=0;
		contatoretot43=0;
		
		
		
		for (i = 0; i < mtot3.length; i++) {
			
				conttot43 += mtot3[i][3].value;
				contatoretot43++;
		
		}
		
		mediatot43 = conttot43/contatoretot43
		
		
	
		
		
		console.log(mediatot31);
		console.log(mediatot23);
		console.log(mediatot33);
		console.log(mediatot43);
		
		
		
		//------------------------------------------------------------------------------------------------------------
		
		
		
		
		
	if (type.value=='Financial'){
		
		var val1,val2,val3,val4,val5;
		
		for (i = 0; i < newdata.length; i++) {
			
			val1= parseFloat(output[i][12] )
			val2 =parseFloat(output[i][14])
			val3=parseFloat(output[i][18])
			val4=parseFloat(output[i][15])
			val5=parseFloat(output[i][16])
			
			
			}

		
		
		
			
			
	
		
		
		out.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget)",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
		
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			

		}
		
		
			
		
		
		
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
		
		
		cont1=0;
		contatore1=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont1 += out[i][0].value;
				contatore1++;
		
		}
		
		media = cont1/contatore1
		
		cont2=0;
		contatore2=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont2 += out[i][1].value;
				contatore2++;
		
		}
		
		media2 = cont2/contatore2
		
		cont3=0;
		contatore3=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont3 += out[i][2].value;
				contatore3++;
		
		}
		
		media3 = cont3/contatore3
		
		cont4=0;
		contatore4=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont4 += out[i][3].value;
				contatore4++;
		
		}
		
		media4 = cont4/contatore4
		
		
		cont5=0;
		contatore5=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont5 += out[i][4].value;
				contatore5++;
		
		}
		
		media5 = cont5/contatore5
		console.log(data_uni);
		
		console.log(out);
		console.log(media2);
		newdata2=[]
		/*
		if(isNaN(media))
			media=0;
		if(isNaN(media2))
			media2=0;
		if(isNaN(media3))
			media3=0;
		if(isNaN(media4))
			media4=0;
		if(isNaN(media5))
			media5=0;
		*/
		
		console.log(media2);
		
		
		
		// se voglio fare una media anche per i country
		if((data_uni.length == 0 && data_count.length == 0) || out.length>=25 ){
			
			for (i = 0; i < newdata.length; i++) {
			
			val1= parseFloat(output[i][12] )
			val2 =parseFloat(output[i][14])
			val3=parseFloat(output[i][18])
			val4=parseFloat(output[i][15])
			val5=parseFloat(output[i][16])
			
			
			}
			
			
		//if(data_uni.length == 0 && data_count.length == 0){
			
			if(mediatot>media && mediatot2>media2 && mediatot3>media3 && mediatot4>media4 && mediatot5>media5){
				if(mediatot>val1 && mediatot2>val2 && mediatot3>val3 && mediatot4>val4 && mediatot5>val5){
			
		
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
			if(media>val1 && media2>val2 && media3>val3 && media4>val4 && media5>val5){
			
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(media )
			},
			{
				axis: "total core budget",
				value: parseFloat(media2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(media3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(media4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(media5)
			}



			])
			
			for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
			}
			else{
				
				for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
		
		newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(media )
			},
			{
				axis: "total core budget",
				value: parseFloat(media2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(media3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(media4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(media5)
			}



			])
				
				
			}
				}
		else{
			
			for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
			
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
			
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(media )
			},
			{
				axis: "total core budget",
				value: parseFloat(media2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(media3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(media4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(media5)
			}



			])
			
			
			
			
			
		}
		
			} else{
				if(media>val1 && media2>val2 && media3>val3 && media4>val4 && media5>val5){
				
				newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(media )
			},
			{
				axis: "total core budget",
				value: parseFloat(media2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(media3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(media4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(media5)
			}



			])
			
			if(mediatot>val1 && mediatot2>val2 && mediatot3>val3 && mediatot4>val4 && mediatot5>val5){
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
			
			
			for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
			}
			else{
				
				for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
				
				newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
			
			
			
				
			}
			
			}
			else{
				
				for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])
			
			
			}
			}

		}
				
				newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(media )
			},
			{
				axis: "total core budget",
				value: parseFloat(media2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(media3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(media4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(media5)
			}



			])
			newdata2.push([{
				axis: "total current expenditure",
				value: parseFloat(mediatot )
			},
			{
				axis: "total core budget",
				value: parseFloat(mediatot2)
			},
			{
				axis: "total current revenue",
				value: parseFloat(mediatot3)
			},
			{
				axis: "total third party funding",
				value: parseFloat(mediatot4)
			},
			{
				axis: "student fees funding",
				value: parseFloat(mediatot5)
			}



			])
			
			
			
				
			}
			}
			
			
			
			
			
		
		for (i = 0; i < newdata2.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(newdata2[i][j].value))
					newdata2[i][j].value=0;
		
		}
		
		}


		
			
			data = newdata2;
		}
		else{
			console.log(out);
		if(out.length==0){
			out.push([{
				axis: "total current expenditure",
				value: 0
			},
			{
				axis: "total core budget",
				value: 0
			},
			{
				axis: "total current revenue",
				value: 0
			},
			{
				axis: "total third party funding",
				value: 0
			},
			{
				axis: "student fees funding",
				value: 0
			}



			])
			data=out;
		}
		else{
		data = out;
		}
		}
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Educational'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total academic staff",
				value: parseFloat(output[i][19]) 
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(output[i][27])
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(output[i][32])
			},
			{
				axis: "total student enrolled ISCED 8",
				value: parseFloat(output[i][33])
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(output[i][34])
			}



			])

		}
		
		out.push([{
				axis: "total academic staff",
				value: parseFloat(mediatot21 )
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(mediatot22)
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(mediatot32)
			},
			{
				axis: "total student enrolled ISCED 8",
				value: parseFloat(mediatot42)
			},
			{
				axis: "total graduated_ISCED 8",
				value: parseFloat(mediatot52)
			}



			])
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	cont1=0;
		contatore1=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont1 += out[i][0].value;
				contatore1++;
		
		}
		
		media = cont1/contatore1
		
		cont2=0;
		contatore2=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont2 += out[i][1].value;
				contatore2++;
		
		}
		
		media2 = cont2/contatore2
		
		cont3=0;
		contatore3=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont3 += out[i][2].value;
				contatore3++;
		
		}
		
		media3 = cont3/contatore3
		
		cont4=0;
		contatore4=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont4 += out[i][3].value;
				contatore4++;
		
		}
		
		media4 = cont4/contatore4
		
		
		cont5=0;
		contatore5=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont5 += out[i][4].value;
				contatore5++;
		
		}
		
		media5 = cont5/contatore5
		
		console.log(media);
		console.log(media2);
		newdata2=[]

			
				if((data_uni.length == 0 && data_count.length == 0) || out.length>=25){
		//if(data_uni.length == 0 && data_count.length == 0){
			
			
			
			
			
			
			newdata2.push([{
				axis: "total academic staff",
				value: parseFloat(media )
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(media2)
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(media3)
			},
			{
				axis: "total student enrolled ISCED 8",
				value: parseFloat(media4)
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(media5)
			}



			])
			
			newdata2.push([{
				axis: "total academic staff",
				value: parseFloat(mediatot21 )
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(mediatot22)
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(mediatot32)
			},
			{
				axis: "total student enrolled ISCED 8",
				value: parseFloat(mediatot42)
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(mediatot52)
			}



			])
			
			
			for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				console.log("ok");
			newdata2.push([{
				axis: "total academic staff",
				value: parseFloat(output[i][19]) 
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(output[i][27])
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(output[i][32])
			},
			{
				axis: "total student enrolled ISCED 8",
				value: parseFloat(output[i][33])
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(output[i][34])
			}



			])
			
			
			}
			}

		}
		
		for (i = 0; i < newdata2.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(newdata2[i][j].value))
					newdata2[i][j].value=0;
		
		}
		
		}


		
			
			data = newdata2;
		}

		else{
			console.log(out);
		if(out.length==0){
			out.push([{
				axis: "total academic staff",
				value: 0
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: 0
			},
			{
				axis: "total graduated ISCED 5-7",
				value: 0
			},
			{
				axis: "total student enrolled ISCED 8",
				value: 0
			},
			{
				axis: "total graduated ISCED 8",
				value: 0
			}



			])
			data=out;
		}
		else{
		data = out;
		}
		}
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Other'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "share of woman academic staff",
				value: parseFloat(output[i][36])
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(output[i][35]) 
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(output[i][37])
			},
			
			{
				axis: "PhD intensity",
				value: parseFloat(output[i][38])
			}
			



			])

		}
		out.push([{
				axis: "share of woman academic staff",
				value: parseFloat(mediatot31)
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(mediatot23)
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(mediatot33)
			},
			{
				axis: "PhD intensity",
				value: parseFloat(mediatot43)
			}
		])
		
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 4; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	
cont1=0;
		contatore1=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont1 += out[i][0].value;
				contatore1++;
		
		}
		
		media = cont1/contatore1
		
		cont2=0;
		contatore2=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont2 += out[i][1].value;
				contatore2++;
		
		}
		
		media2 = cont2/contatore2
		
		cont3=0;
		contatore3=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont3 += out[i][2].value;
				contatore3++;
		
		}
		
		media3 = cont3/contatore3
		
		cont4=0;
		contatore4=0;
		
		
		
		for (i = 0; i < out.length; i++) {
			
				cont4 += out[i][3].value;
				contatore4++;
		
		}
		
		media4 = cont4/contatore4
		
		
		
		
		console.log(media);
		console.log(media2);
		newdata2=[]

		
if((data_uni.length == 0 && data_count.length == 0) || out.length>=25){
		//if(data_uni.length == 0 && data_count.length == 0){
			
			
			
			
	
			
			newdata2.push([{
				axis: "share of woman academic staff",
				value: parseFloat(media)
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(media2) 
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(media3)
			},
			
			{
				axis: "PhD intensity",
				value: parseFloat(media4)
			}



			])
			
				newdata2.push([{
				axis: "share of woman academic staff",
				value: parseFloat(mediatot31)
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(mediatot23)
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(mediatot33)
			},
			{
				axis: "PhD intensity",
				value: parseFloat(mediatot43)
			}



			])
			
			
			for (i = 0; i < newdata.length; i++) {
			for (j=0; j<data_uni.length; j++) {
			if(output[i][1]==data_uni[j]){
				console.log("ok");
			newdata2.push([{
				axis: "share of woman academic staff",
				value: parseFloat(output[i][36])
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(output[i][35])
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(output[i][37])
			},
			{
				axis: "PhD intensity",
				value: parseFloat(output[i][38])
			}


			])
			
			
			}
			}

		}
		
		for (i = 0; i < newdata2.length; i++) {
			for (j = 0; j < 4; j++) {
				if(isNaN(newdata2[i][j].value))
					newdata2[i][j].value=0;
		
		}
		
		}


		
			
			data = newdata2;
		}
		else{
			console.log(out);
		if(out.length==0){
			out.push([{
				axis: "share of woman academic staff",
				value: 0
			},
			{
				axis: "share of women students_ISCED 5-7",
				value: 0
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: 0
			},
			{
				axis: "PhD intensity",
				value: 0
			}

			])
			data=out;
		}
		else{
			
		data = out;
		}
		}
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	
	
	
	var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scale.category10()	//Color function
	};
	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(''),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
	
	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.99em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.style("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			var nometot= ["tot","non tot"];
			var vegeta = d.map(function (obj) {
					return Object.keys(obj).map(function (key) {
						//console.log(obj[key]);
						return obj[key];
					});
				});
				var goku;
				for (ix = 0; ix < output.length; ix++) {
					//console.log(vegeta[1][1])
					//console.log(output[ix][15])
					if (type.value=='Educational'){
					
					if(isNaN(parseFloat(output[ix][27])))
					output[ix][27]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][27])) {
						goku = output[ix][2];
					
				}
				
				if ( vegeta[1][1] == parseFloat(mediatot22)) {
						//console.log("ok");
						goku = "The total average";
					
				}
				}
				if (type.value=='Financial'){
					
					if(isNaN(parseFloat(output[ix][14])))
					output[ix][14]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][14])) {
						goku = output[ix][2];
					}
					
					if ( vegeta[1][1] == parseFloat(mediatot2)) {
						//console.log("ok");
						goku = "The total average";
					
				}
					
				
				}
				
				if (type.value=='Other'){
					
					if(isNaN(parseFloat(output[ix][35])))
					output[ix][35]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][35])) {
						goku = output[ix][2];
					
				}
				
				if ( vegeta[1][1] == parseFloat(mediatot23)) {
						//console.log("ok");
						goku = "The total average";
					
				}
				}
				
				}
				
				
				p = $("path")
				//console.log(p);
				pos = p.position();
				//console.log(pos.top);
				//Dim all blobs
				console.log(goku);
				//console.log(pos);
				if(goku!=undefined){
				tip.html(goku)
					//.style("left",pos.left  + "px")
					//.style("top", pos.top + "px")
					.style("opacity", 1)  
					.style("left", (d3.event.pageX) + "px")     
					.style("top", (d3.event.pageY - 28) + "px");	
				}
				else{
					
					tip.html("this is the average of selected country and university")
					//.style("left",pos.left  + "px")
					//.style("top", pos.top + "px")
					.style("opacity", 1)  
					.style("left", (d3.event.pageX) + "px")     
					.style("top", (d3.event.pageY - 28) + "px");	
					
				}
				
      
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			tip
      .style("opacity", 0)
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class",  "radarArea")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
				.style('opacity', 1)
				
			z="path."+d3.select(this).attr("class");
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0); 
			//Bring back the hovered over blob
			g.select(z)
				.transition(200)
				.style("fill-opacity", 0.7);
				
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
		
		
	});	
	
	}
	else{
		out = [];
		out2 = [];
		var output,output2;
	d3.csv("data/FINALE.csv", function(data){

	// console.log(flag)
// if(data.length === onceForRadar.length && data.sort().every(function(value, index) { return value === onceForRadar.sort()[index]})) {
// 	console.log("ok")
// 	onceForRadar_flag = false;
// }
	
	var alpha = -1;
	var tip = d3.select("#radial")
	.append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
	
    .style("padding", "5px")

	
	
	
	newdata=[];
	
	newdata= data.filter(function(d){
            if(data_uni.length == 0 && data_count.length == 0){
                return d.reference_year == ref_year.value;
            } else {
                return  data_uni.includes(d.ETER_ID)  && d.reference_year == ref_year.value;
            }
            
        })
		
		console.log(newdata);
		
	output = newdata.map(function (obj) {
		return Object.keys(obj).map(function (key) {
			return obj[key];
			});
		});
	keys = ["personnel_expenditure(PPP)",
	"total_academic_staff(FTE)"
	];
	
	console.log(output);
	
	for (i = 0; i < output.length; i++) {
			for (j = 0; j < 41; j++) {
				output[i][j]=output[i][j].replace("," , ".")
		
		}
		
		}
		
		
	
	if (type.value=='Financial'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total current expenditure",
				value: parseFloat(output[i][12] )
			},
			{
				axis: "total core budget",
				value: parseFloat(output[i][14])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output[i][18])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output[i][15])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output[i][16])
			}



			])

		}
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Educational'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total academic staff",
				value: parseFloat(output[i][19]) 
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(output[i][27])
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(output[i][32])
			},
			{
				axis: "total student enrolled ISCED_8",
				value: parseFloat(output[i][33])
			},
			{
				axis: "total graduated ISCED 8",
				value: parseFloat(output[i][34])
			}



			])

		}
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Other'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "share of woman academic staff",
				value: parseFloat(output[i][36])
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(output[i][35]) 
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(output[i][37])
			},
			
			{
				axis: "PhD intensity",
				value: parseFloat(output[i][38])
			}
			



			])

		}
		
		
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 4; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	
	});		
	
	d3.csv("data/stastic_per2.csv", function(data){

	// console.log(flag)
// if(data.length === onceForRadar.length && data.sort().every(function(value, index) { return value === onceForRadar.sort()[index]})) {
// 	console.log("ok")
// 	onceForRadar_flag = false;
// }
	
	var alpha = -1;
	var tip = d3.select("#radial")
	.append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
	
    .style("padding", "5px")

	
	
	
	newdata=[];
	
	newdata= data.filter(function(d){
            if(data_uni.length == 0 && data_count.length == 0){
                return d.reference_year == ref_year.value;
            } else {
                return data_count.includes(d.country_code) && d.reference_year == ref_year.value;
            }
            
        })
		
		console.log(newdata);
		
	output2 = newdata.map(function (obj) {
		return Object.keys(obj).map(function (key) {
			return obj[key];
			});
		});
	keys = ["personnel_expenditure(PPP)",
	"total_academic_staff(FTE)"
	];
	
	console.log(output2);
	
	
		
	
		
	if (type.value=='Financial'){
		
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total current expenditure(PPP)",
				value: parseFloat(output2[i][2] )
			},
			{
				axis: "total core budget(PPP)",
				value: parseFloat(output2[i][12])
			},
			{
				axis: "total current revenue",
				value: parseFloat(output2[i][3])
			},
			{
				axis: "total third party funding",
				value: parseFloat(output2[i][14])
			},
			{
				axis: "student fees funding",
				value: parseFloat(output2[i][13])
			}



			])
			
			console.log(parseFloat(output2[i][2]));

		}
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Educational'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "total academic staff",
				value: parseFloat(output2[i][4]) 
			},
			{
				axis: "total student enrolled ISCED 5-7",
				value: parseFloat(output2[i][6])
			},
			{
				axis: "total graduated ISCED 5-7",
				value: parseFloat(output2[i][7])
			},
			{
				axis: "total_student_enrolled_ISCED_8",
				value: parseFloat(output2[i][8])
			},
			{
				axis: "total_graduated_ISCED_8",
				value: parseFloat(output2[i][9])
			}



			])

		}
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 5; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	if (type.value=='Other'){
	
		for (i = 0; i < newdata.length; i++) {
			
			out.push([{
				axis: "share of woman academic staff",
				value: parseFloat(output2[i][15])
			},
			{
				axis: "share of women students ISCED 5-7",
				value: parseFloat(output2[i][16]) 
			},
			{
				axis: "share of foreign students ISCED 5-7",
				value: parseFloat(output2[i][18])
			},
			
			{
				axis: "PhD intensity",
				value: parseFloat(output2[i][17])
			}
			



			])

		}
		
	
		
		for (i = 0; i < out.length; i++) {
			for (j = 0; j < 4; j++) {
				if(isNaN(out[i][j].value))
					out[i][j].value=0;
		
		}
		
		}
	
	

		data = out;
		console.log(data);
		var allAxis = (data[0].map(function(i, j){return i.axis}))
		console.log(allAxis);
		
		
		
	}
	
	
	
	
	var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scale.category10()	//Color function
	};
	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(''),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
	
	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.style("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			
			var vegeta = d.map(function (obj) {
					return Object.keys(obj).map(function (key) {
						//console.log(obj[key]);
						return obj[key];
					});
				});
				var goku;
				for (ix = 0; ix < output2.length; ix++) {
					console.log(vegeta[1][1])
					console.log(output2[ix][35])
					if (type.value=='Educational'){
					
					if(isNaN(parseFloat(output2[ix][6])))
					output2[ix][6]=0;
					if ( vegeta[1][1] == parseFloat(output2[ix][6] )) {
						goku = output2[ix][0];
					
				}
				}
				if (type.value=='Financial'){
					
					if(isNaN(parseFloat(output2[ix][14])))
					output2[ix][14]=0;
					if ( vegeta[1][1] == parseFloat(output2[ix][12] )) {
						goku = output2[ix][0];
					
				}
				}
				
				if (type.value=='Other'){
					
					if(isNaN(parseFloat(output2[ix][16])))
					output2[ix][16]=0;
					if ( vegeta[1][1] == parseFloat(output2[ix][16])) {
						goku = output2[ix][0];
					
				}
				}
				
				}
				if(output!=null){
				for (ix = 0; ix < output.length; ix++) {
					console.log(vegeta[1][1])
					console.log(output[ix][16])
					if (type.value=='Educational'){
					
					if(isNaN(parseFloat(output[ix][27])))
					output[ix][27]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][27] )) {
						goku = output[ix][2];
					
				}
				}
				if (type.value=='Financial'){
					
					if(isNaN(parseFloat(output[ix][14])))
					output[ix][14]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][14] )) {
						goku = output[ix][2];
					
				}
				}
				
				if (type.value=='Other'){
					
					if(isNaN(parseFloat(output[ix][35])))
					output[ix][35]=0;
					if ( vegeta[1][1] == parseFloat(output[ix][35])) {
						goku = output[ix][2];
					
				}
				}
				
				}
		}
				
				
				p = $("path")
				//console.log(p);
				pos = p.position();
				//console.log(pos.top);
				//Dim all blobs
				console.log(goku);
				//console.log(pos);
				tip.html(goku)
					//.style("left",pos.left  + "px")
					//.style("top", pos.top + "px")
					.style("opacity", 1)  
					.style("left", (d3.event.pageX) + "px")     
					.style("top", (d3.event.pageY - 28) + "px");					
      
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			tip
      .style("opacity", 0)
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
		
		
	});		
		
		
		
		
	}

}	


