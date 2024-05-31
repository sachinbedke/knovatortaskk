import React, { useState } from 'react'
import { useAddCartMutation, useGetAllCartsQuery } from '../redux/api'

import { useDispatch, useSelector } from 'react-redux';
import { addCart, userInfo } from '../redux/chatSlice';
import { Link } from 'react-router-dom';

const List = () => {
    const { data } = useGetAllCartsQuery()
    const [addCart, { isSuccess }] = useAddCartMutation()
    console.log(data);
    const [cartDat, setCartDat] = useState({})
    const handleCart = e => {
        const { name, value, files } = e.target
        setCartDat({ ...cartDat, [name]: value })

    }
    // const handleSubmit = () => {
    //     const fd = new FormData()
    //     fd.append("", productData.title)
    //     fd.append("desc", productData.desc)
    //     fd.append("location", productData.location)
    //     fd.append("price", productData.price)
    //     for (const item of productData.hero) {
    //         fd.append("hero", item)
    //     }
    //     addProperty(fd)
    //     setSelectedProduct({ removeItems: [] })
    //     console.log(fd);
    // }
    // const handleChange = e => {
    //     const { name, value, type, files } = e.target

    //     if (type === "file") {
    //         const preview = []
    //         for (const item of files) {
    //             preview.push(URL.createObjectURL(item))
    //         }
    //         setProductData({ ...productData, [name]: files, preview })
    //     }
    //     else {
    //         setProductData({ ...productData, [name]: value })
    //     }
    // }
    const [userinfo, setUserinfo] = useState({})
    const handleChange = e => {
        const { name, value, files, type } = e.target

        if (type == "file") {
            setCartDat({ ...cartDat, [name]: files })
        } else {
            setUserinfo({ ...userinfo, [name]: value })
        }
    }
    const handleSubmit = e => {
        const fd = new FormData()
        fd.append("name", cartDat.name)
        fd.append("desc", cartDat.desc)
        fd.append("price", cartDat.price)
        fd.append("image", cartDat.image)
        addCart(fd)

    }
    const [booked, setBooked] = useState([])
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    console.log(booked);
    return <>
        <nav class="navbar navbar-expand-lg bg-light text-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">KNOVATOR</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
                        user info
                    </button>
                </div>
                {user && <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        {user.firstname} {user.lastname}

                    </button>
                    <ul className="dropdown-menu">
                        {booked.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="font-weight-bold">{item.name}</span>
                                    <span className="text-muted">${item.price}</span>
                                </div>
                            </li>
                        ))}
                        <Link to="/checkout">  <button onClick={e => dispatch(addCart(booked))} type="button" class="btn btn-primary">Place Order</button></Link>
                    </ul>

                </div>}
            </div>
        </nav>

        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input onChange={handleChange} required name='firstname' placeholder='Enter firstname ' type="text" className='mt-2 form-control' />
                        <input onChange={handleChange} required name='lastname' placeholder='Enter lastname ' type="text" className='mt-2 form-control' />
                        <input onChange={handleChange} required name='address' placeholder='Enter address ' type="text" className='mt-2 form-control' />
                        <button data-bs-dismiss="modal" onClick={e => dispatch(userInfo(userinfo))} class="btn btn-primary">submit</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="cart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input onChange={handleCart} className='form-control' placeholder='Enter name' type="text" name="name" />
                        <input onChange={handleCart} className='form-control' placeholder='Enter desc' type="text" name="desc" />
                        <input onChange={handleCart} className='form-control' placeholder='Enter price' type="number" name="price" />
                        <input onChange={handleCart} className='form-control' placeholder='Enter image' type="file" name="image" />
                        <button onClick={handleSubmit} type="button" class="btn btn-primary">Add Cart</button>
                    </div>

                </div>
            </div>
        </div>
        <div>
            <h1 className="text-center my-4">Cart</h1>
            <div className="container mt-5">
                <button data-bs-toggle="modal" data-bs-target="#cart" type="button" class="btn btn-primary">Create Cart</button>

                <div className="row">
                    {
                        data && data.map(item => <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={`http://localhost:5000/${item.image}`} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.desc}</p>
                                    <p className="card-text">${item.price}</p>
                                    <button onClick={e => {
                                        setBooked([...booked, item])
                                    }} className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>

    </>
}

export default List