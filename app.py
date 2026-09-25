from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Afficher le site HTML
@app.route("/")
def home():
    return send_from_directory(".", "index.html")


# API Instagram de test
@app.route("/api/instagram")
def instagram():
    publications = [
        {
            "id": 1,
            "caption": "Bienvenue à La Cantine du Rond-Point !",
            "type": "Restaurant"
        },
        {
            "id": 2,
            "caption": "Découvrez notre sélection gourmande.",
            "type": "Food"
        },
        {
            "id": 3,
            "caption": "Une pause gourmande avant le spectacle !",
            "type": "Culture"
        }
    ]

    return jsonify(publications)


# API Newsletter de test
@app.route("/api/newsletter", methods=["POST"])
def newsletter():

    data = request.get_json(silent=True) or {}

    email = data.get("email", "").strip()

    if not email or "@" not in email:
        return jsonify({
            "error": "Veuillez entrer une adresse e-mail valide."
        }), 400

    print(f"Inscription newsletter (démo) : {email}")

    return jsonify({
        "message": "Merci ! Votre inscription a bien été prise en compte."
    }), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    