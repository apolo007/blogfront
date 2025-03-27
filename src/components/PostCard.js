import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: ${(props) => (props.compact ? '280px' : '320px')}; /* Compact ke liye smaller */
  margin: 0 auto;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${(props) => (props.compact ? '120px' : '160px')}; /* Compact: 120px, Normal: 160px */
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: ${(props) => (props.compact ? '12px' : '16px')};
`;

const CardTitle = styled.h3`
  font-size: ${(props) => (props.compact ? '1.1rem' : '1.25rem')};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardExcerpt = styled.p`
  font-size: ${(props) => (props.compact ? '0.9rem' : '0.95rem')};
  color: #6b7280;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.compact ? 2 : 3)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  padding: 4px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const PostCard = ({ post, compact = false }) => (
  <Card compact={compact}>
    {post.imageUrl && <CardImage src={post.imageUrl} alt={post.title} compact={compact} />}
    <CardContent compact={compact}>
      <CardTitle compact={compact}>{post.title}</CardTitle>
      <CardExcerpt
        compact={compact}
        dangerouslySetInnerHTML={{ __html: post.content.substring(0, compact ? 100 : 150) + '...' }}
      />
      <CardLink to={`/post/${post.slug}`}>Read More</CardLink>
    </CardContent>
  </Card>
);

export default PostCard;