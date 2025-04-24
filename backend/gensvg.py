from flask import Flask, request
import flask

app = Flask(__name__)

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
            >
        <circle r="{radius}" cx="255" cy="255" fill="{color}"/>
        <circle r="5" cx="255" cy="255" fill="black" id="handleid" class="handle"/>
</svg>
        \n""",        
        mimetype='image/svg+xml'
    )

if __name__ == "__main__":
    app.run(debug=True)