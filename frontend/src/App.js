
import React, { useState } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

  const addItem = () => {
    if (newItem.name === '' || newItem.price === '' || newItem.quantity === '') {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const price = parseFloat(newItem.price.replace(',', '.'));
    const quantity = parseInt(newItem.quantity);
    if (isNaN(price) || isNaN(quantity)) {
      alert('Preço e quantidade devem ser números válidos.');
      return;
    }

    setItems([...items, { ...newItem, price, quantity, id: items.length, marked: false }]);
    setNewItem({ name: '', price: '', quantity: '' });
  };

  const toggleItemMarked = (id) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handlePriceChange = (values) => {
    const { formattedValue } = values;
    setNewItem({ ...newItem, price: formattedValue });
  };

  const total = items.reduce((acc, item) => {
    if (!item.marked) {
      const itemTotal = item.price * item.quantity;
      return acc + itemTotal;
    }
    return acc;
  }, 0);

  return (
    <div className="App">
      <div className="notebook">
        <h1>Lista de Compras</h1>
        <div className="item-input">
          <input
            type="text"
            name="name"
            placeholder="Item"
            value={newItem.name}
            onChange={handleInputChange}
          />
          <NumberFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            value={newItem.price}
            onValueChange={handlePriceChange}
            placeholder="Preço"
            allowNegative={false}
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantidade"
            value={newItem.quantity}
            onChange={handleInputChange}
          />
          <button onClick={addItem}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className={item.marked ? 'marked' : ''}>
              <span>{item.name}</span>
              <span>{item.price.toFixed(2).replace('.', ',')} x {item.quantity}</span>
              <div className="buttons">
                <button onClick={() => toggleItemMarked(item.id)}>
                  <i className={item.marked ? 'fas fa-check' : 'fas fa-times'}></i>
                </button>
                <button onClick={() => removeItem(item.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2>Total: R${total.toFixed(2).replace('.', ',')}</h2>
        <footer>Projeto de Lista de Compras</footer>
      </div>
    </div>
  );
}

export default App;
