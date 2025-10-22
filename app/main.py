from flask import Flask, jsonify, render_template, send_from_directory
import json, os, socket
from pathlib import Path

APP_ROOT = Path(__file__).resolve().parent
DATA_PATH = APP_ROOT / "data" / "cv.json"

def load_cv():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    app.config["JSON_AS_ASCII"] = False

    @app.route("/healthz")
    def health():
        return jsonify(status="ok"), 200

    @app.route("/api/cv")
    def api_cv():
        data = load_cv()
        data["host"] = socket.gethostname()
        data["env"] = os.getenv("APP_ENV", "dev")
        return jsonify(data)

    @app.route("/download/cv.json")
    def download_cv_json():
        return send_from_directory((APP_ROOT / "data"), "cv.json", as_attachment=True)

    @app.route("/")
    def index():
        return render_template("index.html", app_env=os.getenv("APP_ENV", "dev"))

    return app

app = create_app()
