import { useState, useEffect } from "react";
import * as d3 from "d3";
import { fetchSceneSVG, updatePosition } from "./services/apiService";
import './style.css';

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

        const svg = d3.select("#svg-container svg");
        const tooltip = d3.select("#tooltip");
        if (svg.empty()) return;

        const createDragHandler = (groupClass: string, role?: "start" | "end") => {
            return d3.drag<SVGGraphicsElement, unknown>()
                .on('start', function () {
                    d3.select(this).raise().attr("stroke", "black");
                })
                .on('drag', function (event) {
                    const el = d3.select(this);
                    const newX = event.x;
                    const newY = event.y;
                    el.attr("cx", newX).attr("cy", newY);

                    svg.selectAll<SVGGraphicsElement, unknown>(`.${groupClass}`)
                        .each(function () {
                            const element = d3.select(this);
                            const elementType = element.node()?.nodeName;

                            if (elementType === "circle") {
                                element.attr("cx", newX).attr("cy", newY);
                            } else if (elementType === "rect") {
                                element.attr("x", newX - 50).attr("y", newY - 50);
                            } else if (elementType === "ellipse") {
                                element.attr("cx", newX).attr("cy", newY);
                            } else if (elementType === "path") {
                                element.attr("d", function () {
                                    const pathData = element.attr("d");
                                    const curveMatch = /M\s*([-.\d]+),\s*([-.\d]+)\s*C\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+),\s*([-.\d]+)/.exec(pathData);
                                    if (curveMatch) {
                                        let [_, startX, startY, c1x, c1y, c2x, c2y, endX, endY] = curveMatch.map(Number);

                                        if (role === "start") {
                                            const dx = newX - startX;
                                            const dy = newY - startY;
                                            return `M${newX},${newY} C${c1x + dx},${c1y + dy}, ${c2x + dx},${c2y + dy}, ${endX + dx},${endY + dy}`;
                                        } else {
                                            console.log("End is going to move ")
                                            const dx = newX - endX;
                                            const dy = newY - endY;
                                            return `M${startX},${startY} C${c1x + dx},${c1y + dy}, ${c2x + dx},${c2y + dy}, ${newX},${newY}`;
                                            //return `M${startX + dx},${startY + dy} C${c1x + dx},${c1y + dy}, ${c2x + dx},${c2y + dy}, ${newX},${newY}`;
                                        }
                                    }

                                    const lineMatch = /M\s*([-.\d]+),\s*([-.\d]+)\s*L\s*([-.\d]+),\s*([-.\d]+)/.exec(pathData);
                                    if (lineMatch) {
                                        const [_, startX, startY, endX, endY] = lineMatch.map(Number);
                                        if (role === "start") {
                                            return `M${newX},${newY} L${endX},${endY}`;
                                        } else {
                                            return `M${startX},${startY} L${newX},${newY}`;
                                        }
                                    }

                                    return pathData;
                                });
                            }
                        });
                })
                .on('end', function (event) {
                    const newX = event.x;
                    const newY = event.y;
                    updatePosition({
                        x: newX,
                        y: newY,
                        target: groupClass as any,
                        role: role
                    }).then(() => {
                        console.log("Updated position for", groupClass, newX, newY);
                    });
                });
        };

        const showTooltip = (event: any, text: string) => {
            tooltip.text(text)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`)
                .classed("visible", true);
        };

        const hideTooltip = () => {
            tooltip.classed("visible", false);
        };

        svg.selectAll('.path-start-draggable')
            .on("mouseover", (event) => showTooltip(event, "Start Point"))
            .on("mouseout", hideTooltip);

        svg.selectAll('.path-end-draggable')
            .on("mouseover", (event) => showTooltip(event, "End Point"))
            .on("mouseout", hideTooltip);

        svg.selectAll('.line-start-draggable')
            .on("mouseover", (event) => showTooltip(event, "Start Point"))
            .on("mouseout", hideTooltip);

        svg.selectAll('.line-end-draggable')
            .on("mouseover", (event) => showTooltip(event, "End Point"))
            .on("mouseout", hideTooltip);

        svg.selectAll<SVGGraphicsElement, unknown>('.red-draggable').call(createDragHandler("red-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.blue-draggable').call(createDragHandler("blue-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.green-draggable').call(createDragHandler("green-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.yellow-draggable').call(createDragHandler("yellow-group"));

        svg.selectAll<SVGGraphicsElement, unknown>('.path-start-draggable').call(createDragHandler("path-group", "start"));
        svg.selectAll<SVGGraphicsElement, unknown>('.path-end-draggable').call(createDragHandler("path-group", "end"));

        svg.selectAll<SVGGraphicsElement, unknown>('.line-start-draggable').call(createDragHandler("line-group", "start"));
        svg.selectAll<SVGGraphicsElement, unknown>('.line-end-draggable').call(createDragHandler("line-group", "end"));

    }, [svgContent]);

    return (<>
        <div
            id="svg-container"
            style={{ width: '100%', height: '512px' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        <div id="tooltip" className="tooltip"></div>
    </>

    );
};

export default InteractiveSVG;