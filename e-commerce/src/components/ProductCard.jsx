import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { setWishlist } from "../store/wishlistSlice";
import { setCart } from "../store/cartSlice";
import useWishlistItems from "../hooks/use-wishlist-items";
import { useCallback } from "react";
import useCarttItems from "../hooks/use-cart-items";

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = useWishlistItems();
  const { element } = useCarttItems();
  const cartItem = element?.map((item) => {
    return item.items.id;
  });
  // get all item's id that been saved in wishlist from wishlist slice
  const it = item?.map((item) => {
    return item.items.id;
  });

  // save list of items id from wishlist in local storage
  localStorage.setItem("productId", JSON.stringify(it));

  // get list of items id from local storage
  const productId = JSON.parse(localStorage.getItem("productId"));

  // this action work on click at the heart icon and it will add or delete item from wishlist depend on if the list of items id from local storage include this item id or not 
  const wishlistAtcion = useCallback(
    (id, img, title, price) => {
      if (productId.includes(id)) {
        // dispatch(deletedItem(id))
        navigate("/wishlist");
      } else {
        dispatch(setWishlist({ id, img, title, price }));
      }
    },
    [dispatch, productId, navigate]
  );

  const addToCart = useCallback((id, img, title, price) => {
    const debounce = setTimeout(() => {
      dispatch(setCart({ id, img, title, price }));
    },500);

    return ( ) => {clearTimeout(debounce)}
  },[dispatch]);


  return (
    <div
      className="relative group rounded border border-transparent shadow-xl bg-slate-200/50 p-3 duration-300 hover:-translate-y-5 hover:border-purple-500"
    >
      <Link to={`/${product.id}`}>
        <i className="fa-solid fa-info-circle text-blue-300 absolute top-5 end-5 duration-300 hover:text-[22px] hover:text-blue-400"></i>
      </Link>
      <div className="h-[250px] md:h-[300px] w-full">
        <img
          src={product.image}
          alt="products"
          className=" max-w-full w-full h-full"
        />
      </div>
      <div>
        <div className="py-2">
          <h4 className="text-slate-800 mb-0 text-md">{product.title}</h4>
          <p className="text-purple-500 text-2xl font-bold py-1">
            ${product.price.toFixed()}
          </p>
        </div>
        <div className="between">
          <div className="flex items-center">
            <i
              className={`fa-solid fa-star ${
                product.rating.rate >= 1 ? "text-yellow-400" : "text-slate-400"
              } mx-1 text-[13px]`}
            ></i>
            <i
              className={`fa-solid fa-star ${
                product.rating.rate >= 2 ? "text-yellow-400" : "text-slate-400"
              } mx-1 text-[13px]`}
            ></i>
            <i
              className={`fa-solid fa-star ${
                product.rating.rate >= 3 ? "text-yellow-400" : "text-slate-400"
              } mx-1 text-[13px]`}
            ></i>
            <i
              className={`fa-solid fa-star ${
                product.rating.rate >= 4 ? "text-yellow-400" : "text-slate-400"
              } mx-1 text-[13px]`}
            ></i>
            <i
              className={`fa-solid fa-star ${
                product.rating.rate >= 4.5
                  ? "text-yellow-400"
                  : "text-slate-400"
              } mx-1 text-[13px]`}
            ></i>
          </div>
          <div>
            <i
              className={`fa-solid fa-heart ${
                // if this product id exist in list off id that saved in local storage make heart's color red else make it slate
                productId.includes(product.id)
                  ? "text-red-500"
                  : "text-slate-500/50"
              } text-[20px] cursor-pointer me-3`}
              onClick={() =>
                wishlistAtcion(
                  product.id,
                  product.image,
                  product.title,
                  product.price
                )
              }
            ></i>
          </div>
        </div>
        <i className="text-slate-700 font-bold pb-5 block">{product.brand}</i>
        {/* if this item exist in cart show disabled button else show add to cart button */}
        {cartItem.includes(product.id) ? (
          <Button
            disabled
            className="text-white bg-purple-300 py-1 rounded w-full outline-none cursor-not-allowed"
          >
            already in cart
          </Button>
        ) : (
          <Button
            className="relative text-purple-500 bg-white border border-purple-500 group-hover:text-white py-1 rounded w-full duration-300 z-10 outline-none after:absolute after:top-0 after:start-0 after:h-full after:w-0 after:bg-purple-500 after:-z-10 after:duration-300 group-hover:after:w-full"
            onClick={() =>
              addToCart(product.id, product.image, product.title, product.price)
            }
          >
            add to cart
          </Button>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
