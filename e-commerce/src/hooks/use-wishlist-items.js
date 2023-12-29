import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../store/wishlistSlice";

const useWishlistItems = () =>{
    const {loading, item} = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWishlist());
    },[dispatch]);

    return({loading, item})
}
export default useWishlistItems;