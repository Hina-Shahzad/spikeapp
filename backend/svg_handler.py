# svg_handler.py

def generate_svg(positions, radius):
    red = positions['red-group']
    blue = positions['blue-group']
    green = positions['green-group']
    yellow = positions['yellow-group']
    path_start = positions['path-group']['start']
    path_end = positions['path-group']['end']
    line_start = positions['line-group']['start']
    line_end = positions['line-group']['end']

    #path = positions['path-group']
    #line = positions['line-group']


    svg = f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 512"
        width="100%"
        height="100%"
    >
        <!-- Red Circle -->
        <circle r="{radius}" cx="{red['x']}" cy="{red['y']}" fill="red" class="red-group" />
        <circle r="5" cx="{red['x']}" cy="{red['y']}" fill="black" class="red-group red-draggable" />

        <!-- Blue Circle -->
        <circle r="80" cx="{blue['x']}" cy="{blue['y']}" fill="blue" class="blue-group" />
        <circle r="5" cx="{blue['x']}" cy="{blue['y']}" fill="black" class="blue-group blue-draggable" />
        
        <!-- Green Rectangle -->
        <rect width="100" height="100" x="{green['x'] - 50}" y="{green['y'] - 50}" fill="green" class="green-group"/>
        <circle r="8" cx="{green['x']}" cy="{green['y']}" fill="black" class="green-group green-draggable"/>

        <!-- Yellow Ellipse -->
        <ellipse rx="60" ry="30" cx="{yellow['x']}" cy="{yellow['y']}" fill="gold" class="yellow-group"/>
        <circle r="8" cx="{yellow['x']}" cy="{yellow['y']}" fill="black" class="yellow-group yellow-draggable"/>

        <!-- Curved Path -->
        <path
        d="M{path_start['x']},{path_start['y']} C{path_start['x']+50},{path_start['y']+50}, {path_end['x']-50},{path_end['y']+50}, {path_end['x']},{path_end['y']}"
        fill="transparent"
        stroke="black"
        class="path-group"
        />
        <circle 
            r="5" 
            cx="{path_start['x']}" 
            cy="{path_start['y']}" 
            fill="red" 
            class="path-group path-start-draggable" 
        />
        <circle 
            r="5" 
            cx="{path_end['x']}" 
            cy="{path_end['y']}" 
            fill="red" 
            class="path-group path-end-draggable" 
        />
        
        

        <path 
        d="M{line_start['x']},{line_start['y']} L{line_end['x']},{line_end['y']}" 
        fill="transparent" 
        stroke="blue" 
        class="line-group" 
        />

        <!-- Start and End Handles for Straight Line -->
        <circle 
            r="5" 
            cx="{line_start['x']}" 
            cy="{line_start['y']}" 
            fill="red" 
            class="line-group line-start-draggable" 
        />

        <circle 
            r="5" 
            cx="{line_end['x']}" 
            cy="{line_end['y']}" 
            fill="green" 
            class="line-group line-end-draggable" 
        />
    </svg>
    """
    return svg.strip()

