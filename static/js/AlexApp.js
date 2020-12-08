var url = "/data/MX";
var tbody = d3.select("tbody");
d3.json(url).then(function(response) {
  console.log(response);
  tbody.text("");

  response.forEach(entry => {
      
    var row = tbody.append("tr");
  
    Object.entries(entry).forEach(([key, value]) => {

      var cell = row.append("td");
      cell.text(value);

    });
  });
});

var usButton = d3.select("#US");
usButton.on("click",function(){
  url="/data/US"
  d3.json(url).then(function(response) {
    console.log(response);
  })
});