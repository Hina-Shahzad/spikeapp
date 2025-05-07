export type Position = {
    x?: number;
    y?: number;
    matrix?: string[];
    target: 'red-group' | 'blue-group' | 'green-group' | 'yellow-group' | 'path-group' |'line-group';
    role?: 'start' | 'end';
};
