import { memo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageName from "../components/PageName";
import Table from "../components/Table"

const Cart = () => {
    return (
      <>
        <Header />
        <PageName pageName={"Cart"} icon={"fa-shopping-cart text-blue-900"} />
        {/* Start Items */}
          <Table page={'cart'}/>
        {/* End Items */}
        <Footer />
      </>
    );
};

export default memo(Cart);
