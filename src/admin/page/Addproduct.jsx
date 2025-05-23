import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../Components/layout/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../../Context/ProductContext";
import { SketchPicker } from "react-color";
//Image Firebase
import { storage } from "../../Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
    //   const { categories, subcategories } = useContext(ProductContext);
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        subcategory: "",
        rating: "",
        size: "",
        gender: "",
        disCountPrice: "",
        color: "#000",
        brand: "",
    });
    const [image, setImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterSubCategories, setFilterSubCategories] = useState([]);
    const navigate = useNavigate();
    const resetForm = () => {
        setNewProduct({
            title: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            rating: "",
            gender: "",
            color: "",
            disCountPrice: "",
            brand: "",
        });
        setImage(null);
    };

    const addProduct = async (event) => {
        event.preventDefault();
        const {
            title,
            description,
            price,
            category,
            stock,
            rating,
            subcategory,
            size,
            gender,
            disCountPrice,
            brand,
        } = newProduct;
        // if (
        //   title.trim() === "" ||
        //   description.trim() === "" ||
        //   price.trim() === "" ||
        //   typeof category != "object" ||
        //   typeof subcategory != "object" ||
        //   stock.trim() === "" ||
        //   rating.trim() === "" ||
        //   size.trim() === "" ||
        //   gender.trim() === "" ||
        //   disCountPrice.trim() === "" ||
        //   brand.trim() === ""
        // ) {
        //   toast.error("All input required");
        // }

        try {
            const response = await axios.post("http://localhost:4400/products", {
                ...newProduct,
                image,
                date: selectedDate,
            });
            if (response.status !== 201) {
                throw new Error("Error");
            } else {
                setNewProduct(response.data);
                toast.success("Product added successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                resetForm();
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleColorChange = (newColor) => {
        setNewProduct({ ...newProduct, color: newColor.hex });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        })

    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                console.log(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                    console.log(downloadURL);
                });
            }
        );
    };

    return (
        <>
            <Layout>
                <div className="flex justify-center items-center h-screen dark:bg-black">
                    <div className=" bg-primary px-8 py-4 rounded-md mb-16 dark:bg-cyan-700">
                        <div className="">
                            <h1 className="text-center text-blue-200 text-lg mb-4 font-bold dark:text-white">
                                Add Product
                            </h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <input
                                type="text"
                                value={newProduct.title}
                                onChange={handleInputChange}
                                name="title"
                                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product title"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                name="price"
                                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product price"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={newProduct.disCountPrice}
                                onChange={handleInputChange}
                                name="disCountPrice"
                                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product disCountPrice"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={newProduct.size}
                                onChange={handleInputChange}
                                name="size"
                                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product Size"
                            />
                        </div>
                        <div>
                            <select onChange={handleInputChange} name="gender">
                                <option value="select">Select a Gender</option>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                                <option value="uni">Uni</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={newProduct.brand}
                                onChange={handleInputChange}
                                name="brand"
                                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product Brand"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                onChange={handleImage}
                                name="imageurl"
                                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product Image"
                            />
                        </div>
                        <div>
                            {/* <select onChange={handleInputChange} name="category">
                <option value="select">Select a Category</option>
                {categories.map((catergory, index) => (
                  <option value={catergory.id} key={index}>
                    {catergory.name}
                  </option>
                ))}
              </select>
              <select onChange={handleInputChange} name="subcategory">
                <option value="select">Select a Sub Category</option>
                {filterSubCategories.length > 0 &&
                  filterSubCategories.map((subcatergory, index) => (
                    <option value={subcatergory.id} key={index}>
                      {subcatergory.name}
                    </option>
                  ))}
              </select> */}
                            <div>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="category"
                                    className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                    placeholder="category"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="subcategory"
                                    className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                    placeholder="subcategory"
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="number"
                                value={newProduct.stock}
                                onChange={handleInputChange}
                                name="stock"
                                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product stock"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={newProduct.rating}
                                onChange={handleInputChange}
                                name="rating"
                                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product rating"
                            />
                        </div>
                        <div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                            />
                        </div>

                        <div>
                            <textarea
                                cols="30"
                                rows="3"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                                placeholder="Product description"
                            ></textarea>
                        </div>
                        <div className=" flex justify-center mb-2">
                            <button
                                onClick={addProduct}
                                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div>
                        <SketchPicker
                            color={newProduct.color}
                            onChangeComplete={handleColorChange}
                            className="ml-6 mb-[200px]"
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default AddProduct;