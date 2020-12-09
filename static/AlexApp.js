
var url = "/data/MX";
var tbody = d3.select("tbody");
/* d3.json(url).then(function(response) {
  console.log(response);
  tbody.text("");

  response.forEach(entry => {
      
    var row = tbody.append("tr");
  
    Object.entries(entry).forEach(([key, value]) => {

      var cell = row.append("td");
      cell.text(value);

    });
  });
}); */

var usButton = d3.select("#US");
usButton.on("click",function(){
  countryUpdate(this.id);
});
var caButton = d3.select("#CA");
caButton.on("click",function(){
  countryUpdate(this.id);
});
var mxButton = d3.select("#MX");
mxButton.on("click",function(){
  countryUpdate(this.id);
});
var ukButton = d3.select("#UK");
ukButton.on("click",function(){
  countryUpdate(this.id);
});
function countryUpdate(cCode){
  url=`/data/${cCode}`
  d3.json(url).then(function(response) {
      console.log(response);
    })
};
