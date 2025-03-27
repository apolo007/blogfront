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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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
      if (isInitial) {
        console.log('Fetching posts for slug:', slug);
        const data = await fetchCategoryPosts(slug);
        console.log('Fetched data:', data);
        setAllPosts(data);
        const paginated = data.slice(0, 10);
        console.log('Paginated posts (Page 1):', paginated);
        setPosts(paginated);
        setPage(2);
        setHasMore(data.length > 10);
      } else {
        const startIndex = (page - 1) * 10;
        const paginated = allPosts.slice(startIndex, startIndex + 10);
        console.log(`Paginated posts (Page ${page}):`, paginated);
        setPosts((prev) => [...prev, ...paginated]);
        setPage(page + 1);
        if (startIndex + paginated.length >= allPosts.length) {
          setHasMore(false);
        }
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
    setAllPosts([]);
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
      {loading && posts.length === 0 ? (
        <LoadingText>Loading...</LoadingText>
      ) : posts.length === 0 ? (
        <LoadingText>No posts found for this category.</LoadingText>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => loadPosts(false)} // Scroll load
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
      {allPosts.length > 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Showing {posts.length} of {allPosts.length} posts
        </p>
      )}
    </Container>
  );
};

export default CategoryPage;