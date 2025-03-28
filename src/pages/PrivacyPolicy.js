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

const Link = styled.a`
  color: #2980b9;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Title>Privacy Policy - Grow With Digitals</Title>
      <Paragraph><em>Last Updated: March 27, 2025</em></Paragraph>
      <Paragraph>
        At <strong>Grow With Digitals</strong>, we respect your privacy. This policy explains how we handle your
        data at <Link href="https://growwithdigitals.com">https://growwithdigitals.com</Link>.
      </Paragraph>
      <SubTitle>Information We Collect</SubTitle>
      <Paragraph>
        We may collect your name/email if you contact us, plus analytics data (e.g., Google Analytics)
        and cookies for a better experience.
      </Paragraph>
      <SubTitle>Contact</SubTitle>
      <Paragraph>
        Questions? Email us at <Link href="mailto:[info@growwithdigitals.com]">[info@growwithdigitals.com]</Link>.
      </Paragraph>
    </Container>
  );
};

export default PrivacyPolicy;