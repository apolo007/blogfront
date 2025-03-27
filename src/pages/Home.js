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
  padding: 24px;
  background: ${(props) => props.theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-top: 32px;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 16px;
  font-weight: 700;
`;

const LoaderText = styled.h4`
  text-align: center;
  padding: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // Store all fetched posts once
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    if (page === 1) {
      // Fetch data only once on first load
      fetchPosts()
        .then((data) => {
          console.log('Fetched data:', data);
          setAllPosts(data); // Store all posts
          const paginated = data.slice(0, 10); // First 10 posts
          console.log('Paginated posts (Page 1):', paginated);
          setPosts(paginated);
          setPage(2);
          setLoading(false);
          setHasMore(data.length > 10); // Check if more posts exist
        })
        .catch((err) => {
          console.error('Error fetching posts:', err);
          setLoading(false);
        });
    } else {
      // Load next page from allPosts
      const startIndex = (page - 1) * 10;
      const paginated = allPosts.slice(startIndex, startIndex + 10);
      console.log(`Paginated posts (Page ${page}):`, paginated);
      setPosts((prev) => [...prev, ...paginated]);
      setPage(page + 1);
      if (startIndex + paginated.length >= allPosts.length) {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    setPosts([]);
    setAllPosts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    loadPosts();
  }, []);

  const getRandomPosts = () => {
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(5, shuffled.length));
  };

  const getPopularPosts = () => {
    const sorted = [...allPosts].sort((a, b) => b.views + b.likes - (a.views + a.likes));
    return sorted.slice(0, Math.min(5, sorted.length));
  };

  const randomPosts = getRandomPosts();
  const popularPosts = getPopularPosts();

  return (
    <Container>
      {loading && posts.length === 0 ? (
        <LoaderText>Loading...</LoaderText>
      ) : (
        <>
          <Slider posts={allPosts.slice(0, 5)} />
          <Grid>
            <div>
              <SectionTitle>Latest Posts</SectionTitle>
              <InfiniteScroll
                dataLength={posts.length}
                next={loadPosts}
                hasMore={hasMore}
                loader={<LoaderText>Loading more...</LoaderText>}
                endMessage={<LoaderText>No more posts.</LoaderText>}
              >
                <PostGrid>
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </PostGrid>
              </InfiniteScroll>
            </div>
            <Sidebar>
              <div>
                <SectionTitle>Random Posts</SectionTitle>
                {randomPosts.map((post) => (
                  <PostCard key={post._id} post={post} compact />
                ))}
              </div>
              <div>
                <SectionTitle>Popular Posts</SectionTitle>
                {popularPosts.map((post) => (
                  <PostCard key={post._id} post={post} compact />
                ))}
              </div>
              <Newsletter />
            </Sidebar>
          </Grid>
          {allPosts.length > 0 && (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Showing {posts.length} of {allPosts.length} posts
            </p>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;