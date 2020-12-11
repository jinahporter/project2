var data;
var currentMetric = "likes";
var currentCountry = "US"
countryUpdate("US");


//Country Buttons
var usButton = d3.select("#US");
usButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
  //console.log("working")
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
var ukButton = d3.select("#BR");
ukButton.on("click", function () {
  countryUpdate(this.id);
  graphUpdate();
});
//Grab new Country Data
function countryUpdate(cCode) {
  currentCountry = cCode;
  url = `/data/${cCode}`
  d3.json(url).then(function (response) {
    console.log(response);
    data = response;
  })
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
  newPlot();
};
function barPlot() {
  url = `/bar/${currentCountry}/${currentMetric}`
  d3.json(url).then(function (response) {
    console.log(response);

    //Object.entries(([key, value]))

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
  });
}

//create top 10 h-bar chart
function newPlot() {
  //currentCountry = countryCode;
  url2 = `/data/${currentCountry}`
  d3.json(url2).then(function (response) {
    //console.log("urls");
    console.log(response);
    data = response;

    var sortedData = data.sort((a, b) => a[currentMetric] - b[currentMetric]);
    sortedData.reverse()

    var top10_views = sortedData.slice(0, 10);
    console.log(`Top 10 Views`);
    console.log(top10_views);

    var titles = data.map(a => a.title);
    console.log(titles);

    var trace2 = {
      x: titles,
      y: top10_views,
      type: "bar"
    };

    var data2 = [trace2];

    var layout2 = {
      title: `Top 10 Views in ${currentCountry}`,
      xaxis: { title: "Video Titles" },
      yaxis: { title: "Total Views" }
    };

    Plotly.newPlot("bar2", data2, layout2); */


  })
};