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

const Careers = () => {
  return (
    <Container>
      <Title>Careers - Grow With Digitals</Title>
      <Paragraph>
        Passionate about digital success? Join the <strong>Grow With Digitals</strong> team! We’re always looking
        for writers, SEO experts, and marketers to grow with us.
      </Paragraph>
      <Paragraph>
        Send your resume to <Link href="mailto:careers@growwithdigitals.com">careers@growwithdigitals.com</Link>. No
        openings right now? We’ll keep your details for future roles!
      </Paragraph>
    </Container>
  );
};

export default Careers;