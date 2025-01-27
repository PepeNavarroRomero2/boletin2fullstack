'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [actualizarStock, setActualizarStock] = useState(0);

    async function fetchProducts() {
        try {
            const response = await fetch("/api/productos");
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const body = await response.json();
            setProducts(body);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function selectColor(stock) {
        return stock === 0 ? "red" : "green";
    }

    async function actualizarStock1(idStock) {
        try {
            const response = await fetch("/api/productos", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: idStock,
                    update: {
                        stock: actualizarStock
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el stock');
            }

            setActualizarStock(0);
            await fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Lista de productos</h1>
            {products.map(product => (
                <div key={product.id}>
                    <p>Nombre: {product.nombre}</p>
                    <p>Precio: {product.precio}</p>
                    <p style={{ color: selectColor(product.stock) }}>Stock: {product.stock}</p>
                    <input
                        type="number"
                        value={actualizarStock}
                        onChange={(e) => setActualizarStock(e.target.value)}
                    />
                    <button onClick={() => actualizarStock1(product.id)}>Actualizar stock</button>
                </div>
            ))}
            <Link href={"/productos/create"}>
                <h2>Agregar Nuevo Producto</h2>
            </Link>
        </div>
    );
}