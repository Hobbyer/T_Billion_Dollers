import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column align-items-center text-white rounded-4"
      style={{
        width: "100px",
        padding: "50px",
        height: "100%",
        backgroundColor: "#3D8D7A",
      }}
    >
      <div className="btn mb-3 p-3">
        <Link to={"/admin"}>
          <img src="/imgs/home.png" alt="" width={50} height={50} />
          <span>HOME</span>
        </Link>
      </div>
      <div className="btn mb-3 p-3">
        <Link to={"stock-detail"}>
          <img src="/imgs/animal.png" alt="" width={50} height={50} />
          <span>STOCK</span>
        </Link>
      </div>
      <div className="btn mb-3 p-3">
        <Link to={"sales-paymentInfo"}>
          <img src="/imgs/group.png" alt="" width={50} height={50} />
          <span>SALES</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
