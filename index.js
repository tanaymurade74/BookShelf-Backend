const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
const Product = require("./models/product.model")
const Category = require("./models/category.model")
const Address = require("./models/address.model")
const Order = require("./models/orders.model")

const {initializeDatabase} = require("./db/db.connect")

initializeDatabase();

async function getAllProducts(){
    try{
        const products = await Product.find();
        console.log(products);
        return products;
    }catch(error){
        throw error
    }
}

async function getByProductId(productId){
    try{
        const product = await Product.find({_id: productId})
        console.log(product)
        return product
    }catch(error){
        throw error;
    }
}

async function addProduct(product){
    try{
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save()
        console.log(savedProduct)
        return savedProduct
    }catch(error){
        throw error;
    }
}

async function getAllCategories(){
    try{
        const categories = await Category.find();
        console.log(categories)
        return categories
    }catch(error){
        throw error
    }
}

async function getByCategoryId(id){
    try{
        const category = await Category.find({_id: id})
        console.log(category)
        return category
    }catch(error){
        throw error
    }
}

async function getByCategoryName(name){
    try{
        const products = await Product.find({category: name});
        console.log(products)
        return products
    }catch(error){
        throw error;
    }
}



async function createCategory(category){
    try{
        const newCategory = new Category(category);
        const createdCategory = await newCategory.save();
        return createdCategory
    }catch(error){
        throw error;
    }
}

async function updateByName(name, dataToUpdate){
    try{
        const product = await Product.findOneAndUpdate({name: name}, dataToUpdate, {new: true})
        return product
    }catch (error){
        throw error;
    }
}

async function getInCart(inCart){
    try{
        const products = await Product.find({inCart: inCart})
        return products;
    }catch(error){
        throw error;
    }
}

async function deleteById(id){
    try{
        const product = await Product.findByIdAndDelete(id);
        return product;
    }catch(error){
        throw error;
    }
}

async function deleteAddressById(addressId){
    try{
        const address = await Address.findByIdAndDelete(addressId);
        return address;
    }catch(error){
        throw error;
    }
}

async function getInWishlist(inWishlist){
    try{
        const products = await Product.find({inWishlist: inWishlist})
        return products
    }catch(error){
        throw error;
    }
}

async function getAllAddresses(){
    try{
        const addresses = await Address.find();
        return addresses;
    }catch(error){
        // throw error
        console.log(error)
    }
}

async function addAddress(address){
    try{
        const newAddress = new Address(address);
        console.log(newAddress)
        const updatedAddress = await newAddress.save();
        console.log(updatedAddress)
        return updatedAddress;
    }catch(error){
        // throw error;
        console.log(error);
    }
}

async function getAllOrders(){
    try{
        const orders = await Order.find();
        console.log(orders)
        return orders
    }catch(error){
        throw error;
    }
}

async function addOrder(order){
    try{
        const newOrder = new Order(order);
        const addedOrder = await newOrder.save();
        console.log(addedOrder)
        return addedOrder
    }catch(error){
        throw error;
    }
}

async function updateAddressById(id, dataToUpdate){
    try{
        const updatedAddress = await Address.findByIdAndUpdate({_id: id}, dataToUpdate, {new: true});
        return updatedAddress
    }catch(error){
        console.log(error)
    }
}

async function getByProductName(name){
    try{
        const pattern = name.split("").join(".*")
        const regex = new RegExp(pattern, "i")
        const product = await Product.find({name: {$regex: regex}})
        return product;
    }catch(error){
        console.log(error)
    }
}

app.get("/api/products", async (req, res)=>{
    try{
        const products = await getAllProducts();
        if(!products){
          return   res.status(400).json({Error: "Products not found"})
        }
        return res.status(200).json({products: products})
    }catch{
        return res.status(500).json({Error: "Error occurred while trying to fetch products"})
    }
})


app.get("/api/products/:productId", async (req, res)=>{
    try{
        const product = await getByProductId(req.params.productId)
        if(!product){
            return res.status(400).json({Error: "Product not found"})
        }
        return res.status(200).json({product: product})
    }catch{
        return res.status(500).json({Error: "Error occurred while fetching product by id"})
    }
})

app.post("/api/product", async (req, res)=>{
    try{
        const product = req.body;
        
        const savedProduct = await addProduct(product);
        return res.status(200).json(savedProduct)
    }catch{
        return res.status(500).json({Error: "Error occurred while adding the product"})
    }
})

app.get("/api/categories", async (req, res)=>{
    try{
        const categories = await getAllCategories();
        if(!categories){
            return res.status(400).json({Error: "No Categories not found"})
        }
        return res.status(200).json({Categories: categories})
    }catch{
        return res.status(500).json({Error: "Error while fetching the categories"})
    }
})

app.get("/api/categories/:categoryId", async (req, res)=>{
    try{
        const category = await Category.getByCategoryId(req.params.categoryId)
        if(!category){
            return res.status(400).json({Error: "Category not found"})
        }
        return res.status(200).json(category)
    }catch{
        return res.status(500).json({Error: "Error while fetching the category"})
    }
})

app.get("/api/products/category/:categoryName", async (req, res)=>{
    try{
        const category = req.params.categoryName.toLowerCase();
        const products = await getByCategoryName(category);
        if(!products){
            return res.status(400).json({Error: "Products not found"})
        }
        return res.status(200).json({products: products})
    }catch{
        return res.status(500).json({Error: "Error occurred while fetching products"})
    }
})

app.post("/api/category", async (req, res)=>{
    try{
        const category = req.body;
        const createdCategory = await createCategory(category)
        return res.status(200).json(createCategory)
    }catch{
        return res.status(500).json({Error: "Error while creating the category"})
    }
})

app.post("/api/products/:productName", async (req,res)=>{
    try{
        const product = await updateByName(req.params.productName, req.body);
        if(!product){
            return res.status(404).json({Error: "Product not found"})
        }
        return res.status(200).json({product: product})
    }catch{
        return res.status(500).json({Error: "Error while updating"})
    }
})

app.get("/api/products/cart/:inCart", async (req, res)=>{
    try{
        const products = await getInCart(req.params.inCart);
        if(!products){
            return res.status(404).json({Error: "No products found"})
        }
        return res.status(200).json({products: products})
    }catch{
        return res.status(500).json({Error: "Error while getting the cart items"})
    }
})

app.get("/api/products/wishlist/:inWishlist", async (req, res)=>{
    try{
        const products = await getInWishlist(req.params.inWishlist)
        if(!products){
            return res.status(404).json({Error: "No Products found"})
        }
        return res.status(200).json({products: products})
    }catch{
        return res.status(500).json({Error: "Error while fetching the products"})
    }
})

app.delete("/api/product/:id", async (req, res)=>{
    try{
        const deleted = await deleteById(req.params.id)
        if(!deleted){
            return res.status(404).json({Error: "Product not found"})
        }
        return res.status(200).json({product: deleted})
    }catch{
        return res.status(500).json({Error: "Error while deleting the product"})
    }
})

app.get("/api/user/address" ,async (req, res)=>{
    try{
        const addresses = await getAllAddresses();
        if(!addresses){
            return res.status(404).json({Error: "No addresses found"})
        }
        return res.status(200).json({Addresses: addresses})
    }catch{
        return res.status(500).json({Error: "Error while fetching all addresses"})
    }
})

app.post("/api/user/address", async(req, res)=>{
    try{
        const address = req.body;
        const addedAddress = await addAddress(address)
        return res.status(200).json({Address: addedAddress})
    }catch{
        return res.status(500).json({Error: "Error occurred while adding the address"})
    }
})

app.post("/api/user/address/:addressId" , async (req, res)=>{
    try{
        const updatedAddress = await updateAddressById(req.params.addressId, req.body);
        if(!updatedAddress){
            res.status(404).json({Error: "Address not found"})
        }
        return res.status(200).json({Address: updatedAddress})
    

    }catch{
        return res.status(500).json({Error: "Error while updating the address"})
    }
})

app.delete("/api/user/address/:addressId", async(req, res)=>{
    try{
        const deletedAddress = await deleteAddressById(req.params.addressId)
        if(!deletedAddress){
            return res.status(404).json({Error: "Address not found"})
        }
        return res.status(200).json({Address: deletedAddress})
    }catch{
        return res.status(500).json({Error : "Error while deleting the address"})
    }
})

app.get("/api/user/orders", async (req, res)=>{
    try{
        const orders = await getAllOrders();
        if(!orders){
            return res.status(404).json({Error: "No orders found"})
        }
        return res.status(200).json({orders: orders})
    }catch{
        return res.status(500).json({Error :"Error while trying to fetch orders"})
    }
})

app.post("/api/user/orders", async (req, res)=>{
    try{
        const order = req.body;
        const addedOrder = await addOrder(order);
        console.log(addedOrder)
        return res.status(200).json({order: addedOrder})
    }catch{
        return res.status(500).json({Error: "Error occurred while trying to add the order"})
    }
})

app.get("/api/product/search/:searchTerm", async (req, res)=> {
    try{
        const param = req.params.searchTerm
        const prodName = decodeURIComponent(param).trim().toLowerCase();
        const product = await getByProductName(prodName)
        if(!prodName){
            return res.status(404).json({Error: "Product not found"})
        }
        return res.status(200).json({products: product})
    }catch{
        return res.status(500).json({Error: "Error occurred while trying to search for the product"})
    }
})

const PORT=3001;
app.listen(PORT, () => {
    console.log("Server running on PORT 3001")
})