import React from "react";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Product = (props) => {
  const [product, setProduct] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { query } = useRouter();

  React.useEffect(() => {
    (async () => {
      const products = await fetch(`/products.json`).then((res) => res.json());
      const product = products.find((product) => product.id == query.id);
      setProduct(product);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    "."
  ) : (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <div className="fullscreen">
        <div className="product">
          <motion.div
            className="img"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <motion.img
              key={product.image}
              src={product.image}
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 200, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
          <div className="product-details">
            <motion.div variants={stagger} className="inner">
              <Link href="/">
                <motion.div variants={fadeInUp}>
                  <a className="go-back">Back to products</a>
                </motion.div>
              </Link>
              <motion.div variants={fadeInUp}>
                <span className="category">Protein</span>
              </motion.div>
              <motion.h1 variants={fadeInUp}>{product.name}</motion.h1>
              <motion.p variants={fadeInUp}>{product.details}</motion.p>
              <motion.div variants={fadeInUp} className="additonals">
                <span>Soy Free</span>
                <span>Gluten Free</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="qty-price">
                <div className="qty">
                  <div className="minus">-</div>
                  <div className="amount">1</div>
                  <div className="add">+</div>
                </div>
                <span className="price">{product.price}</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="btn-row">
                <button className="add-to-cart"> Add to cart</button>
                <button className="subscribe"> Subscribe</button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Product;
