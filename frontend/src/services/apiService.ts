import { Position } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const fetchSceneSVG = async (radius: number): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/scene.svg?radius=${radius}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
    }
    return await response.text();
};

export const updatePosition = async (position: Position) => {
    const response = await fetch(`${API_BASE_URL}/update-position`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add a basic auth token if needed here
        },
        body: JSON.stringify(position),
    });

    if (!response.ok) {
        throw new Error(`Failed to update position: ${response.statusText}`);
    }

    return await response.json();
};
