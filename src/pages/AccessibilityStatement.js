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

const AccessibilityStatement = () => {
  return (
    <Container>
      <Title>Accessibility Statement - Grow With Digitals</Title>
      <Paragraph>
        <strong>Grow With Digitals</strong> is committed to making our site accessible to everyone. We aim to
        follow WCAG 2.1 guidelines for readability and navigation.
      </Paragraph>
      <Paragraph>
        Facing issues? Let us know at <Link href="mailto:support@growwithdigitals.com">support@growwithdigitals.com</Link>,
        and we’ll fix it fast!
      </Paragraph>
    </Container>
  );
};

export default AccessibilityStatement;