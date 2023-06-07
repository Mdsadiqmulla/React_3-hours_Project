import React, { useState, useEffect } from 'react';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [price, setPrice] = useState('');
  const [dish, setDish] = useState('');
  const [table, setTable] = useState('');

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleAddToBill = () => {
    const order = {
      orderId,
      price,
      dish,
      table
    };

    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);

    // Store orders in local storage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Reset input fields
    setOrderId('');
    setPrice('');
    setDish('');
    setTable('');
  };

  const handleDeleteOrder = (orderIndex) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(orderIndex, 1);
    setOrders(updatedOrders);

    // Store updated orders in local storage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <div>
        <label>Unique Order ID:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <label>Choose Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Dish:</label>
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        />
      </div>
      <div>
        <label>Choose Table:</label>
        <input
          type="text"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>
      <button onClick={handleAddToBill}>Add to Bill</button>

      <div>
        <h1>Orders</h1>
        {Array.from({ length: 3 }, (_, index) => {
          const tableNumber = index + 1;
          return (
            <div key={tableNumber}>
              <h2>Table {tableNumber}</h2>
              {orders.map((order, orderIndex) => {
                if (order.table === tableNumber.toString()) {
                  return (
                    <div key={orderIndex}>
                      <h3>Table {order.table}</h3>
                      <p>Order ID: {order.orderId}</p>
                      <p>Price: {order.price}</p>
                      <p>Dish: {order.dish}</p>
                      <button onClick={() => handleDeleteOrder(orderIndex)}>Delete</button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
