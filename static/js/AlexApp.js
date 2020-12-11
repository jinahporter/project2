var data;
var currentMetric = "likes";
countryUpdate("US");


//Country Buttons
var usButton = d3.select("#US");
usButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
});
var caButton = d3.select("#CA");
caButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
});
var mxButton = d3.select("#MX");
mxButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
});
var ukButton = d3.select("#UK");
ukButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
});
//Grab new Country Data
function countryUpdate(cCode) {
  url = `/data/${cCode}`
  d3.json(url).then(function (response) {
    //console.log(response);
    data = response;
  })
};
//metric buttons
var likeButton = d3.select("#like");
likeButton.on("click", function () {
  currentMetric="likes";
  graphUpdate();
});
var viewButton = d3.select("#view");
viewButton.on("click", function () {
  currentMetric="view_count";
  graphUpdate();
});
var dislikeButton = d3.select("#dislike");
dislikeButton.on("click", function () {
  currentMetric="dislikes";
  graphUpdate();
});
var commentButton = d3.select("#comment");
ukButton.on("click", function () {
  currentMetric="comment_count";
  graphUpdate();
});
//
function graphUpdate() {
  console.log(data);
  barPlot();
};
function barPlot(){
  //Jinah: building the bar chart using Plotly

  var x_value = data.map(a => a.categoryId);
  //console.log(x_value);

  var y_value = data.map(a => a.country);
  //console.log(y_value);

  var mColor = data.map(a => a.categoryID);
  var mSize = data.map(a => a.country);
  var textValue = data.map(a => a.categoryID);

  var trace1 = {
    x: x_value,
    y: y_value,
    text: textValue,
    mode: "markers",
    marker: {
      color: mColor,
      size: mSize
    }
  };

  var data1 = [trace1];

  var layout1 = {
    title: "Testing"
  };

  Plotly.newPlot("bar", data1, layout1);
};