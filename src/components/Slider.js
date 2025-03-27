import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { stripHtml } from '../utils/helpers'; // Import utility

const Slide = styled.div`
  height: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  outline: none; /* Remove focus outline */
`;

const SlideLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6); /* Slightly darker overlay */
  padding: 12px 24px; /* Larger padding for balance */
  border-radius: 5px;
  max-width: 80%; /* Prevent overflow */
`;

const SlideTitle = styled.h2`
  font-size: 1.75rem; /* Slightly larger */
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SlideExcerpt = styled.p`
  font-size: 1rem; /* Slightly larger for readability */
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
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
    fade: true,
  };

  return (
    <Slider {...settings}>
      {posts.map((post) => (
        <Slide key={post._id}>
          <SlideLink to={`/post/${post.slug}`}>
            {post.imageUrl && <SlideImage src={post.imageUrl} alt={post.title} />}
            <SlideContent>
              <SlideTitle>{post.title}</SlideTitle>
              <SlideExcerpt>{stripHtml(post.content).substring(0, 80)}...</SlideExcerpt>
            </SlideContent>
          </SlideLink>
        </Slide>
      ))}
    </Slider>
  );
};

export default SliderComponent;