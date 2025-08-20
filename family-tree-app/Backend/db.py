import sqlite3

# Step 1: Setup Database
def getConnection(dbName: str):
    try:
        return sqlite3.connect(dbName)
    except Exception as e:
        print(f"Error: {e}")

# Step 2: Create Table
def createTable(connection):
    query = """
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    """
    try:
        with connection:
            connection.execute(query)
        print("Table created successfully.")
    except Exception as e:
        print(e)

# Step 3: Insert User
def insertUser(connection, email: str, password: str):
    query = "INSERT INTO users (email, password) VALUES (?, ?)"
    try:
        with connection:
            connection.execute(query, (email, password))
        print(f"{email} ({password}) inserted successfully.")
    except sqlite3.IntegrityError:
        print("User already exists.")
    except Exception as e:
        print(f"Error inserting user: {e}")

# Step 4: Query Users
def fetchUsers(connection, condition: str = None) -> list[tuple]:
    query = "SELECT * FROM users"
    if condition:
        query += f" WHERE {condition}"

    try:
        with connection:
            rows = connection.execute(query).fetchall()
        print(rows)
        return rows
    except Exception as e:
        print(f"Error fetching users: {e}")
        return []

# Step 5: Delete User
def deleteUser_Email(connection, email: str):
    query = "DELETE FROM users WHERE email = ?"
    try:
        with connection:
            connection.execute(query, (email))
        print(f"User {email} deleted successfully.")
    except Exception as e:
        print(f"Error deleting user: {e}")

# Step 6: Update User
def updateUser(connection, email: str, newEmail: str, newPassword: str):
    query = "UPDATE users SET email = ?, password = ? WHERE email = ?"
    try:
        with connection:
            connection.execute(query, (newEmail, newPassword, email))
        print(f"User '{email}' updated successfully. {newEmail} ({newPassword})")
    except Exception as e:
        print(f"Error updating user: {e}")  



def main():
    connection = getConnection("user.db")

    try:
        createTable(connection)

        # insertUser(connection, "b", "b")
        # deleteUser_Email(connection, "b")
        # updateUser(connection, "a", "test@gmail.com", "test")

        # fetchUsers(connection) # email = 'b'
        
    finally:
        connection.close()

if (__name__ == "__main__"):
    main()