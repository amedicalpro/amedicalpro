
from flask import render_template, request, redirect, url_for, session
from app import app

USERS = {
    "admin": {"password": "admin", "rol": "administrador"},
    "secretaria1": {"password": "1234", "rol": "secretaria"},
    "drsanchez": {"password": "1234", "rol": "medico"},
    "drcavalla": {"password": "1234", "rol": "medico"},
}

@app.route("/", methods=["GET","POST"])
def login():
    error=None
    if request.method=="POST":
        u=request.form["username"]
        p=request.form["password"]
        if u in USERS and USERS[u]["password"]==p:
            session["user"]=u
            session["rol"]=USERS[u]["rol"]
            return redirect(url_for("panel"))
        error="Credenciales inválidas"
    return render_template("login.html", error=error)

@app.route("/panel")
def panel():
    if 'user' not in session:
        return redirect(url_for('login'))
    rol=session['rol']
    return render_template(f"{rol}_panel.html", usuario=session['user'])

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('login'))
