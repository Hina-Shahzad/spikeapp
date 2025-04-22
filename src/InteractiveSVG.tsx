import { useState, useEffect } from "react";
import * as d3 from 'd3';

const InteractiveSVG = () => {
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        fetch('/public/annotated_drillbit.svg')
            .then((res) => res.text())
            .then((data) => setSvgContent(data))
    }, [])

    useEffect(() => {
        if (!svgContent) return;

        const timeout = setTimeout(() => {
            const svg = d3.select("#svg-container svg");
            if (svg.empty()) return;

            const dragHandler = d3
                .drag<SVGGraphicsElement, unknown>()
                .on("start", function () {
                    d3.select(this).raise().attr("stroke", "black");
                })
                .on("drag", function (event) {
                    const el = d3.select(this);

                    // Handle circle/ellipse (move with cx, cy)
                    if (el.node()?.tagName === "circle" || el.node()?.tagName === "ellipse") {
                        const newX = event.x;
                        const newY = event.y;
                        el.attr("cx", newX).attr("cy", newY);
                        console.log("Dragging (circle/ellipse):", { x: newX, y: newY });
                    }

                    // Handle path (move with matrix)
                    else if (el.node()?.tagName === "path") {
                        const transform = el.attr("transform") || "matrix(1, 0, 0, 1, 0, 0)";
                        console.log("transform", transform);

                        // Extract the current matrix values
                        const match = /matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)/.exec(transform);
                        console.log("Match", match);

                        if (match) {
                            const a = parseFloat(match[1]);     // Horizontal scaling
                            const b = parseFloat(match[2]);     // vertical skewing
                            const c = parseFloat(match[3]);     // Horizontal skewing
                            const d = parseFloat(match[4]);     // Vertical scaling
                            const e = parseFloat(match[5]);     // Horizontal translation (x-axis)
                            const f = parseFloat(match[6]);     // Vertical translation (y-axis)

                            // Calculate new matrix based on drag movement (event.dx, event.dy)
                            const newMatrix = `matrix(${a}, ${b}, ${c}, ${d}, ${e + event.dx}, ${f + event.dy})`;

                            el.attr("transform", newMatrix);
                            console.log("Dragging (path):", newMatrix);
                        }
                    }
                })
                .on("end", function () {
                    const el = d3.select(this);
                    let newPosition;

                    if (el.node()?.tagName === "circle" || el.node()?.tagName === "ellipse") {
                        newPosition = {
                            x: el.attr("cx"),
                            y: el.attr("cy"),
                        };
                    } else if (el.node()?.tagName === "path") {
                        const transform = el.attr("transform");
                        const match = /matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)/.exec(transform || "");
                        newPosition = {
                            matrix: match ? match.slice(1) : [],
                        };
                    }

                    console.log("Final position:", newPosition);
                });

            // Apply dragHandler to both circle/ellipse and path (star)
            svg.selectAll<SVGGraphicsElement, unknown>("#scatterer, #source").call(dragHandler);

        }, 100);

        return () => clearTimeout(timeout);

    }, [svgContent]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            id="svg-container"
        />
    );
}

export default InteractiveSVG;
