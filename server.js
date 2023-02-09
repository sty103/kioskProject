const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const Product = mongoose.model(
    'products',
    new mongoose.Schema ({
        name: String,
        description: String,
        image: String,
        price: Number,
        calorie: Number,
        category: String,
    })
);

app.get('/api/products/seed',async (req, res) => {
    const products = await Product.insertMany(data.products);
    res.send({ products });
});

app.get('/api/products', async (req, res) => {
    const { category } = req.query;
    const products = await Product.find(category ? { category } : {});
    res.send (products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.get('/api/categories', (req, res) => {
    res.send(data.categories);
});

const Order = mongoose.model('Order', new mongoose.Schema({
    number: { type: Number, default: 0 },
    orderType: String,
    paymentType: String,
    isPaid: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
    isProgress: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    itemsPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    orderItems: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
},
{
    timestamps: true,
}
));
app.post('/api/orders', async (req, res) => {
    const lastOrder = await Order.find().sort({ number: -1}).limit(1);
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
    if (
        !req.body.orderType ||
        !req.body.paymentType ||
        !req.body.orderItems ||
        !req.body.orderItems.length === 0
    ) {
        return res.send({ message: 'Data is required.' });
    }
    const order = await Order({ ...req.body, number: lastNumber +1 }).save();
    res.send(order);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});