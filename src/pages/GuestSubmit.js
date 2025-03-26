import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPosts } from '../utils/api';
import PostCard from '../components/PostCard';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await getPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setHasMore(response.data.hasMore);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <HomeContainer>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<Loader>Loading...</Loader>}
        endMessage={<Loader>No more posts to load.</Loader>}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </InfiniteScroll>
    </HomeContainer>
  );
};

export default Home;