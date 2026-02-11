const express = require('express');
const multer = require('multer');
const db = require('../connection');   // import connection
const router = express.Router();

const upload = multer({ dest: 'upload/' });

router.post('/productsumit', upload.single('image'), (req, res) => {

  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.file.filename;
   console.log(name);
  db.query(
    'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)',
    [name, price, description, image],
    (err, result) => {
      if (err) return res.send('Error saving product');
      res.send('Product saved to database!');
    }
  );
});

router.get('/products', (req, res) => {

  db.query('SELECT * FROM products', (err, results) => {

    if (err) return res.send('Database error');
    
    res.render('displayp', { products: results });
  // simple output (array of objects)

  });

});
router.get('/', (req, res) => {

  const images = [
    '/image/a.png',
    '/image/f.jfif',
    '/image/g.jfif',
    '/image/ff.jfif',
    '/image/b.jfif'
  ];

  db.query('SELECT * FROM products ', (err, results) => {
    if (err) return res.send('Database error');

    res.render('index', { images: images, products: results }); // send images + featured products
  });

});


router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId],
    (err, result) => {
      if (err) return res.send('Database error');
      res.render('productDetail', { product: result[0] });
    }
  );
});

router.get('/cart', (req, res) => {
  const userId = 1;

  db.query(
    `SELECT c.id, p.name, p.price, c.quantity
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      res.render('cart', { cartItems: results });
    }
  );
});

router.post('/add-to-cart', (req, res) => {
  const userId = 1; // temporary user
  const { productId, quantity } = req.body;

  // Insert or update quantity if already exists
  db.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
    [userId, productId, quantity, quantity],
    () => {
      // Fetch cart items after insert/update
      db.query(
        `SELECT c.id, p.name, p.price, c.quantity
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?`,
        [userId],
        (err, results) => {
          // Simply render cart
          res.render('cart', { cartItems: results });
        }
      );
    }
  );
});

// Checkout
router.post('/checkout', upload.single('screenshot'), (req,res)=>{

  const userId = 1;

  const {
    customerName,
    contactNumber,
    transactionId
  } = req.body;

  const screenshot = req.file ? req.file.filename : null;

  db.query(
    `INSERT INTO orders
    (user_id,customer_name,contact_number,transaction_id,screenshot,status,payment_status)
    VALUES (?,?,?,?,?,'pending','pending')`,
    [userId,customerName,contactNumber,transactionId,screenshot],
    ()=>{
       res.render('thank', { customerName, userId});
    }
  );

});
router.post('/subscribe', (req, res) => {
    const { email, shilajit_type } = req.body;

    // Insert into database
    db.query(
        "INSERT INTO newsletter (email, shilajit_type) VALUES (?, ?)",
        [email, shilajit_type]
    );

    res.redirect('/');
});


module.exports = router;
