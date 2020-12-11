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
var ukButton = d3.select("#BR");
ukButton.on("click", function () {
  currentCountry=(this.id);
  graphUpdate();
});
//Grab new Country Data
function countryUpdate(cCode) {
  currentCountry = cCode;
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
  // console.log(data);
  barPlot();
  grabTableData();
  newBarPlot();
};
function barPlot() {
  url = `/bar/${currentCountry}/${currentMetric}`
  d3.json(url).then(function (response) {

  //Jinah: building the bar chart using Plotly

    var y_value = Object.keys(response);
      //console.log(x_value);

    var x_value = Object.values(response);
    //console.log(y_value);

    var trace1 = {
      x: x_value,
      y: y_value,
      type: "bar",
      orientation: 'h',
      name: `${currentMetric} for ${currentCountry}`,
      marker: {
        color: 'rgba(55, 128, 191, 0.6',
        width: 1
      }
    }

    var data1 = [trace1];

    var layout1 = {
      title: `${currentMetric} for ${currentCountry}`
    };

    Plotly.newPlot("bar", data1, layout1);
  })
};

function newBarPlot() {
  url = `/data/${currentCountry}`
  data = d3.json(url).then(function (response) {
    //jinah (12/11 12pm) - line 103 works
    //console.log(response);

    var likes_count = response.map(a => a.likes);
    console.log(likes_count);

    var likes_count_sorted = likes_count.sort((a, b) => b-a).slice(0, 10);
    console.log(likes_count_sorted);
    //likes_count_sorted.reverse()

    //var likes_count_sorted_top10 = likes_count_sorted.slice(0, 10);
    //likes_count_sorted_top10.reverse()
    //console.log(likes_count_sorted_top10);


  });
};

// // // // ========================================================= // // // // 
// // // //      FUNCTION TO GET DATA FOR A TABLE                     // // // //
// // // // ========================================================= // // // // 
// function buildTable(categoryId, title, channelTitle, view_count, comment_count, trending_date, likes, dislikes, thumbnail_link) {
function grabTableData() {
  url = `/data/${currentCountry}`
  data=d3.json(url).then(function (response) {
  
    // currentMetric = "likes"
    //console.log(response);
    var sortedData = response.sort((a, b) => a[currentMetric] - b[currentMetric]);
    sortedData.reverse()
    var top10TableData = sortedData.slice(0, 10);
    //console.log(`Top 10 list for ${countryUpdate} ${currentMetric}`);
    //console.log(top10TableData);
  
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
    //console.log(data[i])
    trow = teebody.append("tr");
    trow.append("td").text(data[i].categoryId);
    trow.append("td").text(data[i].title);
    trow.append("td").text(data[i].channelTitle);
    trow.append("td").text(data[i].view_count);
    trow.append("td").text(data[i].comment_count);
    trow.append("td").text(data[i].trending_date);
    trow.append("td").text(data[i].likes);
    trow.append("td").text(data[i].dislikes);
    trow.append("td").append("a")
      .attr("href",`https://www.youtube.com/watch?v=${data[i].video_id}`)
      .append("img")
      .attr("src",data[i].thumbnail_link);
  }
}
