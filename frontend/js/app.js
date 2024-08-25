const apiUrl = "http://127.0.0.1:5000";

// Customers
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const contact = document.getElementById('customerContact').value;
    const address = document.getElementById('customerAddress').value;

    fetch(`${apiUrl}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, address }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

function fetchCustomers() {
    fetch(`${apiUrl}/customers`)
    .then(response => response.json())
    .then(data => {
        const customerList = document.getElementById('customerList');
        customerList.innerHTML = '';
        data.forEach(customer => {
            const li = document.createElement('li');
            li.textContent = `${customer.name} - ${customer.contact} - ${customer.address}`;
            customerList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Orders
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const customer_id = document.getElementById('orderCustomerId').value;
    const order_date = document.getElementById('orderDate').value;
    const total = document.getElementById('orderTotal').value;

    fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer_id, order_date, total }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

function fetchOrders() {
    fetch(`${apiUrl}/orders`)
    .then(response => response.json())
    .then(data => {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';
        data.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order ID: ${order.id} - Customer ID: ${order.customer_id} - Date: ${order.order_date} - Total: ${order.total}`;
            orderList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Payments
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const order_id = document.getElementById('paymentOrderId').value;
    const payment_date = document.getElementById('paymentDate').value;
    const amount = document.getElementById('paymentAmount').value;

    fetch(`${apiUrl}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id, payment_date, amount }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

function fetchPayments() {
    fetch(`${apiUrl}/payments`)
    .then(response => response.json())
    .then(data => {
        const paymentList = document.getElementById('paymentList');
        paymentList.innerHTML = '';
        data.forEach(payment => {
            const li = document.createElement('li');
            li.textContent = `Payment ID: ${payment.id} - Order ID: ${payment.order_id} - Date: ${payment.payment_date} - Amount: ${payment.amount}`;
            paymentList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Workers
document.getElementById('workerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('workerName').value;
    const contact = document.getElementById('workerContact').value;
    const role = document.getElementById('workerRole').value;

    fetch(`${apiUrl}/workers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, role }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

function fetchWorkers() {
    fetch(`${apiUrl}/workers`)
    .then(response => response.json())
    .then(data => {
        const workerList = document.getElementById('workerList');
        workerList.innerHTML = '';
        data.forEach(worker => {
            const li = document.createElement('li');
            li.textContent = `${worker.name} - ${worker.contact} - ${worker.role}`;
            workerList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Order Items
document.getElementById('orderItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const order_id = document.getElementById('orderItemOrderId').value;
    const item_name = document.getElementById('orderItemName').value;
    const quantity = document.getElementById('orderItemQuantity').value;
    const price = document.getElementById('orderItemPrice').value;

    fetch(`${apiUrl}/order_items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id, item_name, quantity, price }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

function fetchOrderItems() {
    fetch(`${apiUrl}/order_items`)
    .then(response => response.json())
    .then(data => {
        const orderItemList = document.getElementById('orderItemList');
        orderItemList.innerHTML = '';
        data.forEach(order_item => {
            const li = document.createElement('li');
            li.textContent = `Order Item ID: ${order_item.id} - Order ID: ${order_item.order_id} - Item: ${order_item.item_name} - Quantity: ${order_item.quantity} - Price: ${order_item.price}`;
            orderItemList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}
