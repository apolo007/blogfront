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

const ContactExperts = () => {
  return (
    <Container>
      <Title>Contact Future's Experts - Grow With Digitals</Title>
      <Paragraph>
        Need personalized advice for your online journey? Our team of experts at <strong>Grow With Digitals</strong> is
        here to help! From SEO strategies to AI tool setups, we offer one-on-one consultations to future-proof
        your success in 2025 and beyond.
      </Paragraph>
      <Paragraph>
        Reach out at <Link href="mailto:experts@growwithdigitals.com">experts@growwithdigitals.com</Link> with your questions
        or project details. Let’s build your digital future together!
      </Paragraph>
    </Container>
  );
};

export default ContactExperts;