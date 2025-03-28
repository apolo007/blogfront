import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #34495e;
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #2980b9;
  margin-top: 30px;
`;

const AboutUs = () => {
  return (
    <Container>
      <Title>About Us - Grow With Digitals</Title>
      <Paragraph>
        Assalamu Alaikum! Welcome to <strong>Grow With Digitals</strong>, your go-to hub for mastering online
        success in 2025. I’m <strong>[Grow With Digitals]</strong>, the founder, and I’ve built this platform
        to share practical insights on <strong>AI Tools, Digital Marketing, Blogging, SEO, and Online
        Business</strong>. Our goal? To empower you with the knowledge and tools to turn your ideas
        into income.
      </Paragraph>
      <SubTitle>Our Mission</SubTitle>
      <Paragraph>
        We’re here to simplify the digital world, offering step-by-step guides and real-world advice
        from our own journey. Whether you’re starting a blog or scaling a business, Grow With Digitals is your
        partner in growth.
      </Paragraph>
    </Container>
  );
};

export default AboutUs;