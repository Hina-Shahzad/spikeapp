import { useState, useEffect } from "react";
import * as d3 from "d3";
import { fetchSceneSVG, updatePosition } from "./services/apiService";

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

                            console.log("Processing element type:", elementType); 

                            if (elementType === "circle") {
                                element.attr("cx", newX).attr("cy", newY);
                            } else if (elementType === "rect") {
                                element.attr("x", newX - 50)
                                    .attr("y", newY - 50);
                            } else if (elementType === "ellipse") {
                                element.attr("cx", newX).attr("cy", newY);
                            }
                            else if (elementType === "path") {
                                const pathSelection = svg.selectAll<SVGPathElement, unknown>(`.${groupClass}`);
                                console.log("pathSelection", pathSelection);

                                svg.selectAll<SVGPathElement, unknown>(`.${groupClass}`)
                                    .attr("d", (d, i, nodes) => {
                                        const path = d3.select(nodes[i]);
                                        const pathData = path.attr("d");
                                        const pathMatch = /M\s*([-\d.]+),\s*([-\d.]+)\s*C\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)/.exec(pathData);

                                        if (pathMatch) {
                                            const startX = parseFloat(pathMatch[1]);   
                                            const startY = parseFloat(pathMatch[2]);   
                                            const controlX1 = parseFloat(pathMatch[3]);
                                            const controlY1 = parseFloat(pathMatch[4]);
                                            const controlX2 = parseFloat(pathMatch[5]);
                                            const controlY2 = parseFloat(pathMatch[6]);
                                            const endX = parseFloat(pathMatch[7]);     
                                            const endY = parseFloat(pathMatch[8]);     

                                            
                                            const dx = newX - endX; 
                                            const dy = newY - endY; 

                                            
                                            const updatedPath = `M${startX + dx},${startY + dy} C${controlX1 + dx},${controlY1 + dy}, ${controlX2 + dx},${controlY2 + dy}, ${newX},${newY}`;

                                            
                                            return updatedPath;
                                        }

                                        const lineMatch = /M\s*([-\d.]+),\s*([-\d.]+)\s*L\s*([-\d.]+),\s*([-\d.]+)/.exec(pathData);
                                        if (lineMatch) {
                                            console.log("Matched straight line path");
                                            const startX = parseFloat(lineMatch[1]);
                                            const startY = parseFloat(lineMatch[2]);
                                            const endX = parseFloat(lineMatch[3]);
                                            const endY = parseFloat(lineMatch[4]);

                                            const dx = newX - endX;
                                            const dy = newY - endY;
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

                    updatePosition({ x: newX, y: newY, target: groupClass as "red-group" | "blue-group" | "green-group" | "yellow-group" | "path-group" | "line-group" })
                        .then(() => {
                            console.log("Updated position for", groupClass, newX, newY);
                        });
                });
        };




        svg.selectAll<SVGGraphicsElement, unknown>('.red-draggable').call(createDragHandler("red-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.blue-draggable').call(createDragHandler("blue-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.green-draggable').call(createDragHandler("green-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.yellow-draggable').call(createDragHandler("yellow-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.path-draggable').call(createDragHandler("path-group"));
        svg.selectAll<SVGGraphicsElement, unknown>('.line-start-draggable').call(createDragHandler("line-group", "start"));
        svg.selectAll<SVGGraphicsElement, unknown>('.line-end-draggable').call(createDragHandler("line-group", "end"));


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
