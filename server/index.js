import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./watchshop.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT,
      description TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        // Check if the products table is empty
        db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
          if (err) {
            console.error('Error checking products count:', err);
          } else if (row.count === 0) {
            // If the table is empty, insert dummy data
            const dummyProducts = [
              {
                name: "Classic Chronograph",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Elegant chronograph watch with leather strap"
              },
              {
                name: "Diver's Watch",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Water-resistant watch perfect for diving enthusiasts"
              },
              {
                name: "Smart Watch Pro",
                price: 349.99,
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Advanced smartwatch with health tracking features"
              },
              {
                name: "Luxury Gold Watch",
                price: 999.99,
                image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Exquisite gold-plated watch for special occasions"
              },
              {
                name: "Minimalist Watch",
                price: 149.99,
                image: "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Sleek and simple design for everyday wear"
              }
            ];

            const insertProduct = db.prepare("INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)");
            dummyProducts.forEach((product) => {
              insertProduct.run(product.name, product.price, product.image, product.description);
            });
            insertProduct.finalize();

            console.log('Dummy products inserted successfully');
          }
        });
      }
    });
  }
});

// API routes
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, image, description } = req.body;
  db.run(
    'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)',
    [name, price, image, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});