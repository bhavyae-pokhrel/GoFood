import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {

 const [cartView,setCartView]= useState(false)

  const navigate = useNavigate();
  let data=useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
return(
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className=" container-fluid">
        <Link className=" mx-2 navbar-brand fs-1 fst-italic" style={{fontFamily:'NHaasGroteskDSPro-65Md'}} to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item">
              <Link className=" mx-2 nav-link active fs-4 " aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className='nav-item'>
                <Link className="nav-link active fs-4 " aria-current="page" to="/myorder">My Orders</Link>
              </li>:""}
          </ul>
         
           {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn-lg bg-white text-success mx-2" style={{"text-decoration":"none"}} to="/login">Login</Link>
              <Link className="btn-lg bg-white text-success mx-2" style={{"text-decoration":"none"}} to="/creatuser">SignUp</Link>
            </div>
            :
            <div className='d-flex mx-1'>
              <div className='btn-lg bg-white text-success mx-2'  onClick={()=>{setCartView(true)}}> 
                My Cart {" "}
               <Badge pill bg="danger">{data.length}</Badge> 
              </div>
             {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
              <button className='btn-lg bg-white text-danger mx-4 '  onClick={handleLogout}>
                Logout
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
  </div>
)
}