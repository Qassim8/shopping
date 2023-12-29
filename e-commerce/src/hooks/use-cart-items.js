import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateAddFromWishlist, updateAddItems, updateErrorValue } from "../store/cartSlice";

const useCarttItems = () => {
  const { load, element, add, addItems, addFromWishlist, error} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

    const closeWishListToast = useCallback(() => {
      dispatch(updateAddFromWishlist());
    }, [dispatch]);

    const closeShopToast = useCallback(() =>{
      dispatch(updateAddItems())
    },[dispatch]);

    const closeErrorToast = useCallback(() => {
      dispatch(updateErrorValue())
    },[dispatch]);

  return { load, element, add, addItems, addFromWishlist, error, closeShopToast, closeWishListToast, closeErrorToast };
};
export default useCarttItems;
