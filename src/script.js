// Do later
/* const {months} = require('utils/format.js')
console.log(months) */
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const colors = [
    '#008000',
    '#FF3933',
    '#FFFF00' 
]

d3.json('/src/database/data2020.json').then(function(data){
    generate(data)
})

function generate(data){
    const chart_width = 1500
    const chart_height = 800
    var x_padding = 20
    var y_padding = 70

    // Create svg
    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', chart_width)
        .attr('height', chart_height)

    // Create Scales
    var x_scale = d3.scaleBand()
        .domain(d3.range(months.length))
        .rangeRound(
            [y_padding, chart_width - x_padding]
        )

    var y_scale = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([0, chart_height - x_padding])
        .paddingInner(0.3)
        
    // Create Axis
    var x_axis = d3.axisBottom(x_scale)
        .ticks(months.length)
        .tickFormat(function(d){
            return months[d]
        })
    svg.append('g')
        .attr('class', 'x-axis')
        .attr(
            'transform',
            'translate(0, ' + (chart_height - x_padding) + ')'
        )
        .call(x_axis)
            
    var y_axis = d3.axisLeft(y_scale)
        .ticks(data.length)
        .tickFormat(function(d){
            return data[d].task
        })

    svg.append('g')
        .attr('class', 'y-axis')
        .attr(
            'transform',
            'translate(' + y_padding + ',0)'
        )
        .call(y_axis)

    svg.append('g')
        .attr('class', 'bars')
        .attr('id', 'bars')

    bars = svg.select('.bars')
    bars.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d){
            return x_scale(d.start)
        })
        .attr('y', function(d, i){
            return y_scale(i)
        })
        .attr('width', function(d){
            return x_scale(d.finish) - x_scale(d.start)
        })
        .attr('height', y_scale.bandwidth())
        .attr('fill', function(d){
            switch (d.status){
                case "Complete":
                    return colors[0]
                case "Not Started":
                    return colors[1]
                case "Incomplete":
                    return colors[2]
                default:
                    return '#808080'
            }
        })

}