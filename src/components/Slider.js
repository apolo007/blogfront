import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = styled.div`
  height: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 15px 25px;
  border-radius: 5px;
`;

const SlideTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const SlideExcerpt = styled.p`
  font-size: 0.95rem;
  opacity: 0.95;
`;

const SliderComponent = ({ posts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {posts.map((post) => (
        <Slide key={post._id}>
          {post.imageUrl && <SlideImage src={post.imageUrl} alt={post.title} />}
          <SlideContent>
            <SlideTitle>{post.title}</SlideTitle>
            <SlideExcerpt>{post.content.substring(0, 70)}...</SlideExcerpt>
          </SlideContent>
        </Slide>
      ))}
    </Slider>
  );
};

export default SliderComponent;