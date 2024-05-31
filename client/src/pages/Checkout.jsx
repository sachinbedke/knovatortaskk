import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addCart } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { user, cart } = useSelector(state => state.user);

    // Calculate total price
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
    const dispatch = useDispatch()

    const navigate = useNavigate()
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Checkout</h1>
            <ul className="list-group">
                {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={`http://localhost:5000/${item.image}`} alt={item.name} height={50} className="mr-3" />
                            <div>
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="mb-0">${item.price}</p>
                                <p className="mb-0">{item.desc}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-4">
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                <button onClick={e => {
                    toast.success("Order Placed Success")
                    dispatch(addCart(null))
                    navigate("/")

                }} type="button" class="btn btn-primary">Place order</button>
            </div>
        </div>
    );
};

export default Checkout;
