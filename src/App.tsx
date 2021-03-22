import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import AdminEditDetails from './componenets/Admin/AdminEditDetails';
import AdminList from './componenets/Admin/AdminList';
import AdminLogIn from './componenets/Admin/AdminLogIn';
import CartView from './componenets/Cart/CartView';
import Footer2 from './componenets/Footer';
import Navbar from './componenets/Navbar';
import OrderSuccessMessage from './componenets/OrderSuccess/OrderSuccessMessage';
import ProductDetails from './componenets/ProductDetails/ProductDetails';
import StartPageView from './componenets/StartPage/StartPageView';
import CartProvider from './contexts/CartContext';
import ScrollToTop from './componenets/ScrollToTop'
import React from 'react';
import AddNewProduct from './componenets/Admin/AddNewProduct';

function App() {
  return (
    <CartProvider>
      <Router>
      <ScrollToTop />
        <Navbar /> 
        <Switch> 
          <Route path = '/product/:id' component={ProductDetails} />
        </Switch>
        <Switch> 
          <Route path = '/ordersuccess' component={OrderSuccessMessage} />
        </Switch>
        <Route exact path='/'>  
          <StartPageView />
        </Route>
        <Route path='/cart'>
            <CartView /> 
        </Route>
        <Route path='/admin'>
          <AdminLogIn />
        </Route>
        <Route path='/admin-list'>
          <AdminList />
        </Route>
        <Route path='/add-product'>
          <AddNewProduct /> 
        </Route>
        <Switch> 
        <Route path = '/edit-product/:id' component={AdminEditDetails} />
      </Switch>

        <Footer2 /> 
      </Router>
    </CartProvider>   
  );
}

export default App;
