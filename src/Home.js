import React from "react";
import "./Home.css";
import Product from "./Product";
import useBoop from "use-boop";
import { animated } from "react-spring";
import { motion } from "framer-motion";
function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123456"
              title="the lean startup 44"
              price={29.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={5}
            />
          </motion.div>
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123455"
              title="the lean startup 3"
              price={39.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={1}
            />
          </motion.div>
        </div>
        <div className="home__row">
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123458"
              title="the lean startup 222"
              price={19.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={5}
            />
          </motion.div>
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123422"
              title="the lean startup 12"
              price={27.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={2}
            />
          </motion.div>
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123212"
              title="the lean startup 22"
              price={33.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={3}
            />
          </motion.div>
        </div>
        <div className="home__row">
          <motion.div
            className="home__motionDiv"
            whileHover={{
              scale: 1.01,
            }}
          >
            <Product
              id="123411"
              title="the lean startup 9"
              price={25.99}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg"
              rating={4}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
