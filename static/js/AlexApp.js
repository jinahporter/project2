var url = "/data/MX";
var tbody = d3.select("tbody");
var data;
var currentMetric  = "likes";
// d3.json(url).then(function(response) {
//   console.log(response);
//   tbody.text("");

//   response.forEach(entry => {
      
//     var row = tbody.append("tr");
  
//     Object.entries(entry).forEach(([key, value]) => {

//       var cell = row.append("td");
//       cell.text(value);

//     });
//   });
// });

//Country Buttons
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
//Grab new Country Data
function countryUpdate(cCode){
  url=`/data/${cCode}`
  d3.json(url).then(function(response) {
      // console.log(response);
      data = response; 
      metricUpdate(currentMetric);
    })
};
//metric buttons
var likeButton = d3.select("#like");
likeButton.on("click",function(){
  metricUpdate("likes");
  currentMetric("likes");
});
var viewButton = d3.select("#view");
viewButton.on("click",function(){
  metricUpdate("view_count");
  currentMetric("view_count")
});
var dislikeButton = d3.select("#dislike");
dislikeButton.on("click",function(){
  metricUpdate("dislikes");
  currentMetric("dislikes");
});
var commentButton = d3.select("#comment");
ukButton.on("click",function(){
  metricUpdate("comment_count");
  currentMetric("comment_count");
});
//
function metricUpdate(metric){
  console.log(data)
}