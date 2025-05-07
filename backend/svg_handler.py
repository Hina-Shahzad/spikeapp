# svg_handler.py

def generate_svg(positions, radius):
    red = positions['red-group']
    blue = positions['blue-group']
    green = positions['green-group']
    yellow = positions['yellow-group']
    path = positions['path-group']
    line = positions['line-group']


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

        <!-- Path Example -->
        <path d="M{path['x']},{path['y']} C{path['x']+50},{path['y']+50}, {path['x']+150},{path['y']+50}, {path['x']+200},{path['y']}" fill="transparent" stroke="black" class="path-group" />
        <circle r="5" cx="{path['x']+200}" cy="{path['y']}" fill="black" class="path-group path-draggable" />
        

        <path d="M{line['x']},{line['y']+60} L{line['x']+200},{line['y']+60}" fill="transparent" stroke="blue" class="line-group" />

        <!-- Start and End Handle for Straight Line -->
        <circle r="5" cx="{line['x']}" cy="{line['y']+60}" fill="blue" class="line-group line-start-draggable" />
        <circle r="5" cx="{line['x']+200}" cy="{line['y']+60}" fill="blue" class="line-group line-end-draggable" />

            
    </svg>
    </svg>
    """
    return svg.strip()

