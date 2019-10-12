import * as d3 from "d3";
import { map } from "lodash";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

const MARGIN = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 50,
  LEFT: 70
};

const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;

class D3Chart {
  constructor(node) {
    const svg = d3
      .select(node.current)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    d3.json(url).then(data => {
      const xScale = d3
        .scaleBand()
        .domain(map(data, d => d.name))
        .range([0, WIDTH])
        .padding(0.4);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, d => d.height) * 0.95,
          d3.max(data, d => d.height)
        ])
        .range([HEIGHT, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      //append axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxis);
      svg.append("g").call(yAxis);

      //append text
      svg
        .append("text")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + 50)
        .attr("text-anchor", "middle")
        .text("Tallest men on the world");

      svg
        .append("text")
        .attr("x", -HEIGHT / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Height [cm]");

      //draw bars
      const rects = svg.selectAll("rect").data(data);

      rects
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.height))
        .attr("width", xScale.bandwidth)
        .attr("height", d => HEIGHT - yScale(d.height))
        .attr("fill", "green");
    });
  }
}

export default D3Chart;
