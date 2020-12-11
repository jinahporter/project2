var data;
var currentMetric = "likes";
countryUpdate("US")
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
usButton.on("click", function () {
  countryUpdate(this.id);
});
var caButton = d3.select("#CA");
caButton.on("click", function () {
  countryUpdate(this.id);
});
var mxButton = d3.select("#MX");
mxButton.on("click", function () {
  countryUpdate(this.id);
});
var ukButton = d3.select("#UK");
ukButton.on("click", function () {
  countryUpdate(this.id);
});
//Grab new Country Data
function countryUpdate(cCode) {
  url = `/data/${cCode}`
  d3.json(url).then(function (response) {
    //console.log(response);
    data = response;

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
    }

    Plotly.newPlot("bar", data1, layout1);
  })
};
//metric buttons
var likeButton = d3.select("#like");
likeButton.on("click", function () {
  metricUpdate("likes");
  currentMetric("likes");
});
var viewButton = d3.select("#view");
viewButton.on("click", function () {
  metricUpdate("view_count");
  currentMetric("view_count")
});
var dislikeButton = d3.select("#dislike");
dislikeButton.on("click", function () {
  metricUpdate("dislikes");
  currentMetric("dislikes");
});
var commentButton = d3.select("#comment");
ukButton.on("click", function () {
  metricUpdate("comment_count");
  currentMetric("comment_count");
});
//
function metricUpdate(metric) {
  console.log(data)
}

// // // // ========================================================= // // // // 
// // // //      FUNCTION TO GET DATA FOR A TABLE                     // // // //
// // // // ========================================================= // // // // 
function buildTable(categoryId, title, channelTitle, view_count, comment_count, trending_date, likes, dislikes, thumbnail_link) {
  function composeTable(data) {
    // var metric = 'view_count'
    // var country = 'US'
    var sortedData = data.sort((a, b) => `b.${currentMetric}` - `a.${currentMetric}`);
    sortedData.reverse()
    var top10TableData = sortedData.slice(0, 10);
    console.log("Top 10 list for `${currentMetric}`: ", top10);


    var table = d3.select("#summary-table");
    var tbody = table.select("tbody");
    var trow;
    for (var i = 0; i < top10TableData.length; i++) {
      trow = tbody.append("tr");
      trow.append("td").text(categoryId[i]);
      trow.append("td").text(title[i]);
      trow.append("td").text(channelTitle[i]);
      trow.append("td").text(view_count[i]);
      trow.append("td").text(comment_count[i]);
      trow.append("td").text(trending_date[i]);
      trow.append("td").text(likes[i]);
      trow.append("td").text(dislikes[i]);
      trow.append("td").text(thumbnail_link[i]);
    }
  }
}

function tableBuildLoop(selectedID) {
  tbody.html("");
  top10TableData.forEach(Encounters => {
    // console.log(tableData);
    var row = tbody.append('tr');
    Object.values(Encounters).forEach(value => {
      row.append('td').text(value);
    })
  })
}

    // // // // ========================================================= // // // // 