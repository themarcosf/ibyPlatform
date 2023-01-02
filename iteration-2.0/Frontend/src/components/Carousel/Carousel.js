import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

import styles from './CarouselIndex.module.scss'
  
export default function CarouselIndex() {
  return (
    <div>
      <Carousel>
        <Carousel.Item className={styles.carrouselItem}>
          <img
            src="/carousel1.png"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item className={styles.carrouselItem}>
          <img
            src="/carousel2.png"
            alt="Image Two"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}