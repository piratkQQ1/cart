
'use strict';


const cart = {
  items: [],

  add(name, price, qty = 1) {
    if (price <= 0) {
      throw new Error('Цена должна быть положительной');
    }

    const existing = this.items.find(item => item.name === name);

    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        name: name,
        price: price,
        qty: qty
      });
    }
  },

  count() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  total() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  clear() {
    this.items = [];
  }
};

// ===== Проверки — не меняйте код ниже =====
function check(title, fn, expected) {
  let actual;
  try {
    actual = fn();
  } catch (e) {
    actual = `ошибка: ${e.message}`;
  }
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${title}`);
  } else {
    console.log(`❌ ${title}`);
    console.log(`     ждали:    ${JSON.stringify(expected)}`);
    console.log(`     получили: ${JSON.stringify(actual)}`);
  }
}

check('пустая корзина: 0 штук', () => {
  cart.clear();
  return cart.count();
}, 0);

check('add добавляет товар', () => {
  cart.clear();
  cart.add('Тетрадь', 50, 2);
  return cart.items;
}, [{ name: 'Тетрадь', price: 50, qty: 2 }]);

check('количество по умолчанию — 1', () => {
  cart.clear();
  cart.add('Ручка', 30);
  return cart.items;
}, [{ name: 'Ручка', price: 30, qty: 1 }]);

check('одинаковый товар не дублируется, а увеличивает количество', () => {
  cart.clear();
  cart.add('Ручка', 30);
  cart.add('Ручка', 30, 2);
  return cart.items;
}, [{ name: 'Ручка', price: 30, qty: 3 }]);

check('count и total', () => {
  cart.clear();
  cart.add('Ручка', 30, 3);
  cart.add('Тетрадь', 50, 2);
  return [cart.count(), cart.total()];
}, [5, 190]);

check('цена 0 — ошибка', () => {
  cart.clear();
  cart.add('Подарок', 0);
}, 'ошибка: Цена должна быть положительной');

check('clear очищает корзину', () => {
  cart.add('Ручка', 30);
  cart.clear();
  return cart.items;
}, []);

check('методы работают через this, а не через cart', () => {
  const otherCart = { items: [{ name: 'X', price: 10, qty: 4 }], total: cart.total };
  return otherCart.total();
}, 40);
