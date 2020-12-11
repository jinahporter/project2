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
  currentMetric = "likes";
  graphUpdate();
});
var viewButton = d3.select("#view");
viewButton.on("click", function () {
  currentMetric = "view_count";
  graphUpdate();
});
var dislikeButton = d3.select("#dislike");
dislikeButton.on("click", function () {
  currentMetric = "dislikes";
  graphUpdate();
});
var commentButton = d3.select("#comment");
ukButton.on("click", function () {
  currentMetric = "comment_count";
  graphUpdate();
});
//
function graphUpdate() {
  console.log(data);
  barPlot();
  grabTableData(data);

};
function barPlot() {
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

// // // // ========================================================= // // // //
// // // //                            END                            // // // //
// // // // ========================================================= // // // // 

// // // // ========================================================= // // // // 
// // // //      FUNCTION TO GET DATA FOR A TABLE                     // // // //
// // // // ========================================================= // // // // 
// function buildTable(categoryId, title, channelTitle, view_count, comment_count, trending_date, likes, dislikes, thumbnail_link) {
function grabTableData(data) {
  // currentMetric = "likes"
  var sortedData = data.sort((a, b) => `a.${currentMetric}` - `b.${currentMetric}`);
  sortedData.reverse()
  var top10TableData = sortedData.slice(0, 10);
  console.log(`Top 10 list for ${countryUpdate} ${currentMetric}`);
  console.log(currentMetric)
  console.log(top10TableData);

  buildTable1(top10TableData)
}

// function buildTable(data) {
//   tbody.html("");
//   var table = d3.select("#summary-table");
//   var tbody = table.select("tbody");
//   var trow;
//   for (var i = 0; i < data.length; i++) {
//     trow = tbody.append("tr");
//     trow.append("td").text(categoryId[i]);
//     trow.append("td").text(title[i]);
//     trow.append("td").text(channelTitle[i]);
//     trow.append("td").text(view_count[i]);
//     trow.append("td").text(comment_count[i]);
//     trow.append("td").text(trending_date[i]);
//     trow.append("td").text(likes[i]);
//     trow.append("td").text(dislikes[i]);
//     trow.append("td").text(thumbnail_link[i]);
//   }
// }
// }

function buildTable1(top10TableData) {
  tbody.html("");
  top10TableData.forEach(video => {
    // console.log(tableData);
    var row = tbody.append('tr');
    Object.values(video).forEach(value => {
      row.append('td').text(value);
    })
  })
}

    // // // // ========================================================= // // // // 