kfrom flask import Flask, render_template, send_from_directory, json
import os

app = Flask(__name__, static_folder="static", template_folder="templates")

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "cv.json")

def load_cv():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/")
def home():
    cv = load_cv()
    return render_template("index.html", cv=cv)

@app.route("/experience")
def experience():
    cv = load_cv()
    return render_template("experience.html", cv=cv)

@app.route("/projects")
def projects():
    cv = load_cv()
    return render_template("projects.html", cv=cv)

@app.route("/education")
def education():
    cv = load_cv()
    return render_template("education.html", cv=cv)

@app.route("/healthz")
def healthz():
    return "OK", 200

# static is already handled; this is optional:
@app.route("/favicon.ico")
def favicon():
    return send_from_directory(app.static_folder, "favicon.ico", mimetype="image/x-icon")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)

