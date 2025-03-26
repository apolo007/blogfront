import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../utils/api';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      navigate('/admin');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <Container>
      <h2>Admin Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default AdminLogin;