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

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  font-size: 1.1rem;
  color: #34495e;
`;

const Link = styled.a`
  color: #2980b9;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactUs = () => {
  return (
    <Container>
      <Title>Contact Us - Grow With Digitals</Title>
      <Paragraph>
        We’d love to hear from you! Whether it’s a question, feedback, or just a hello, reach out to
        the <strong>Grow With Digitals</strong> team anytime.
      </Paragraph>
      <List>
        <li><strong>Email</strong>: <Link href="mailto:[info@growwithdigitals.com]">[info@growwithdigitals.com]</Link></li>
        <li>
          <strong>Social Media</strong>: Follow us on{' '}
          <Link href="https://twitter.com/[your-handle]" target="_blank" rel="noopener noreferrer">
            [X/Twitter handle]
          </Link>
        </li>
        <li><strong>Feedback</strong>: Suggest topics for our next post!</li>
      </List>
      <Paragraph>We’ll respond within 24 hours—let’s make your online goals happen!</Paragraph>
    </Container>
  );
};

export default ContactUs;