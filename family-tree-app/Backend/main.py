from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

import db


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
def login(email: str = Body(...), password: str = Body(...)):
    connection = db.getConnection("user.db")
    try:
        returnDesc = db.fetchUsers(connection, password, f"email = '{email}'")
        return {"message": returnDesc}
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