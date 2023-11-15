import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const mySwal = withReactContent(Swal);


export const Mostrar = () => {
   
    //1 configuración de los hooks.
    const [productos, setProductos] = useState([]);
    
    //2  referencia a la db de firebase
    const productosCollection = collection(db,"Productos");
    
    //3 asincronismo a los datos
    const getProductos = async ()=>{        
        const data = await getDoc(productosCollection);
        setProductos(
            data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        )
    }

    //4 useeffect
    useEffect(() => {
      getProductos();    
    }, []);
    
    //borrado del registro
    const deleteProducto = async (id)=>{
        const productoDoc = doc(db,'Productos',id);
        await deleteDoc(productoDoc);
        getProductos();
    };

    //5 configuración del sweetalert2
    const confirmDelete = (id)=>{
        Swal.fire({
            title: "Estás seguro de eliminar el producto?",
            text: "El borrado será permanente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrarlo!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }



  return (
    <div className='container'>
        <div className="row">
            <div className="col">
                <div className='d-grid gap-2'>
                    <link>falta el router a crear producto</link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>                            
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((produc) =>(
                                <tr key={produc.id}>                                    
                                    <td key={produc.nombre}>{productos.nombre || ''}</td>
                                    <td key={produc.precio}>{productos.precio || ''}</td>
                                    <td key={produc.stock}>{productos.stock || ''}</td>
                                    <td>
                                        <link> ruta de editar</link>
                                        <button 
                                            onClick={() =>{confirmDelete(produc.id)}}
                                            className='btn dg-danger'> 
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        
                    </tbody>
                </table>
            </div>
        </div>

        
        
    </div>
  )
}
