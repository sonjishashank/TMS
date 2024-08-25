// Ensure DOM elements exist before using them
function initialize() {
    const customerForm = document.getElementById('customerForm');
    const customerList = document.getElementById('customerList');

    if (customerForm && customerList) {
        customerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('customerId').value;
            const name = document.getElementById('customerName').value;
            const contact = document.getElementById('customerContact').value;
            const address = document.getElementById('customerAddress').value;

            const data = { name, contact, address };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/customers/${id}` : '/customers';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                fetchCustomers();
                customerForm.reset();
            })
            .catch(error => console.error('Fetch error:', error));
        });

        function fetchCustomers() {
            fetch('http://127.0.0.1:5000/customers')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(customers => {
                    customerList.innerHTML = '';
                    customers.forEach(customer => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${customer.name}</td>
                            <td>${customer.contact}</td>
                            <td>${customer.address}</td>
                            <td>
                                <button onclick="editCustomer(${customer.id})" class="btn btn-sm btn-warning">Edit</button>
                                <button onclick="deleteCustomer(${customer.id})" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        `;
                        customerList.appendChild(row);
                    });
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function editCustomer(id) {
            fetch(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(customer => {
                    document.getElementById('customerId').value = customer.id;
                    document.getElementById('customerName').value = customer.name;
                    document.getElementById('customerContact').value = customer.contact;
                    document.getElementById('customerAddress').value = customer.address;
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function deleteCustomer(id) {
            fetch(`http://127.0.0.1:5000/customers/${id}`, { method: 'DELETE' })
                .then(() => fetchCustomers())
                .catch(error => console.error('Fetch error:', error));
        }

        // Fetch customers when the page loads
        fetchCustomers();
    }

    // Repeat similar structure for orders, payments, workers, and order items

    // Orders management
    const orderForm = document.getElementById('orderForm');
    const orderList = document.getElementById('orderList');

    if (orderForm && orderList) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('orderId').value;
            const customerId = document.getElementById('orderCustomerId').value;
            const orderDate = document.getElementById('orderDate').value;
            const total = document.getElementById('orderTotal').value;

            const data = { customer_id: customerId, order_date: orderDate, total };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/orders/${id}` : '/orders';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                fetchOrders();
                orderForm.reset();
            })
            .catch(error => console.error('Fetch error:', error));
        });

        function fetchOrders() {
            fetch('http://127.0.0.1:5000/orders')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(orders => {
                    orderList.innerHTML = '';
                    orders.forEach(order => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${order.customer_id}</td>
                            <td>${order.order_date}</td>
                            <td>${order.total}</td>
                            <td>
                                <button onclick="editOrder(${order.id})" class="btn btn-sm btn-warning">Edit</button>
                                <button onclick="deleteOrder(${order.id})" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        `;
                        orderList.appendChild(row);
                    });
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function editOrder(id) {
            fetch(`http://127.0.0.1:5000/orders/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(order => {
                    document.getElementById('orderId').value = order.id;
                    document.getElementById('orderCustomerId').value = order.customer_id;
                    document.getElementById('orderDate').value = order.order_date;
                    document.getElementById('orderTotal').value = order.total;
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function deleteOrder(id) {
            fetch(`http://127.0.0.1:5000/orders/${id}`, { method: 'DELETE' })
                .then(() => fetchOrders())
                .catch(error => console.error('Fetch error:', error));
        }

        // Fetch orders when the page loads
        fetchOrders();
    }

    // Payments management
    const paymentForm = document.getElementById('paymentForm');
    const paymentList = document.getElementById('paymentList');

    if (paymentForm && paymentList) {
        paymentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('paymentId').value;
            const orderId = document.getElementById('paymentOrderId').value;
            const paymentDate = document.getElementById('paymentDate').value;
            const amount = document.getElementById('paymentAmount').value;

            const data = { order_id: orderId, payment_date: paymentDate, amount };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/payments/${id}` : '/payments';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                fetchPayments();
                paymentForm.reset();
            })
            .catch(error => console.error('Fetch error:', error));
        });

        function fetchPayments() {
            fetch('http://127.0.0.1:5000/payments')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(payments => {
                    paymentList.innerHTML = '';
                    payments.forEach(payment => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${payment.order_id}</td>
                            <td>${payment.payment_date}</td>
                            <td>${payment.amount}</td>
                            <td>
                                <button onclick="editPayment(${payment.id})" class="btn btn-sm btn-warning">Edit</button>
                                <button onclick="deletePayment(${payment.id})" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        `;
                        paymentList.appendChild(row);
                    });
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function editPayment(id) {
            fetch(`http://127.0.0.1:5000/payments/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(payment => {
                    document.getElementById('paymentId').value = payment.id;
                    document.getElementById('paymentOrderId').value = payment.order_id;
                    document.getElementById('paymentDate').value = payment.payment_date;
                    document.getElementById('paymentAmount').value = payment.amount;
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function deletePayment(id) {
            fetch(`http://127.0.0.1:5000/payments/${id}`, { method: 'DELETE' })
                .then(() => fetchPayments())
                .catch(error => console.error('Fetch error:', error));
        }

        // Fetch payments when the page loads
        fetchPayments();
    }

    // Workers management
    const workerForm = document.getElementById('workerForm');
    const workerList = document.getElementById('workerList');

    if (workerForm && workerList) {
        workerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('workerId').value;
            const name = document.getElementById('workerName').value;
            const contact = document.getElementById('workerContact').value;
            const role = document.getElementById('workerRole').value;

            const data = { name, contact, role };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/workers/${id}` : '/workers';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                fetchWorkers();
                workerForm.reset();
            })
            .catch(error => console.error('Fetch error:', error));
        });

        function fetchWorkers() {
            fetch('http://127.0.0.1:5000/workers')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(workers => {
                    workerList.innerHTML = '';
                    workers.forEach(worker => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${worker.name}</td>
                            <td>${worker.contact}</td>
                            <td>${worker.role}</td>
                            <td>
                                <button onclick="editWorker(${worker.id})" class="btn btn-sm btn-warning">Edit</button>
                                <button onclick="deleteWorker(${worker.id})" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        `;
                        workerList.appendChild(row);
                    });
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function editWorker(id) {
            fetch(`http://127.0.0.1:5000/workers/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(worker => {
                    document.getElementById('workerId').value = worker.id;
                    document.getElementById('workerName').value = worker.name;
                    document.getElementById('workerContact').value = worker.contact;
                    document.getElementById('workerRole').value = worker.role;
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function deleteWorker(id) {
            fetch(`http://127.0.0.1:5000/workers/${id}`, { method: 'DELETE' })
                .then(() => fetchWorkers())
                .catch(error => console.error('Fetch error:', error));
        }

        // Fetch workers when the page loads
        fetchWorkers();
    }

    // Order Items management
    const orderItemForm = document.getElementById('orderItemForm');
    const orderItemList = document.getElementById('orderItemList');

    if (orderItemForm && orderItemList) {
        orderItemForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('orderItemId').value;
            const orderId = document.getElementById('orderItemOrderId').value;
            const itemName = document.getElementById('orderItemName').value;
            const quantity = document.getElementById('orderItemQuantity').value;
            const price = document.getElementById('orderItemPrice').value;

            const data = { order_id: orderId, item_name: itemName, quantity, price };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/order_items/${id}` : '/order_items';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                fetchOrderItems();
                orderItemForm.reset();
            })
            .catch(error => console.error('Fetch error:', error));
        });

        function fetchOrderItems() {
            fetch('http://127.0.0.1:5000/order_items')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(orderItems => {
                    orderItemList.innerHTML = '';
                    orderItems.forEach(orderItem => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${orderItem.order_id}</td>
                            <td>${orderItem.item_name}</td>
                            <td>${orderItem.quantity}</td>
                            <td>${orderItem.price}</td>
                            <td>
                                <button onclick="editOrderItem(${orderItem.id})" class="btn btn-sm btn-warning">Edit</button>
                                <button onclick="deleteOrderItem(${orderItem.id})" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        `;
                        orderItemList.appendChild(row);
                    });
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function editOrderItem(id) {
            fetch(`http://127.0.0.1:5000/order_items/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(orderItem => {
                    document.getElementById('orderItemId').value = orderItem.id;
                    document.getElementById('orderItemOrderId').value = orderItem.order_id;
                    document.getElementById('orderItemName').value = orderItem.item_name;
                    document.getElementById('orderItemQuantity').value = orderItem.quantity;
                    document.getElementById('orderItemPrice').value = orderItem.price;
                })
                .catch(error => console.error('Fetch error:', error));
        }

        function deleteOrderItem(id) {
            fetch(`http://127.0.0.1:5000/order_items/${id}`, { method: 'DELETE' })
                .then(() => fetchOrderItems())
                .catch(error => console.error('Fetch error:', error));
        }

        // Fetch order items when the page loads
        fetchOrderItems();
    }
}

// Initialize the application once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
