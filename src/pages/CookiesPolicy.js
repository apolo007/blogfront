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

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #2980b9;
  margin-top: 30px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #34495e;
`;

const CookiesPolicy = () => {
  return (
    <Container>
      <Title>Cookies Policy - Grow With Digitals</Title>
      <Paragraph><em>Last Updated: March 27, 2025</em></Paragraph>
      <Paragraph>
        <strong>Grow With Digitals</strong> uses cookies to enhance your browsing experience.
      </Paragraph>
      <SubTitle>What Are Cookies?</SubTitle>
      <Paragraph>
        Cookies are small files stored on your device to track usage and preferences.
      </Paragraph>
      <SubTitle>How We Use Them</SubTitle>
      <Paragraph>
        We use cookies for analytics, ads, and site functionality. You can disable them in your browser,
        but some features may not work.
      </Paragraph>
    </Container>
  );
};

export default CookiesPolicy;