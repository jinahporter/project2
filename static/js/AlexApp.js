var currentMetric = "likes";
var currentCountry="US"
graphUpdate();


//Country Buttons
var usButton = d3.select("#US");
usButton.on("click", function () {
  currentCountry=(this.id);
  graphUpdate();
});
var caButton = d3.select("#CA");
caButton.on("click", function () {
  currentCountry=(this.id);
  graphUpdate();
});
var mxButton = d3.select("#MX");
mxButton.on("click", function () {
  currentCountry=(this.id);
  graphUpdate();
});
var ukButton = d3.select("#UK");
ukButton.on("click", function () {
  currentCountry=(this.id);
  graphUpdate();
});
//Grab new Country Data
function countryUpdate(cCode) {
  currentCountry=cCode;
  url = `/data/${cCode}`
  data=d3.json(url).then(function (response) {
    return response;
  })
  console.log(data[0]);
  graphUpdate();
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
  // console.log(data);
  barPlot();
  grabTableData();
};
function barPlot(){
  url = `/bar/${currentCountry}/${currentMetric}`
  d3.json(url).then(function (response) {

  //Jinah: building the bar chart using Plotly

    var x_value = Object.keys(response);
      //console.log(x_value);

    var y_value = Object.values(response);
    //console.log(y_value);

    var trace1 = {
      x: x_value,
      y: y_value,
      type: "bar",
      name: `${currentMetric} for Country: ${currentCountry}`
    }

    var data1 = [trace1];

    var layout1 = {
      title: "testing"
    };

    Plotly.newPlot("bar", data1, layout1);
  })
};

// // // // ========================================================= // // // // 
// // // //      FUNCTION TO GET DATA FOR A TABLE                     // // // //
// // // // ========================================================= // // // // 
// function buildTable(categoryId, title, channelTitle, view_count, comment_count, trending_date, likes, dislikes, thumbnail_link) {
function grabTableData() {
  url = `/data/${currentCountry}`
  data=d3.json(url).then(function (response) {
  
    // currentMetric = "likes"
    console.log(response);
    var sortedData = response.sort((a, b) => a[currentMetric] - b[currentMetric]);
    sortedData.reverse()
    var top10TableData = sortedData.slice(0, 10);
    console.log(`Top 10 list for ${countryUpdate} ${currentMetric}`);
    console.log(top10TableData);
  
    buildTable_v1(top10TableData)
  })
}
  
function buildTable_v1(data) {
  teebody = d3.select("tbody");
  teebody.html("");
  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
  var trow;

  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    trow = teebody.append("tr");
    trow.append("td").text(data[i].categoryId);
    trow.append("td").text(data[i].title);
    trow.append("td").text(data[i].channelTitle);
    trow.append("td").text(data[i].view_count);
    trow.append("td").text(data[i].comment_count);
    trow.append("td").text(data[i].trending_date);
    trow.append("td").text(data[i].likes);
    trow.append("td").text(data[i].dislikes);
    trow.append("td").text(data[i].thumbnail_link);
  }
}
