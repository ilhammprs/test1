import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
//customer
import Homepage from './pages/customer/homepage';
import Cart from './pages/customer/cart'
import DetailProduct from './pages/customer/detailProduct'
import HomeAuth from './pages/customer/homeauth'
import Profile from './pages/customer/profile'
import Transaksi from './pages/customer/history'
import Faq from './pages/customer/faq'
import ProductL from './pages/customer/productList'
//admin
import ProductAdmin from './pages/admin/listProduct'
import AddProduct from './pages/admin/add'
import TransactionAdmin from './pages/admin/transaction'
import UpdateProduct from './pages/admin/update'

import { API, setAuthToken } from './config/api'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'admin') {
        navigate('/product');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/auth" element={<HomeAuth />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/transaction" element={<TransactionAdmin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product" element={<ProductAdmin />} />
        <Route path="/history" element={<Transaksi />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/productList" element={<ProductL />} />
      </Routes>
    </div>
  );
}

export default App;
