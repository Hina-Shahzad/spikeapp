from flask import Flask, request, jsonify
from flask_cors import CORS 
import flask

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

color = 'red'

@app.route('/scene.svg', methods=('GET', 'HEAD'))
def circle_scene():
    radius = int(request.args.get('radius','100'))
    if radius < 10:
        radius = 10
    elif radius > 255:
        radius = 255
    return flask.Response(
        f"""
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="512"
                height="512"
            >
        <circle r="{radius}" cx="255" cy="255" fill="{color}"/>
        <circle r="5" cx="255" cy="255" fill="black" id="handleid" class="handle"/>
</svg>
        \n""",        
        mimetype='image/svg+xml'
    )

@app.route('/update-position', methods=['POST'])
def update_position():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    
    print(f"New position received: x={x}, y={y}")

    return jsonify({"status": "success", "message": "Position updated"}), 200


if __name__ == "__main__":
    app.run(debug=True)