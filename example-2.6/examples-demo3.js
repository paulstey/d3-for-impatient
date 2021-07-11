function makeDemo3() {
  d3.csv("http://192.168.0.141:8080/examples-multiple.csv")
    .then( function(data) {
      let svg = d3.select("svg")

      let pxX = svg.attr("width")
      let pxY = svg.attr("height")

      const makeScale = function(accessor, range) {
        return d3.scaleLinear()
                 .domain(d3.extent(data, accessor))
                 .range(range).nice()
      }

      let scX  = makeScale(d => d["x"],  [0, pxX])
      let scY1 = makeScale(d => d["y1"], [pxY, 0])
      let scY2 = makeScale(d => d["y2"], [pxY, 0])

      
      const drawData = function(g, accessor, curve) {

        g.selectAll("circle").data(data)
                             .enter()
                             .append("circle")
                             .attr("r", 5)
                             .attr("cx", d => scX(d["x"]))
                             .attr("cy", accessor)
        let lnMkr = d3.line()
                      .curve(curve)
                      .x(d => scX(d["x"]))
                      .y(accessor)

        g.append("path").attr("fill", "none")
                        .attr("d", lnMkr(data))
      }

      let g1 = svg.append("g")
      let g2 = svg.append("g")

      drawData(g1, d => scY1(d["y1"]), d3.curveStep)
      drawData(g2, d => scY2(d["y2"]), d3.curveNatural)

      g1.selectAll("circle").attr("fill", "purple")
      g1.selectAll("path").attr("stroke", "purple")

      g2.selectAll("circle").attr("fill", "navy")
      g2.selectAll("path").attr("stroke", "navy")
      
      let axMkr = d3.axisRight(scY1)
      axMkr(svg.append("g"))

      axMkr = d3.axisLeft(scY2)
      
      svg.append("g")
         .attr("transform", "translate(" + pxX + ",0)")
         .call(axMkr)

      svg.append("g")
         .call(d3.axisTop(scX))
         .attr("transform", "translate(0," + pxY + ")")
    })
}