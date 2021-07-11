function makeDemo1() {
  d3.csv("http://192.168.0.141:8080/examples-simple.csv")
    .then( function(data) {
      d3.select("svg")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5).attr("fill", "purple")
        .attr("cx", d => d["x"])
        .attr("cy", d => d["y"]);
    });
}