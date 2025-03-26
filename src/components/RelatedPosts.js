import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPosts } from '../utils/api';
import PostCard from './PostCard';

const Section = styled.div`
  margin: 20px 0;
`;

const RelatedPosts = ({ currentPost }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      const posts = await fetchPosts();
      const filtered = posts
        .filter((post) => post.category === currentPost.category && post._id !== currentPost._id)
        .slice(0, 3); // 3 related posts
      setRelatedPosts(filtered);
    };
    loadRelatedPosts();
  }, [currentPost]);

  return (
    <Section>
      <h3>You May Like These Posts</h3>
      {relatedPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Section>
  );
};

export default RelatedPosts;