function makeDemo2() {
  d3.csv("http://192.168.0.141:8080/examples-multiple.csv")
    .then( function(data) {
      let pxX = 600;
      let pxY = 300;

      let scX = d3.scaleLinear()
                  .domain(d3.extent(data, d => d["x"]))
                  .range([0, pxX]);
      let scY1 = d3.scaleLinear()
                   .domain(d3.extent(data, d => d["y1"]))
                   .range([0, pxY]);
      let scY2 = d3.scaleLinear()
                   .domain(d3.extent(data, d => d["y2"]))
                   .range([pxY, 0])

      d3.select("svg")
        .append("g").attr("id", "ds1")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5).attr("fill", "purple")
        .attr("cx", d => scX(d["x"]))
        .attr("cy", d => scY1(d["y1"]));

      d3.select("svg")
        .append("g").attr("id", "ds2")
        .attr("fill", "navy")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d => scX(d["x"]))
        .attr("cy", d => scY2(d["y2"]));

      let lineMaker = d3.line()
                        .x(d => scX(d["x"]))
                        .y(d => scY1(d["y1"]));
      d3.select("#ds1")
        .append("path")
        .attr("fill", "none").attr("stroke", "purple")
        .attr("d", lineMaker(data));
      
      lineMaker.y(d => scY2(d["y2"]));

      d3.select("#ds2")
        .append("path")
        .attr("fill", "none").attr("stroke", "navy")
        .attr("d", lineMaker(data));
    
    });
}