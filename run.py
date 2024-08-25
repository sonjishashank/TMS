from app import app, db
from app.models import Customers, Orders, Payments, Workers

# Uncomment the line below if you need to create the tables in your database.
# db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
