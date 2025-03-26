import React, { useState } from 'react';
import styled from 'styled-components';
import { createComment } from '../utils/api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const CommentForm = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, name, email, comment });
      setMessage('Comment submitted for approval!');
      setName('');
      setEmail('');
      setComment('');
      onCommentAdded();
    } catch (err) {
      setMessage('Failed to submit comment.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Post a Comment</h3>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your comment"
        required
      />
      <Button type="submit">Submit</Button>
      {message && <p>{message}</p>}
    </Form>
  );
};

export default CommentForm;