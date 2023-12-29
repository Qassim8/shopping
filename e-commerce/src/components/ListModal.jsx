import useCartItems from "../hooks/use-cart-items";
import useWishlistItems from "../hooks/use-wishlist-items";
import { Link } from "react-router-dom";

const ListModal = ({ cart, wishlist }) => {
  const { element } = useCartItems();
  const { item } = useWishlistItems();

  const cartItems = element?.map((element, index) => (
    <div key={index}>
      <Link
        to={`/${element.items.id}`}
        className="bg-slate-200 py-2 px-2 my-1 me-2 rounded flex items-center"
      >
        <img src={element?.items.img} alt="item" className="w-10 h-10" />
        <div className="ms-8">
          <h4 className="text-slate-800">{element?.items.title}</h4>
          <h2 className="text-emerald-400">
            ${element?.items.price.toFixed()}
          </h2>
        </div>
      </Link>
    </div>
  ));

  const wishlistItems = item?.map((item, index) => (
    <div key={index}>
      <Link
        to={`/${item.items.id}`}
        className="bg-slate-200 py-2 px-2 my-1 me-2 rounded flex items-center"
      >
        <img src={item?.items.img} alt="item" className="w-10 h-10" />
        <div className="">
          <h3 className="text-slate-800 ms-8">{item?.items.title}</h3>
        </div>
      </Link>
    </div>
  ));

  return wishlist ? (
    <div className="fixed top-28 end-10 bg-slate-600 p-3 rounded border border-slate-300 z-[1000]">
      <div className="text-center mb-3">
        <i className="fa-solid fa-heart text-red-500 text-center"></i>
      </div>
      <div className="flex flex-col overflow-y-auto h-60">{wishlistItems}</div>
      <Link
        to={"/wishlist"}
        className="bg-purple-400 text-white text-center w-full py-1 px-2 mt-4 rounded-sm no-underline block"
      >
        Go To Wishlist
      </Link>
    </div>
  ) : cart ? (
    <div className="fixed top-28 end-10 bg-slate-600 p-3 rounded border border-slate-300 z-[1000]">
      <div className="text-center mb-3">
        <i className="fa-solid fa-shopping-cart text-cyan-600 text-center"></i>
      </div>
      <div className="flex flex-col overflow-y-auto h-60">{cartItems}</div>
      <Link
        to={"/cart"}
        className="bg-purple-400 text-white text-center w-full py-1 px-2 mt-4 rounded-sm no-underline block"
      >
        Go To Cart
      </Link>
    </div>
  ) : (
    ""
  );
};
export default ListModal;
