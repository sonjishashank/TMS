from flask import request, jsonify
from app import app, db
from flask_cors import CORS
from flask import Flask
from app.models import Customers, Orders, Payments, Workers, OrderItems

app = Flask(__name__)
CORS(app)

# Customers Endpoints
@app.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    new_customer = Customers(name=data['name'], contact=data['contact'], address=data['address'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({"message": "Customer created!"})

@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customers.query.all()
    return jsonify([{
        "id": customer.id,
        "name": customer.name,
        "contact": customer.contact,
        "address": customer.address
    } for customer in customers])

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.get_json()
    customer = Customers.query.get(id)
    if not customer:
        return jsonify({"message": "Customer not found"}), 404
    customer.name = data['name']
    customer.contact = data['contact']
    customer.address = data['address']
    db.session.commit()
    return jsonify({"message": "Customer updated!"})

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customers.query.get(id)
    if not customer:
        return jsonify({"message": "Customer not found"}), 404
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message": "Customer deleted!"})

# Orders Endpoints
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Orders(customer_id=data['customer_id'], order_date=data['order_date'], total=data['total'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created!"})

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Orders.query.all()
    return jsonify([{
        "id": order.id,
        "customer_id": order.customer_id,
        "order_date": order.order_date,
        "total": order.total
    } for order in orders])

@app.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    data = request.get_json()
    order = Orders.query.get(id)
    if not order:
        return jsonify({"message": "Order not found"}), 404
    order.customer_id = data['customer_id']
    order.order_date = data['order_date']
    order.total = data['total']
    db.session.commit()
    return jsonify({"message": "Order updated!"})

@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Orders.query.get(id)
    if not order:
        return jsonify({"message": "Order not found"}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted!"})

# Payments Endpoints
@app.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    new_payment = Payments(order_id=data['order_id'], payment_date=data['payment_date'], amount=data['amount'])
    db.session.add(new_payment)
    db.session.commit()
    return jsonify({"message": "Payment created!"})

@app.route('/payments', methods=['GET'])
def get_payments():
    payments = Payments.query.all()
    return jsonify([{
        "id": payment.id,
        "order_id": payment.order_id,
        "payment_date": payment.payment_date,
        "amount": payment.amount
    } for payment in payments])

@app.route('/payments/<int:id>', methods=['PUT'])
def update_payment(id):
    data = request.get_json()
    payment = Payments.query.get(id)
    if not payment:
        return jsonify({"message": "Payment not found"}), 404
    payment.order_id = data['order_id']
    payment.payment_date = data['payment_date']
    payment.amount = data['amount']
    db.session.commit()
    return jsonify({"message": "Payment updated!"})

@app.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    payment = Payments.query.get(id)
    if not payment:
        return jsonify({"message": "Payment not found"}), 404
    db.session.delete(payment)
    db.session.commit()
    return jsonify({"message": "Payment deleted!"})

# Workers Endpoints
@app.route('/workers', methods=['POST'])
def create_worker():
    data = request.get_json()
    new_worker = Workers(name=data['name'], contact=data['contact'], role=data['role'])
    db.session.add(new_worker)
    db.session.commit()
    return jsonify({"message": "Worker created!"})

@app.route('/workers', methods=['GET'])
def get_workers():
    workers = Workers.query.all()
    return jsonify([{
        "id": worker.id,
        "name": worker.name,
        "contact": worker.contact,
        "role": worker.role
    } for worker in workers])

@app.route('/workers/<int:id>', methods=['PUT'])
def update_worker(id):
    data = request.get_json()
    worker = Workers.query.get(id)
    if not worker:
        return jsonify({"message": "Worker not found"}), 404
    worker.name = data['name']
    worker.contact = data['contact']
    worker.role = data['role']
    db.session.commit()
    return jsonify({"message": "Worker updated!"})

@app.route('/workers/<int:id>', methods=['DELETE'])
def delete_worker(id):
    worker = Workers.query.get(id)
    if not worker:
        return jsonify({"message": "Worker not found"}), 404
    db.session.delete(worker)
    db.session.commit()
    return jsonify({"message": "Worker deleted!"})

# Order Items Endpoints
@app.route('/order_items', methods=['POST'])
def create_order_item():
    data = request.get_json()
    new_order_item = OrderItems(order_id=data['order_id'], item_name=data['item_name'], quantity=data['quantity'], price=data['price'])
    db.session.add(new_order_item)
    db.session.commit()
    return jsonify({"message": "Order item created!"})

@app.route('/order_items', methods=['GET'])
def get_order_items():
    order_items = OrderItems.query.all()
    return jsonify([{
        "id": order_item.id,
        "order_id": order_item.order_id,
        "item_name": order_item.item_name,
        "quantity": order_item.quantity,
        "price": order_item.price
    } for order_item in order_items])

@app.route('/order_items/<int:id>', methods=['PUT'])
def update_order_item(id):
    data = request.get_json()
    order_item = OrderItems.query.get(id)
    if not order_item:
        return jsonify({"message": "Order item not found"}), 404
    order_item.order_id = data['order_id']
    order_item.item_name = data['item_name']
    order_item.quantity = data['quantity']
    order_item.price = data['price']
    db.session.commit()
    return jsonify({"message": "Order item updated!"})

@app.route('/order_items/<int:id>', methods=['DELETE'])
def delete_order_item(id):
    order_item = OrderItems.query.get(id)
    if not order_item:
        return jsonify({"message": "Order item not found"}), 404
    db.session.delete(order_item)
    db.session.commit()
    return jsonify({"message": "Order item deleted!"})

