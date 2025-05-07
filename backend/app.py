from svg_handler import generate_svg
from flask import Flask, request, jsonify, Response
from flask_cors import CORS 
import flask

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

color = 'red'
positions = {
    'red-group': {'x': 255, 'y': 255},
    'blue-group': {'x': 350, 'y': 255},
    'green-group': {'x': 600, 'y': 255},
    'yellow-group': {'x': 800, 'y': 255}, 
    'path-group': {
        'start': {'x': 400, 'y': 100},
        'end': {'x': 600, 'y': 100}
    },
    'line-group': {
        'start': {'x': 400, 'y': 160},
        'end': {'x': 600, 'y': 160}
    }
}


@app.route('/scene.svg', methods=('GET', 'HEAD'))
def circle_scene():
    radius = int(request.args.get('radius','100'))
    
    if radius < 10:
        radius = 10
    elif radius > 255:
        radius = 255

    svg_data = generate_svg(positions, radius)
    return Response(svg_data, mimetype='image/svg+xml')


@app.route('/update-position', methods=['POST'])
def update_position():
    data = request.get_json()
    target = data.get('target')
    role = data.get('role')

    print(f'target {target} role {role}')

    if target not in positions:
        return jsonify({"status": "error", "message": "Invalid target"}), 400

    positions[target]['x'] = int(data.get('x'))
    positions[target]['y'] = int(data.get('y'))
    if role is not None:
        positions[target][role]['x'] = int(data.get('x'))
        positions[target][role]['y'] = int(data.get('y'))

    print(f"Updated {target} position to x={positions[target]['x']}, y={positions[target]['y']}")

    return jsonify({
        "status": "success",
        "message": f"Position updated for {target}",
        "updated_position": positions[target]
    }), 200

if __name__ == "__main__":
    app.run(debug=True)
