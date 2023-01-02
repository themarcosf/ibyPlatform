import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
  
export default function CarouselIndex() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            src="/carousel1.png"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/carousel2.png"
            alt="Image Two"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}