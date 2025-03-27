import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 12px; /* Slightly larger radius for modern look */
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%; /* Full width within grid */
  max-width: 320px; /* Fixed max-width for consistency */
  margin: 0 auto; /* Center in grid cell */
  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px; /* Fixed height for homepage */
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: 16px; /* Consistent padding */
`;

const CardTitle = styled.h3`
  font-size: 1.25rem; /* Slightly larger for readability */
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardExcerpt = styled.p`
  font-size: 0.95rem; /* Slightly smaller for balance */
  color: #6b7280; /* Softer gray for contrast */
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
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

const PostCard = ({ post }) => (
  <Card>
    {post.imageUrl && <CardImage src={post.imageUrl} alt={post.title} />}
    <CardContent>
      <CardTitle>{post.title}</CardTitle>
      <CardExcerpt dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
      <CardLink to={`/post/${post.slug}`}>Read More</CardLink>
    </CardContent>
  </Card>
);

export default PostCard;