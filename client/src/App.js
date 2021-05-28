import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import ProductDetails from './views/ProductDetails';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import UserProfile from './views/UserProfile';
import Shipping from './views/Shipping';
import Payment from './views/Payment';


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/profile' component={UserProfile} exact />
          <Route path='/shipping' component={Shipping} exact />
          <Route path='/payment' component={Payment} exact />
          <Route path='/' component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;