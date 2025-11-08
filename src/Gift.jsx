import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Gift.css";
import axios from "axios";
const products = [
  {
    id: 11,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/TSB_GC_indiacard_1_1_28dafb2bb6.png",
    title: "India Exclusive",
    per: "Bring in the festive season and make each celebration memorable.",
    price: 99,
  },
  {
    id: 12,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/71d3780c_be6e_46b1_ab01_8a2bce244a7f_1_1_2d1afadaa0.png",
    title: "Starbucks Coffee",
    per: " Starbucks is best when shared. Treat your pals to a good cup of coffee.",
    price: 88,
  },
  {
    id: 13,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/7c6f7c64_3f89_4ba2_9af8_45fc6d94ad35_1_1bdd3bf075.webp",
    title: "Keep Me Warm",
    per: "  Captivating, cosy, coffee. Gift your loved ones this Starbucks Gift Card.",
    price: 50,
  },
  {
    id: 14,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ff96761f_7c0a_4960_84a8_2a94c7d994fc_f59ad13bec.png",
    title: "Good Things Ahe",
    per: "Have a cup of coffee, its all good from here.",
    price: 110,
  },
  {
    id: 15,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/2822e4c5_38ff_422a_a225_cfc3a6bdfc06_1_fdcaafd8bd.png",
    title: "My Treat",
    per: "  Nothing like a cup of coffee to flame a friendship. Share the experience with your..",
    price: 40,
  },
  {
    id: 16,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/61c1abaf_3b0f_48af_903e_426c1b9dae41_1_9a59b0ea34.webp",
    title: "Way To Go",
    per: " Its time to celebrate! Show your appreciation with this Starbucks Gift Card.",
    price: 80,
  },
  {
    id: 17,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/49bc224d_6ad8_46db_a46f_9ce256321659_1_2d7d101557.png",
    title: "Greetings",
    per: "Let each 'hello' be one with coffee.",
    price: 105,
  },
  {
    id: 18,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/483b8a72_214b_47d4_81a1_ad9187f5f50b_1_a449d5551b.png",
    title: "Global Spring Card",
    per: "   Blissful, blooming, and bright. Spring is a merry time. Keep things fresh and lively.",
    price: 120,
  },
  {
    id: 19,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/10471f55_db43_4633_8f4a_a2b8408abeea_1_dc2f4669f7.webp",
    title: "Are The Best Just Sayin",
    per: "Think theyre the Nitro to your Brew? Let them know..",
    price: 113,
  },
  {
    id: 20,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/97ee3280_2f05_43ad_bd94_f5c184d4f502_1_0a31455af9.png",
    title: "Congrats",
    per: "   Coffee. Cheer. Celebrate. Enjoy each of your special moments withStarbucks.",
    price: 63,
  },
  {
    id: 21,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/720b9684_c1ac_49cb_92fe_a7e0240c9602_1_1_faf8b923e5.webp",
    title: "Thank You",
    per: "To the people who make coffee and those who love it, thank you..",
    price: 78,
  },
  {
    id: 22,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/0807fba8_293b_407b_a973_c5eaad1c73fa_1_11692c064d.png",
    title: "Life Happens",
    per: "Life happens, coffee helps. Brighten up their day with Starbucks.",
    price: 56,
  },
];
const Item = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    if (query) {
      setLoading(true);
      setTimeout(() => {
        const filtered = products.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search]);

  const addToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }
    try {
      await axios.post(
        "https://server-vjpl.onrender.com/add-to-cart",
        {
          productId: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMessage(`${product.title} added to cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(error);
      setError("Error adding item to cart. Please try again.");
    }
  };

 // 🔹 Loading Spinner
  if (loading) {
    return (
      <div className="Herosection_1">
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px", width: "100%" }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Herosection_1">
        <div className="container">
          <div className="alert alert-danger text-center mt-4 fw-bold">
            ❌ {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Toast Popup */}
      {showToast && (
        <div className="toast-popup bg-success text-white">
          🛒 {toastMessage}
        </div>
      )}

      <div className="Herosection_1">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div
              className="alert alert-danger text-center mt-3 fw-bold align-items-center"
              style={{
                width: "fit-content",
                backgroundColor: "#e7414c",
                color: "white",
                margin: "20px auto",
              }}
            >
              ❌ No products found.
            </div>
          ) : (
            <div id="products2">
              {filteredProducts.map((item) => (
                <div key={item.id} className="box1">
                  <div className="img-box1">
                    <img
                      className="images1"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="bottom">
                    <h2>{item.title}</h2>
                    <h4>{item.per}</h4>
                    <h3>₹{item.price}.00</h3>

                    <button
                      className="btn4 btn btn-success"
                      onClick={() => addToCart(item)}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modern Footer */}
      <footer className="bg-dark text-white pt-5 pb-3 fw-medium shadow-l mt-3">
        <div className="container">
          <div className="row justify-content-start">
            {/* Contact Info Left Aligned */}
            <div className="col-md-5 mb-4 text-md-start text-center">
              <h5 className="text-uppercase fw-bold text-warning mb-3 border-bottom border-warning pb-2">
                Contact
              </h5>
              <p className="mb-2">
                <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                Surat, Gujarat
              </p>
              <p className="mb-2">
                <i className="far fa-envelope me-2 text-warning"></i>
                vaghlaparth2005@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-2 text-warning"></i>
                +91 8735035021
              </p>
            </div>
          </div>

          <hr className=" border-secondary" />

          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 text-md-start text-center  mb-md-0">
              <p className="mb-0">
                Owned by:{" "}
                <strong className="text-warning text-decoration-none">
                  Noob Ninjas
                </strong>
              </p>
            </div>

            {/* Social Icons Modernized */}
            <div className="col-md-6 text-md-end text-center">
              <ul className="list-inline mb-0">
                {[
                  { icon: "facebook-f", link: "#" },
                  { icon: "x-twitter", link: "#" },
                  { icon: "linkedin-in", link: "#" },
                  { icon: "instagram", link: "#" },
                  { icon: "youtube", link: "#" },
                ].map((social, idx) => (
                  <li className="list-inline-item mx-1" key={idx}>
                    <a
                      href={social.link}
                      className="social-icon d-inline-flex align-items-center justify-content-center rounded-circle"
                      aria-label={social.icon}
                    >
                      <i className={`fab fa-${social.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Item;
