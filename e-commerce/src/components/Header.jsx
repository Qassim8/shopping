import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ListModal from "../components/ListModal";
import { useDispatch, useSelector } from "react-redux";
import { updateAddValue } from "../store/cartSlice";
import { updateAddedValue } from "../store/wishlistSlice";

const Header = ({ main }) => {
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { add } = useSelector((state) => state.cart);
  const { added } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // make add = false; from cart slice
  const changeAdd = useCallback(() => {
    dispatch(updateAddValue());
  }, [dispatch]);
// make added = false; from wishlist slice
  const changeAdded = useCallback(() => {
    dispatch(updateAddedValue());
  }, [dispatch]);

  return (
    <>
      <header className="bg-purple-600 py-3 ">
        <nav className="contain flex justify-between items-center">
          <Link to={"/"} className="no-underline text-white text-xl">
            <span className="italic text-slate-300">Mo-</span>Shop
          </Link>
          <i className="fa-solid fa-user text-white cursor-pointer mx-3"></i>
        </nav>
      </header>
      <header className="sticky top-0 z-[800]">
        <nav
          className={`${
            main && "absolute bg-slate-800/70"
          } end-0 w-full bg-slate-800 `}
        >
          <div className="contain flex justify-between items-center">
            <i
              className="fa-solid fa-bars text-purple-400 text-xl py-3 cursor-pointer md:!hidden"
              onClick={() => setShow(!show)}
            ></i>
            <div
              className={`absolute top-0 ${
                show ? "start-0 w-[95%] h-screen" : "start-[-500px]"
              } flex justify-between bg-white p-3 transition duration-300 md:bg-transparent md:relative md:start-0 z-[500]`}
            >
              <ul className="flex flex-col md:flex-row">
                <li>
                  <NavLink to={"/"} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/shop"} className="nav-link">
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/cart"} className="nav-link">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/wishlist"} className="nav-link">
                    Wishlist
                  </NavLink>
                </li>
              </ul>
              <i
                className="fa-solid fa-x text-slate-300 md:!hidden cursor-pointer"
                onClick={() => setShow(!show)}
              ></i>
            </div>
            {main && (
              <div className="py-3 flex items-center gap-3">
                <div
                  className="relative cursor-pointer"
                  onClick={() =>
                    setWishlist(!wishlist) & setCart(false) & changeAdded()
                  }
                >
                  {added && (
                    <span className="absolute flex h-2 w-2 end-0">
                      <span className="absolute -end-1 -top-1 animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-500 opacity-0"></span>
                      <span className="inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  <i className="fa-solid fa-heart text-white cursor-pointer"></i>
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() =>
                    setCart(!cart) & setWishlist(false) & changeAdd()
                  }
                >
                  {add && (
                    <span className="absolute flex h-2 w-2 end-0">
                      <span className="absolute -end-1 -top-1 animate-ping absolute inline-flex h-5 w-5 rounded-full bg-red-500 opacity-0"></span>
                      <span className="inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  <i className="fa-solid fa-shopping-cart text-white cursor-pointer"></i>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <ListModal cart={cart} wishlist={wishlist} />
    </>
  );
};
export default Header;
