import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCategoryPosts } from '../utils/api';
import PostCard from '../components/PostCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

const Intro = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text};
`;

const LoadingText = styled.h4`
  text-align: center;
  padding: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Page 1 se start
  const [loading, setLoading] = useState(true);

  const categoryNames = {
    'ai-tools': 'AI Tools',
    'digital-marketing': 'Digital Marketing',
    'blogging': 'Blogging',
    'seo': 'SEO',
    'online-business': 'Online Business',
  };

  const loadPosts = async (isInitial = false) => {
    try {
      console.log('Fetching posts for slug:', slug);
      const data = await fetchCategoryPosts(slug);
      console.log('Fetched data:', data);
      const paginated = data.slice((page - 1) * 10, page * 10); // Page 1: 0-10, Page 2: 10-20
      console.log('Paginated posts:', paginated);
      
      if (isInitial) {
        setPosts(paginated); // Initial load ke liye direct set
      } else {
        setPosts((prev) => [...prev, ...paginated]); // Infinite scroll ke liye append
      }
      
      setPage((prevPage) => prevPage + 1);
      if (paginated.length < 10 || data.length <= posts.length + paginated.length) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered with slug:', slug);
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    loadPosts(true); // Initial load
  }, [slug]);

  return (
    <Container>
      <Intro>
        <SectionTitle>{categoryNames[slug]}</SectionTitle>
        <IntroText>Explore the best content related to {categoryNames[slug]} to grow your digital presence.</IntroText>
      </Intro>
      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : posts.length === 0 ? (
        <LoadingText>No posts found for this category.</LoadingText>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => loadPosts(false)} // Infinite scroll ke liye
          hasMore={hasMore}
          loader={<LoadingText>Loading more...</LoadingText>}
          endMessage={<p>No more posts</p>}
        >
          <PostGrid>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </PostGrid>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default CategoryPage;