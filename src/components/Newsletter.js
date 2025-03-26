import React, { useState } from 'react';
import styled from 'styled-components';
import { subscribeNewsletter } from '../utils/api';

const NewsletterSection = styled.div`
  margin-top: 25px;
  padding: 20px;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  width: 220px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  font-size: 0.95rem;
  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
      setMessage('Successfully subscribed!');
      setEmail('');
    } catch (err) {
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <NewsletterSection>
      <Title>Subscribe Now</Title>
      <Description>Get the latest updates directly in your inbox.</Description>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <Button type="submit">Join</Button>
      </Form>
      {message && <p style={{ marginTop: '10px', color: '#4a5568' }}>{message}</p>}
    </NewsletterSection>
  );
};

export default Newsletter;