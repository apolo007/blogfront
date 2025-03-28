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

const TermsAndConditions = () => {
  return (
    <Container>
      <Title>Terms and Conditions - Grow With Digitals</Title>
      <Paragraph><em>Last Updated: March 27, 2025</em></Paragraph>
      <Paragraph>
        Welcome to <strong>Grow With Digitals</strong>! By using our site, you agree to these Terms and Conditions.
        Please read them carefully.
      </Paragraph>
      <SubTitle>Use of Content</SubTitle>
      <Paragraph>
        All content on <strong>Grow With Digitals</strong> is for informational purposes only. You may not reproduce
        or sell it without permission.
      </Paragraph>
      <SubTitle>Affiliate Links</SubTitle>
      <Paragraph>
        We may earn commissions from affiliate links. This doesn’t affect our advice—it’s how we keep
        the site running!
      </Paragraph>
      <SubTitle>Changes</SubTitle>
      <Paragraph>We reserve the right to update these terms anytime. Check back for the latest version.</Paragraph>
    </Container>
  );
};

export default TermsAndConditions;