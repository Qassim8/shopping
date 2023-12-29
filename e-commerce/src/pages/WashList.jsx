import { memo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageName from "../components/PageName";
import Table from "../components/Table";
import ToastMessage from "../components/ToastMessage";
import useCarttItems from "../hooks/use-cart-items";

const WashList = () => {
  const {addFromWishlist, error, closeWishListToast, closeErrorToast} = useCarttItems();
    return (
      <>
        <Header />
        <PageName pageName={"WashList"} icon={"fa-heart text-red-400"} />
        <Table page={"wishlist"} />
        <ToastMessage add={addFromWishlist} error={error} close={closeWishListToast} closeError={closeErrorToast}/>
        <Footer />
      </>
    );
};

export default memo(WashList);
