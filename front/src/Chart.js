import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';
import "./chart.css"


const Chart = () => {

	
	const margin = { top: 50, right: 30, bottom: 30, left: 60 }

	let temps = [];


	useEffect(()=>{

	const myHeaders = new Headers({
		"Content-Type": "application/json",
		Accept: "application/json"
	});


	fetch("http://localhost:3003/barchart", {
		header: myHeaders
	})
		.then(response => {
			console.log("response", response);
			return response.json()
		}).then(json=> {
			const data =[
				{category:"Brooklyn", quantity: json[0].Brooklyn},
				{category:"Queens", quantity: json[0].Queens},
				{category:"Bronx", quantity: json[0].Bronx},
				{category:"Manhattan", quantity: json[0].Manhattan}
			]
			

			console.log("data",data);
			console.log("json",json);
			console.log("Manh",json.Manhattan);
			console.log("data",data);
			console.log("data",data);

		const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom


		const svg = d3.select(d3Chart.current)
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

		// Draw bars
		svg.append('g')
			.attr('fill', '#65f0eb')
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('x', (d, i) => x(i))
			.attr('y', d => y(d.quantity))
			.attr('height', d => y(0) - y(d.quantity))
			.attr('width', x.bandwidth())

		})
		DrawChart(temps)



	},[temps])

	
 




	const d3Chart = useRef()
	// Ref for updating dimention 
	// const [dimensions, setDimensions] = useState({
	// 	width: window.innerWidth,
	// 	height: window.innerHeight
	// })
	// Ref for resize event update
	// const update = useRef(false)

	// useEffect(() => {

	// 	// Listen for any resize event update
	// 	window.addEventListener('resize', () => {
	// 		setDimensions({
	// 			width: window.innerWidth,
	// 			height: window.innerHeight
	// 		})

	// 		// If resize, remove the previous chart
	// 		if (update.current) {
	// 			d3.selectAll('g').remove()
	// 		} else { update.current = true }
	// 	})

	// 	// Draw chart using the data and updated dimensions
	// 	DrawChart(sample, dimensions)

	// }, [dimensions])

	function DrawChart(data) {

		// console.log(dimensions.width, dimensions.height)

		
	}

	return (
		<div id='d3demo'>
			<svg ref={d3Chart}></svg>
		</div>
	)
}

export default Chart