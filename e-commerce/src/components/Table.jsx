import { Button, Card, Typography } from "@material-tailwind/react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import useCartItems from "../hooks/use-cart-items";
import useWishlistItems from "../hooks/use-wishlist-items";
import { useDispatch } from "react-redux";
import {
  decrementItem,
  deleteItem,
  incrementItem,
  setCartWishlist,
} from "../store/cartSlice";
import { deletedItem } from "../store/wishlistSlice";

const Table = ({ page }) => {
  const { item } = useWishlistItems();
  const { element } = useCartItems();
  const cartItem = element?.map((item) => {
    return item.items.id;
  });
  const dispatch = useDispatch();

  const total = element
    .map((element) => {
      return element.items.price.toFixed() * element.items.quantity;
    })
    ?.reduce((acccumulator, currentValue) => acccumulator + currentValue, 0);

  const addToCart = useCallback(
    (id, img, title, quantity, price) => {
      const debounce = setTimeout(() =>{
        dispatch(setCartWishlist({ id, img, title, quantity, price }));
      },1500)

      return () => {clearTimeout(debounce)}
    },
    [dispatch]
  );

  const deleteFromCart = useCallback(
    (id) => {
      const delay = setTimeout(() => {
        dispatch(deleteItem(id));
      }, 1000);

      return () => {
        clearTimeout(delay);
      };
    },
    [dispatch]
  );

  const deleteFromWishlist = useCallback(
    (id) => {
      const delay = setTimeout(() => {
        dispatch(deletedItem(id));
      }, 1000);

      return () => {
        clearTimeout(delay);
      };
    },
    [dispatch]
  );

  const incrementCartItem = useCallback(
    (itemId) => {
      dispatch(incrementItem(itemId));
    },
    [dispatch]
  );

  const decrementCartItem = useCallback(
    (itemId) => {
      dispatch(decrementItem(itemId));
    },
    [dispatch]
  );

  const CART_TABLE_HEAD = [
    "Image",
    "Name",
    "Price",
    "Quantity",
    "Total",
    "Action",
  ];
  const WISH_TABLE_HEAD = ["Image", "Name", "Price", "Action"];

  const CART_TABLE_ROWS = element?.map((element, index) => (
    <tr key={index} className=" even:bg-slate-100 text-center">
      <td className="p-3">
        <Typography variant="small" color="blue-gray" className="h-8 w-8">
          <img
            src={element?.items.img}
            alt="cart product"
            className="max-w-full"
          />
        </Typography>
      </td>
      <td className="p-3">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {element?.items.title}
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal text-emerald-600"
        >
          ${element?.items.price.toFixed()}
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex items-center justify-center"
        >
          <button
            className="h-6 w-6 outline-none rounded-sm bg-slate-500 text-white border-none"
            onClick={() => incrementCartItem(element?.items.id)}
          >
            +
          </button>
          <span className="w-10 h-6 outline-none rounded-sm text-center border border-slate-400 mx-1">
            {element.items.quantity}
          </span>
          <button
            disabled={element?.items.quantity <= 1}
            className="h-6 w-6 outline-none rounded-sm bg-slate-500 text-white border-none"
            onClick={() => decrementCartItem(element?.items.id)}
          >
            -
          </button>
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex items-center justify-center"
        >
          ${element?.items.quantity * element?.items.price.toFixed() || 0}
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium flex justify-center items-center"
        >
          <Link className=" no-underline" to={`/${element?.items.id}`}>
            <i className="fa-solid fa-info-circle text-blue-500 px-1 text-[20px] cursor-pointer"></i>
          </Link>
          <i
            className="fa-solid fa-times-circle text-red-500 px-1 text-[20px] cursor-pointer"
            onClick={() => deleteFromCart(element.id)}
          ></i>
        </Typography>
      </td>
    </tr>
  ));

  const WISH_TABLE_ROWS = item?.map((item, index) => (
    <tr key={index} className=" even:bg-slate-100 text-center">
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="h-8 w-8 flex justify-center items-center"
        >
          <img src={item?.items.img} alt="product img" className="max-w-full" />
        </Typography>
      </td>
      <td className="p-3">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item?.items.title}
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal text-emerald-600"
        >
          ${item?.items.price}
        </Typography>
      </td>
      <td className="p-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium flex justify-center items-center"
        >
          {cartItem.includes(item?.items.id) ? (
            <Button
              disabled
              className="bg-purple-300 text-white py-1 px-3 mx-1 cursor-not-allowed"
            >
              already in cart
            </Button>
          ) : (
            <Button
              className="bg-purple-500 text-white py-1 px-3 mx-1"
              onClick={() =>
                addToCart(
                  item?.items.id,
                  item?.items.img,
                  item?.items.title,
                  1,
                  item?.items.price
                )
              }
            >
              add to cart
            </Button>
          )}
          <Button
            className="bg-red-500 text-white py-1 px-3 mx-1"
            onClick={() => deleteFromWishlist(item?.id)}
          >
            delete
          </Button>
        </Typography>
      </td>
    </tr>
  ));

  const CART_DATA = () => {
    if (CART_TABLE_ROWS.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="pt-10 pb-5 text-center">
            <i className="fa-solid fa-exclamation fa-2x py-3 px-6 border-[3px] border-purple-300 text-purple-300 mb-5 rounded-full animate-bounce"></i>
            <p className="text-purple-500 font-bold">Please Add Items First</p>
          </td>
        </tr>
      );
    } else {
      return CART_TABLE_ROWS;
    }
  };
  const WISHLIST_DATA = () => {
    if (WISH_TABLE_ROWS.length === 0) {
      return (
        <tr className="text-center">
          <td colSpan={6} className="pt-10 pb-5">
            <i className="fa-solid fa-exclamation fa-2x py-3 px-6 border-[3px] border-purple-300 text-purple-300 mb-5 rounded-full animate-bounce"></i>
            <p className="text-purple-500 font-bold">Please Add Items First</p>
          </td>
        </tr>
      );
    } else {
      return WISH_TABLE_ROWS;
    }
  };

  return (
    <div className="contain pb-16">
      <section className="py-10">
        <div className="border-b border-slate-500">
          <p className="text-xl text-slate-800 pb-3">My {page}</p>
        </div>
      </section>
      <Card className="h-full w-full overflow-scroll md:overflow-hidden">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {page === "cart" ? (
                <>
                  {CART_TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="text-white bg-slate-500 py-3 text-center"
                    >
                      <Typography
                        variant="small"
                        className="font-normal leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </>
              ) : (
                <>
                  {WISH_TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="text-white bg-slate-500 py-3 text-center"
                    >
                      <Typography
                        variant="small"
                        className="font-normal leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>
          <tbody>{page === "cart" ? CART_DATA() : WISHLIST_DATA()}</tbody>
        </table>
        {page === "cart" && (
          <div className="between py-8">
            <p className="text-slate-500 font-bold">Overall Total</p>
            <p className="text-emerald-500 font-bold">${total}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Table;
