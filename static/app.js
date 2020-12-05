var tbody = d3.select("tbody");



d3.json("/data/US").then(function(results) {
    console.log(results);
    tbody.text("");

    results.forEach(data => {

        var row = tbody.append("tr");

        Object.entries(data).forEach(([key, value]) => {

            var cell = row.append("td");
            cell.text(value);
        });
    });
});