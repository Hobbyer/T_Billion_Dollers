import React from 'react'
import { Carousel } from 'react-bootstrap';
import WebItemList from '../../WebItemList';

const HomeBody = () => {
  const bannerImages = [
      "/imgs/banner5.jpg",
      "/imgs/banner4.jpg",
      "/imgs/banner1.jpg",
      "/imgs/banner2.jpg",
      "/imgs/banner3.jpg",
    ];
  return (
    <>
     <div className="image-container mb-5 mt-4" width="100%">
        <Carousel data-bs-theme="dark">
          {bannerImages.map((image, i) => {
            return (
              <Carousel.Item key={i}>
                <img className="d-block w-100" src={image} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div>
        <WebItemList />
      </div>
    </>
  )
}

export default HomeBody