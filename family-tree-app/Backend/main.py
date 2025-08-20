from fastapi import FastAPI, HTTPException, Body
import db

app = FastAPI()

@app.get("/hello")
def hello():
    return {"message": "Hello from Python!"}

@app.post("/signup")
def signup(email: str = Body(...), password: str = Body(...)):
    connection = db.getConnection("user.db")
    try:
        db.createTable(connection)  # Ensure table exists
        returnDesc = db.insertUser(connection, email, password)
        return {"message": returnDesc}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        connection.close()

@app.post("/login")
def login(email: str, password: str):
    connection = db.getConnection("user.db")
    try:
        rows = db.fetchUsers(connection, f"email = '{email}'")
        if not rows:
            raise HTTPException(status_code=404, detail="User not found")
        stored_email, stored_password = rows[0]
        if stored_password != password:
            raise HTTPException(status_code=401, detail="Invalid password")
        return {"message": "Login successful!"}
    finally:
        connection.close()

@app.get("/users")
def get_users():
    connection = db.getConnection("user.db")
    try:
        rows = db.fetchUsers(connection)
        return {"users": rows}
    finally:
        connection.close()