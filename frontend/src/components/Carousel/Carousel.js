import Carousel from "react-bootstrap/Carousel";
import { IoIosArrowDown } from "react-icons/io";
import { Link, animateScroll as scroll } from "react-scroll";

import styles from "./CarouselIndex.module.scss";
import "bootstrap/dist/css/bootstrap.css";

export default function CarouselIndex() {
  return (
    <div>
      <Carousel indicators={false}>
        <Carousel.Item className={styles.carrouselItem}>
          <img src="/carousel1.svg" alt="Image_One" />
        </Carousel.Item>
        <Carousel.Item className={styles.carrouselItem}>
          <img src="/carousel2.svg" alt="Image_Two" />
        </Carousel.Item>
        <Carousel.Item className={styles.carrouselItem}>
          <img src="/carousel3.svg" alt="Image_Three" />
        </Carousel.Item>
      </Carousel>
      <Link to="howStarted">
        <IoIosArrowDown className={styles.icon} />
      </Link>
    </div>
  );
}
