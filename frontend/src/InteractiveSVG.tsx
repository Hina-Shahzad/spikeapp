import { useState, useEffect } from "react";
import * as d3 from "d3";
import { fetchSceneSVG, updatePosition } from "./services/apiService";
import { Position } from "./types/api";

const InteractiveSVG = () => {
    const [svgContent, setSvgContent] = useState<string>("");

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const svgText = await fetchSceneSVG(100);
                setSvgContent(svgText);
            } catch (err) {
                console.error("Error loading SVG:", err);
            }
        };

        loadSVG();
    }, []);

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

                    if (el.node()?.tagName === "circle" || el.node()?.tagName === "ellipse") {
                        el.attr("cx", event.x).attr("cy", event.y);
                    } 
                    /*else if (el.node()?.tagName === "path") {
                        const transform = el.attr("transform") || "matrix(1, 0, 0, 1, 0, 0)";
                        const match = /matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)/.exec(transform);
                        if (match) {
                            const [a, b, c, d, e, f] = match.slice(1).map(parseFloat);
                            const newMatrix = `matrix(${a}, ${b}, ${c}, ${d}, ${e + event.dx}, ${f + event.dy})`;
                            el.attr("transform", newMatrix);
                        }
                    }*/
                })
                .on("end", function () {
                    const el = d3.select(this);
                    let position: Position | undefined;

                    if (el.node()?.tagName === "circle" || el.node()?.tagName === "ellipse") {
                        position = {
                            x: parseFloat(el.attr("cx") || "0"),
                            y: parseFloat(el.attr("cy") || "0"),
                        };
                    } 
                    /*else if (el.node()?.tagName === "path") {
                        const transform = el.attr("transform");
                        const match = /matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)/.exec(transform || "");
                        if (match) {
                            position = {
                                matrix: match.slice(1),
                            };
                        }
                    }*/

                    // Only call API if position is valid
                    if (position) {
                        updatePosition(position)
                            .then((res) => console.log("Backend update success:", res, "new position is", position))
                            .catch((err) => console.error("Update error:", err));
                    } else {
                        console.warn("Position not available for update.");
                    }
                });

            svg.selectAll<SVGGraphicsElement, unknown>("#handleid").call(dragHandler);
        }, 100);

        return () => clearTimeout(timeout);
    }, [svgContent]);

    return (
        <div
            id="svg-container"
            style={{ width: '100%', height: '512px' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export default InteractiveSVG;
