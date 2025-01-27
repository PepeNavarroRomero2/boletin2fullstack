'use client'
import { useState, useEffect } from "react"

export default function addProduct(){

    const[nombre, setNombre]=useState("")
    const[precio, setPrecio]=useState(0)
    const[stock, setStock]=useState(0)

    async function crearContacto(e) {
        e.preventDefault();

        const response = await fetch("/api/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contact: {
                nombre: nombre,
                precio: precio,
                stock: stock
              },
            }),
          });

          if (response.ok) {
            alert("Producto añadido exitosamente.");
            setNombre("");
            setPrecio(0);
            setStock(0);
          } else {
            alert("Hubo un error al añadir el contacto.");
          }
    }

    return(<div>
        <form onSubmit={crearContacto}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
            Precio: 
            <input
            type="number"
            value={precio}
            onChange={(e)=> setPrecio(e.target.value)}
            required
            />
        </label>
        <br/>
        <label>
            Stock:
            <input
            type="number"
            value={stock<0 ? 0:stock}
            onChange={(e)=> setStock(e.target.value)}
            />
        </label>
        <br/>
        <input type="submit" value="Crear" />
        </form>
    </div>)
}