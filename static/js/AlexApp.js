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
    console.log(response);
    data = response;
    response.forEach(element => {
      console.log(element)
    });
    metricUpdate(currentMetric);
  })
};
//metric buttons
var likeButton = d3.select("#like");
likeButton.on("click", function () {
  metricUpdate("likes");
  currentMetric = "likes";
});
var viewButton = d3.select("#view");
viewButton.on("click", function () {
  metricUpdate("view_count");
  currentMetric = "view_count";
});
var dislikeButton = d3.select("#dislike");
dislikeButton.on("click", function () {
  metricUpdate("dislikes");
  currentMetric = "dislikes";
});
var commentButton = d3.select("#comment");
ukButton.on("click", function () {
  metricUpdate("comment_count");
  currentMetric = "comment_count";
});
//
function metricUpdate(metric) {
  // console.log(data);
  // console.log(data[1]),
  //   console.log(data.view_count),
  //   console.log(data.likes),
  //   console.log(data[225].dislikes)\


  data.forEach(element => {
    console.log(element)
  });


  // sortData.reverse()
  // var top10Data = sortData.slice(0, 10);
  // console.log(data);
  // console.log(sortData)
  // console.log(top10Data)

  //make a dictionary where the keys are the catergories
  //Loop through and add to the value of the dict 
};

// // // // ========================================================= // // // // 
// // // //      OPTIONAL FOR A xxx BAR WITH A FILTER BUTTON          // // // //
// // // // ========================================================= // // // //
// Create a custom function to run a filter on the data when the search values are given and the 'Filter button' is pressed
// Select the button
var button = d3.select("#filter-btn");

button.on("click", function () {

  // Select the input element and get the raw HTML node
  var inputElementCountry = d3.select("#countryPick");
  var inputElementMetric = d3.select("#metricPick");
  var inputElementYear = d3.select("#yearPick");

  // Get the value property of the input element
  var inputCountry = inputElementCountry.property("value");
  var inputMetric = inputElementMetric.property("value");
  var inputYear = inputElementYear.property("value");

  console.log(inputCountry, inputMetric, inputYear);

});
// // // // ========================================================= // // // //
// // // //                            END                            // // // //
// // // // ========================================================= // // // // 

// // // // ========================================================= // // // // 
// // // //      FUNCTION TO GET DATA FOR A TABLE                     // // // //
// // // // ========================================================= // // // // 
// function tableBuildLoop(selectedID) {
// function composeTable(data) {
  // var sortData = data.view_count.sort((a, b) => b - a);
  // sortData.reverse()
  // var top10Data = sortData.slice(0, 10);
  // console.log(data);
  // console.log(sortData)
  // console.log(top10Data)


  // tbody.html("");
  // top10data.forEach(Encounters => {
  //   // console.log(tableData);

  //   var row = tbody.append('tr');

  //   Object.values(Encounters).forEach(value => {
  //     row.append('td').text(value);
  //   });

  // });
// };
// // // // // ========================================================= // // // // 
// // // // //                            END                            // // // //
// // // // // ========================================================= // // // // 

// composeTable(data);