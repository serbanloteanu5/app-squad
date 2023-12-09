/*
   Filename: ComplexJavascriptCode.js

   Description: This code showcases a complex and elaborate JavaScript program that implements a fictional e-commerce platform.
   It includes various functionalities like user registration and authentication, product listing and search, shopping cart management,
   and order processing. The code is structured using modern JavaScript practices like modules and classes for improved readability,
   scalability, and reusability.
*/

// User Module
const UserModule = (() => {
  // Private variables and functions
  let users = [];

  class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }

    register() {
      users.push(this);
      console.log(`User ${this.username} registered successfully!`);
    }

    static login(username, password) {
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        console.log(`User ${username} logged in successfully!`);
      } else {
        console.log(`Invalid credentials. Please try again.`);
      }
    }
  }

  return {
    createUser: (username, password) => new User(username, password),
    login: User.login,
  };
})();

// Product Module
const ProductModule = (() => {
  // Private variables
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    // ... Additional product data
  ];

  // Public functions
  const getProductById = (productId) => products.find((product) => product.id === productId);
  const searchProductsByName = (query) => products.filter((product) => product.name.includes(query));

  return { getProductById, searchProductsByName };
})();

// Shopping Cart Module
const ShoppingCartModule = (() => {
  // Private variables
  let cart = [];

  // Public functions
  const addToCart = (productId, quantity) => {
    const product = ProductModule.getProductById(productId);
    if (product) {
      const item = { product, quantity };
      cart.push(item);
      console.log(`Added ${quantity}x ${product.name} to the cart.`);
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      const removedItem = cart.splice(index, 1)[0];
      console.log(`Removed ${removedItem.product.name} from the cart.`);
    } else {
      console.log(`Product with ID ${productId} not found in the cart.`);
    }
  };

  const viewCart = () => {
    console.log('Shopping Cart:');
    for (const item of cart) {
      console.log(`${item.product.name} - Quantity: ${item.quantity}`);
    }
  };

  return { addToCart, removeFromCart, viewCart };
})();

// Order Module
const OrderModule = (() => {
  // Private variables
  let orderIdCounter = 1;
  const orders = [];

  class Order {
    constructor(cart, paymentMethod) {
      this.orderId = orderIdCounter++;
      this.cart = cart;
      this.paymentMethod = paymentMethod;
      this.orderDate = new Date();
    }

    placeOrder() {
      orders.push(this);
      console.log(`Order ${this.orderId} placed successfully!`);
    }
  }

  // Public functions
  const createOrder = (cart, paymentMethod) => new Order(cart, paymentMethod);

  return { createOrder };
})();

// Usage
const user1 = UserModule.createUser('JohnDoe', 'password');
user1.register();

UserModule.login('JohnDoe', 'password');

ShoppingCartModule.addToCart(2, 3);
ShoppingCartModule.addToCart(1, 1);
ShoppingCartModule.viewCart();

ShoppingCartModule.removeFromCart(1);
ShoppingCartModule.viewCart();

const cart = [
  { product: ProductModule.getProductById(3), quantity: 2 },
  // ... Additional cart items
];

const order = OrderModule.createOrder(cart, 'Credit Card');
order.placeOrder();

console.log(ProductModule.searchProductsByName('2'));