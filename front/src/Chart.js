import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./chart.css"


const Chart = () => {


	const margin = { top: 50, right: 30, bottom: 30, left: 60 }
	const d3Chart = useRef()
	let temps = [];


	useEffect(() => {

		const myHeaders = new Headers({
			"Content-Type": "application/json",
			Accept: "application/json"
		});


		fetch("http://localhost:3003/barchart", {
			header: myHeaders
		})
			.then(response => {
				return response.json()
			}).then(json => {
				const data = [
					{ category: "Brooklyn", quantity: json[0].Brooklyn },
					{ category: "Queens", quantity: json[0].Queens },
					{ category: "Bronx", quantity: json[0].Bronx },
					{ category: "Manhattan", quantity: json[0].Manhattan }
				]
				let flag = true;
				let color = ["#4C3F91", "#9145B6", "#B958A5", "#FF5677"];
				const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
				const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom




				const svg = d3.select(d3Chart.current)
					.style("background", "#0AA")
					.attr('width', chartwidth + margin.left + margin.right)
					.attr('height', chartheight + margin.top + margin.bottom)

				// x scale
				const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)


				svg.append('g')
					.attr('transform', 'translate(0,' + chartheight + ')')
					.call(d3.axisBottom(x).tickFormat(i => data[i].category).tickSizeOuter(0))



				const max = d3.max(data, function (d) { return d.quantity })

				// y scale
				const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

				svg.append('g')
					.attr('transform', 'translate(' + margin.left + ',0)')
					.call(d3.axisLeft(y))

				//Tooltip
				const tooldiv = d3.select("#d3demo")
					.append("div")
					.style("visibility", "hidden")
					.style("position", "absolute")
					.style("background", "#EEEEEE")
					.style("padding", "7px")
					.style("border-radius", "5px")

				//the div
				const arrayDiv = d3.select("#d3demo")
					.append("div")
					.style("display", "none")
					.style("position", "absolute")
					.style("background", "#EEEEEE")
					.style("padding", "7px")
					.style("height", "34vh")
					.style("width", "34vw")
					.style("border-radius", "5px")


				//button 
				const button = d3.selectAll("#show_div")
					.style("border", "15px")
					.style("padding", "15px")
					.style("size", "3rem")
					.style("font-size", "bold")
					.on("click", () => {
						if (flag) {
							arrayDiv
								.style("display", "flex")
								.append("ul")
								.style("display", "flex")
								.style("flex-direction", "column")
								.selectAll("li")
								.data(data).enter()
								.append("li")
								.attr("class","text_for_div")
								.attr("loop", (d,i)=>{
									//let myli = d3.selectAll("text_for_div").text(d.category)
									
								
								}).text("Hello there")

			

						} else {
							arrayDiv.style("display", "none");
						}



						flag = !flag;
						console.log("flag:", flag)
					})








				// Draw bars
				svg.append('g')
					.selectAll('rect')
					.data(data)
					.join('rect')
					.attr('fill', (d, i) => {
						d.color = color[i]
						d.id = i;
						return color[i];
					})
					.attr('x', (d, i) => x(i))
					.attr('y', d => y(d.quantity))
					.attr('height', d => y(0) - y(d.quantity))
					.attr('width', x.bandwidth())
					.on("mouseover", (event, d) => {
						let rect = event.target;
						rect.style.fill = "#004542";
						const e = svg.nodes();
						console.log(e)
						const i = e.indexOf(event)
						console.log(i)

						console.log(event.target.x.animVal.value)
						tooldiv.style("visibility", "visible")
							.text(`${d.quantity}`)
							.style("left", (event.target.x.animVal.value + 250) + "px")
							.style("top", (event.target.y.animVal.value - 10) + "px")


					})
					.on("mouseout", (e, d) => {
						e.target.style.fill = d.color;

						tooldiv.style("visibility", "hidden")
					})



			})


		DrawChart(temps)



	}, [temps])






	function DrawChart(data) {
	}

	return (
		<div id='d3demo'>
			<svg ref={d3Chart}></svg>
			<button id="show_div">Show</button>
		</div>
	)
}

export default Chart