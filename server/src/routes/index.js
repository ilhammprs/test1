const express = require('express');
const router = express.Router();

const { 
    addUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/user')

const { 
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    getProdmin
} = require('../controllers/product')

const { 
    addTransaction,
    getTransactions,
    getTransadmin,
} = require('../controllers/transaction')

const { 
    addCart,
    getCarts,
    deleteCart,
} = require('../controllers/cart')

const { register, login, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

router.post('/user', addUser);
router.get('/users', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/product', auth, uploadFile('image'), addProduct);
router.get('/products', auth, getProducts);
router.get('/prodmin', auth, getProdmin);
router.get('/product/:id', auth, getProduct);
router.patch('/product/:id', auth, uploadFile('image'), updateProduct);
router.delete('/product/:id', auth, deleteProduct);

router.post('/transaction', auth, addTransaction);
router.get('/transactions', auth, getTransactions);
router.get('/transadmin', auth, getTransadmin);

router.post('/cart', auth, addCart);
router.get('/carts', auth, getCarts);
router.delete('/cart/:id', auth, deleteCart);

router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;