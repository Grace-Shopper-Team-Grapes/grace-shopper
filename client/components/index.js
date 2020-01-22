/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as DisplayAllProducts} from './DisplayAllProducts';

/*
 * ZK:
 * Adding pass-through exports for my components.
 * Will leave the above untouched until I'm sure this works.
 */
export {default as Header} from './template/Header';
export {default as Footer} from './template/Footer';
export {default as Cart} from './page/Cart';
export {default as Homepage} from './page/Homepage';
export {default as AllProducts} from './page/AllProducts';

/* Added by AV */
export {default as DisplaySingleProduct} from './DisplaySingleProduct';
export {default as DisplayAllOrderProducts} from './DisplayAllOrderProducts';

// Added by KC
export {default as DisplayCategories} from './DisplayCategories';
export {default as DisplayRedWines} from './DisplayRedWines';
export {default as DisplayWhiteWines} from './DisplayWhiteWines';
