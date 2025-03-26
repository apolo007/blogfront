import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts } from '../utils/api';
import Slider from '../components/Slider';
import PostCard from '../components/PostCard';
import Newsletter from '../components/Newsletter';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: ${(props) => props.theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-top: 25px;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Sidebar = styled.aside`
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 700;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      const paginated = data.slice((page - 1) * 10, page * 10);
      setPosts((prev) => [...prev, ...paginated]);
      setPage(page + 1);
      if (paginated.length < 10) setHasMore(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const randomPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 5);
  const popularPosts = [...posts].sort((a, b) => b.views + b.likes - (a.views + a.likes)).slice(0, 5);

  return (
    <Container>
      <Slider posts={posts.slice(0, 5)} />
      <Grid>
        <div>
          <SectionTitle>Latest Posts</SectionTitle>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadPosts}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: 'center', padding: '20px', color: '#2c5282' }}>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center', padding: '20px', color: '#2c5282' }}>No more posts.</p>}
          >
            <PostGrid>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </PostGrid>
          </InfiniteScroll>
        </div>
        <Sidebar>
          <SectionTitle>Random Posts</SectionTitle>
          {randomPosts.map((post) => (
            <PostCard key={post._id} post={post} compact />
          ))}
          <SectionTitle>Popular Posts</SectionTitle>
          {popularPosts.map((post) => (
            <PostCard key={post._id} post={post} compact />
          ))}
          <Newsletter />
        </Sidebar>
      </Grid>
    </Container>
  );
};

export default Home;