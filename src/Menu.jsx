import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Menu.css";
import axios from "axios";

// 🔹 Static Product List
const products = [
  {
    id: 23,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/105468.jpg",
    title: "Cold Drink",
    per: "Our signature rich in flavour espresso blended with delicate...",
    price: 299,
  },
  {
    id: 24,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/101729.png",
    title: "Smoked Chicken",
    per: "A hearty Smoked Chicken & Salami Sandwich with tender smoked...",
    price: 399,
  },
  {
    id: 25,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100433.jpg",
    title: "Cold Coffee",
    per: "Captivating, cosy, coffee. Gift your loved ones this Starbucks Gift Card.",
    price: 278,
  },
  {
    id: 26,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/114059.jpg",
    title: "Kosha Mangsho Wrap",
    per: "A traditional mutton preparation packed in a parantha...",
    price: 367,
  },
  {
    id: 27,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103515.jpg",
    title: "Double Frappuccino",
    per: "Rich mocha-flavored sauce meets up with chocolaty chips, mil...",
    price: 420,
  },
  {
    id: 28,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100100_1.png",
    title: "Chicken Sandwich",
    per: "Marinated tandoori paneer filling, sliced cheese, and whole...",
    price: 283,
  },
  {
    id: 29,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115751_1.png",
    title: "Cookie Creme Latte",
    per: "Handcrafted espresso from the world's top 3% Arabica with st...",
    price: 430,
  },
  {
    id: 30,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115838.png",
    title: "Tandoori Paneer Sandwich",
    per: "A fusion of tandoori paneer in a deliciously grilled sourdou...",
    price: 446,
  },
  {
    id: 31,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115986.png",
    title: "Classic Hot Coffee",
    per: "Savour our premium coffee made with top 3% Arabica beans in ...",
    price: 157,
  },
  {
    id: 32,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100075.jpg",
    title: "Blueberry Muffin",
    per: "Buttery vanilla cake with berries dusted with granulated sug...",
    price: 330,
  },
  {
    id: 33,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103973.jpg",
    title: "Flat White",
    per: "Expertly steamed milk poured over shots of ristretto and fin...",
    price: 330,
  },
  {
    id: 34,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103689.jpg",
    title: "Banana Chocolate Loaf Cake",
    per: "English tea cake with rich taste of banana and chocolate...",
    price: 351,
  },
];

const Item = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [error] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 🔍 Filter Products by Search Query
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

  // 🛒 Add to Cart Function
  const addToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }
    try {
      await axios.post(
        "https://server-0o7h.onrender.com/add-to-cart",
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
      alert("Error adding item to cart.");
    }
  };

  // 🌀 Loading Spinner
  if (loading && products.length === 0) {
    return (
      <div className="Herosection_1">
        <div className="container text-center py-5">
          <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // ❌ Error Display
  if (error) {
    return (
      <div className="Herosection_1">
        <div className="container">
          <div className="alert alert-danger text-center">❌ {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Toast Popup */}
      {showToast && (
        <div className="toast-popup bg-success text-white">
          🛒 {toastMessage}
        </div>
      )}

      {/* ✅ Product Section */}
      <div className="Herosection_1">
        <div className="container">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center my-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div
              className="alert alert-danger text-center mt-3 fw-bold align-items-center"
              style={{
                width: "18%",
                backgroundColor: "#e7414c",
                margin: "20px auto",
              }}
            >
              ❌ No products found.
            </div>
          ) : (
            <div id="products3" className="d-flex flex-wrap justify-content-center gap-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="box2 shadow-sm">
                  <div className="img-box1">
                    <img
                      className="images1"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="bottom text-center">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="small text-muted">{item.per}</p>
                    <h4 className="text-success fw-bold">₹{item.price}.00</h4>
                    <button
                      className="btn4 mt-2"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-dark text-white pt-5 pb-3 fw-medium shadow-lg mt-3">
        <div className="container">
          <div className="row justify-content-start">
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
                vaghelaparth2005@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-2 text-warning"></i> +91 8735035021
              </p>
            </div>
          </div>

          <hr className="border-secondary" />

          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 text-md-start text-center mb-md-0">
              <p className="mb-0">
                Owned by:{" "}
                <strong className="text-warning text-decoration-none">
                  Noob Ninjas
                </strong>
              </p>
            </div>

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
