import React from 'react';

// import {Navbar} from './components'; -- Commented out to use components below.
import {Header, Footer, Cart} from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Cart />
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
