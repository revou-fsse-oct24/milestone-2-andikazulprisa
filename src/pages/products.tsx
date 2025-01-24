import React, { useState, useEffect } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
import { getProducts } from "../services/api";
import { getEmail } from "../services/auth";

interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    description: string;
}

interface CartItem extends Product {
    qty: number;
}

const ProductsPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error);
            }
        }
    }, []);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            setEmail(getEmail(access_token));
        } else {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleAddToCart = (id: number) => {
        const product = products.find((item) => item.id === id);
        if (!product) return;

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const handleQtyChange = (id: number, increment: boolean) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, qty: increment ? item.qty + 1 : Math.max(item.qty - 1, 1) }
                    : item
            )
        );
    };

    const totalPrice = cart.reduce((total, item) => total + item.qty * item.price, 0);

    return (
        <>
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
                {email && <span>{email}</span>}
                <Button variant="ml-5 bg-black" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <div className="flex justify-center py-5">
                <div className="w-4/6 flex flex-wrap">
                    {products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.images[0]} />
                            <CardProduct.Body title={product.title}>
                                {product.description}
                            </CardProduct.Body>
                            <CardProduct.Footer
                                price={product.price}
                                id={product.id}
                                handleAddToCart={handleAddToCart}
                            />
                        </CardProduct>
                    ))}
                </div>
                <div className="w-2/6">
                    <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
                    <table className="text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>$ {item.price.toLocaleString("id-ID")}</td>
                                    <td className="flex items-center">
                                        <Button
                                            variant='bg-gray-700 text-black px-1.5'
                                            onClick={() => handleQtyChange(item.id, false)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.qty}</span>
                                        <Button
                                            variant="bg-gray-700 text-black px-1.5"
                                            onClick={() => handleQtyChange(item.id, true)}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>$ {(item.qty * item.price).toLocaleString("id-ID")}</td>
                                    <td>
                                        <Button
                                            variant="bg-red-700 text-black px-1"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {cart.length > 0 && (
                        <div className="mt-5 text-xl font-bold">
                            Total Price: $ {totalPrice.toLocaleString("id-ID")}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
