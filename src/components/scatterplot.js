import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({
    movies,xAttr,yAttr,colorAttr,sizeAttr,opacityAttr,onSelection 
}) => {
    // creating a reference to the svg element //
        const svgRef = useRef();
        useEffect(() => {
            if (!movies.length || !xAttr || !yAttr) 
                return;

        // assigning width and height dimensions//
        const width = 800,
              height = 500,
              margin = 80;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

            // Cleaning and processing the data//
        const cleaned = movies
            .map(movie => ({...movie,
                [xAttr]: movie[xAttr] !== undefined && !isNaN(movie[xAttr]) ? +movie[xAttr] : "Unknown",
                [yAttr]: movie[yAttr] !== undefined && !isNaN(movie[yAttr]) ? +movie[yAttr] : "Unknown",
                [colorAttr]: movie[colorAttr] || "Unknown",
                [sizeAttr]: movie[sizeAttr] !== undefined && !isNaN(parseFloat(movie[sizeAttr])) ? parseFloat(movie[sizeAttr]) : "Unknown",
                [opacityAttr]: movie[opacityAttr] !== undefined && !isNaN(parseFloat(movie[opacityAttr])) ? parseFloat(movie[opacityAttr]) : 1,
                 
        }))
        .filter(movie => movie[xAttr] !== "Unknown" && movie[yAttr] !== "Unknown");

        if (cleaned.length === 0) return;

        // checking whether the x, y, size have the catergorical type or not //
        const isSizeNumeric = cleaned.every(movie => !isNaN(movie[sizeAttr]));

        let xa, yb, sizeScale;

        // Avoid straight line issue by ensuring different min/max values//
        const xDomain = d3.extent(cleaned, d => d[xAttr]);
        const yDomain = d3.extent(cleaned, d => d[yAttr]);

        //Apply a small buffer if min,max are the same//
        if (xDomain[0] === xDomain[1])
        {
            xDomain[0] -= 1;
            xDomain[1] += 1;
        }
        if (yDomain[0] === yDomain[1]) 
        {
            yDomain[0] -= 1;
            yDomain[1] += 1;
        }
        
        // scale linear for x axis, y axis for numerical data  //
        xa = d3.scaleLinear()
               .domain(xDomain)
               .range([margin, width - margin])
               .nice();

        yb = d3.scaleLinear()
               .domain(yDomain)
               .range([height - margin, margin])
               .nice();

        // if the size is numerical we us the linear scale or if the size is categorical we us the ordinal  scale //
        sizeScale = isSizeNumeric ? d3.scaleLinear()
                                    .domain(d3.extent(cleaned, d => d[sizeAttr]))
                                    .range([3, 10])
                                  : d3.scaleOrdinal()
                                    .domain([...new Set(cleaned.map(d => d[sizeAttr]))])
                                    .range([4, 6, 8, 10, 12]);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // scaling for opacity //
        const opacity = d3.scaleLinear()
                          .domain(d3.extent(cleaned, d => d[opacityAttr] || 0.5))
                          .range([0.3, 1]);

        // to get the smooth transition when chnaging the x and y axis//
        svg.selectAll(".x-axis")
            .data([0])
            .join("g")
            .attr("class", "x-axis")
            .transition().duration(500)
            .attr("transform", `translate(0, ${height - margin})`)
            .call(d3.axisBottom(xa) 
                    .ticks(6).tickFormat(d => d3.format(".2s")(d)));

        svg.selectAll(".y-axis")
            .data([0])
            .join("g")
            .attr("class", "y-axis")
            .transition().duration(500)
            .attr("transform", `translate(${margin}, 0)`)
            .call(d3.axisLeft(yb)
                    .ticks(6).tickFormat(d => d3.format(".2s")(d)));

        // datapointrs in the scatterplot to appear//
        svg.selectAll("circle")
            .data(cleaned, d => d.id)
            .join(
                // adding new circle element to each data point
                enter => enter.append("circle")
                    .attr("cx", d => xa(d[xAttr]))
                    .attr("cy", d => yb(d[yAttr]))
                    .attr("r", d => sizeScale(d[sizeAttr] || 5))
                    .attr("fill", d => color(d[colorAttr]))
                    .attr("opacity", d => opacity(d[opacityAttr] || 0.5))
                    .attr("stroke", "none")
                    .attr("stroke-width", 1)
                    .style("opacity", 0)
                     // smooth transition with the lasting 500 ms//
                    .transition().duration(500)
                    .style("opacity", 1),

                //whenever the circles need to be updated, it will apply smooth transition duration of 500 ms//
                update => update.transition().duration(500)
                    .attr("cx", d => xa(d[xAttr]))
                    .attr("cy", d => yb(d[yAttr]))
                    .attr("r", d => sizeScale(d[sizeAttr] || 5))
                    .attr("fill", d => color(d[colorAttr]))
                    .attr("opacity", d => opacity(d[opacityAttr] || 0.5)),

                // exit if there are no circles //
                exit => exit.transition().duration(500)
                    .style("opacity", 0)
                    .remove()
            );
        
        // brushing technique for selecting the area //
        const brush = d3.brush()
            .on("start brush", function ({ selection }) {
                if (!selection) 
                    return;

                const [[x0, y0], [x1, y1]] = selection;
                let selectedData = cleaned.filter(d =>
                    x0 <= xa(d[xAttr]) && xa(d[xAttr]) <= x1 &&
                    y0 <= yb(d[yAttr]) && yb(d[yAttr]) <= y1
                );
                if (onSelection) onSelection(selectedData);
            })
             // if there is no selection done then circle remain same with no border//
            .on("end", function ({ selection }) {
                if (!selection)
                { 
                    svg.selectAll("circle")
                        .attr("stroke", "none")
                        .attr("stroke-width", 2);
                    if (onSelection) onSelection([]); 
                    return;
                }
                const [[x0, y0], [x1, y1]] = selection;
                // setting black border through brushing so that the datapoints get highlighted//
                svg.selectAll("circle")
                    .attr("stroke", d =>
                        x0 <= xa(d[xAttr]) && xa(d[xAttr]) <= x1 &&
                        y0 <= yb(d[yAttr]) && yb(d[yAttr]) <= y1 ? "black" : "none"
                    )
                    .attr("stroke-width", d =>
                        x0 <= xa(d[xAttr]) && xa(d[xAttr]) <= x1 &&
                        y0 <= yb(d[yAttr]) && yb(d[yAttr]) <= y1 ? 1 : 0
                    );
            });

        svg.call(brush);

    }, [movies, xAttr, yAttr, colorAttr, sizeAttr, opacityAttr, onSelection]);

    return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;