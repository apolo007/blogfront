import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${(props) => (props.compact ? '120px' : '200px')};
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: ${(props) => (props.compact ? '12px' : '20px')};
`;

const CardTitle = styled.h3`
  font-size: ${(props) => (props.compact ? '1.1rem' : '1.4rem')};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

const CardExcerpt = styled.p`
  font-size: ${(props) => (props.compact ? '0.9rem' : '1rem')};
  color: #4a5568; /* Gray for readability */
  margin-bottom: 12px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  font-size: 0.95rem;
  &:hover {
    text-decoration: underline;
  }
`;

const PostCard = ({ post, compact = false }) => (
  <Card compact={compact}>
    {post.imageUrl && <CardImage src={post.imageUrl} alt={post.title} compact={compact} />}
    <CardContent compact={compact}>
      <CardTitle compact={compact}>{post.title}</CardTitle>
      <CardExcerpt compact={compact}>{post.content.substring(0, compact ? 60 : 100)}...</CardExcerpt>
      <CardLink to={`/post/${post.slug}`}>Read More</CardLink>
    </CardContent>
  </Card>
);

export default PostCard;