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

const Link = styled.a`
  color: #2980b9;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AdvertiseWithUs = () => {
  return (
    <Container>
      <Title>Advertise with Us - Grow With Digitals</Title>
      <Paragraph>
        Want to reach a growing audience of bloggers, entrepreneurs, and digital enthusiasts?
        <strong>Grow With Digitals</strong> offers advertising opportunities to showcase your brand.
      </Paragraph>
      <Paragraph>
        From sponsored posts to banner ads, we’ve got options to fit your goals. Email us at{' '}
        <Link href="mailto:ads@growwithdigitals.com">ads@growwithdigitals.com</Link> for rates and details.
      </Paragraph>
    </Container>
  );
};

export default AdvertiseWithUs;