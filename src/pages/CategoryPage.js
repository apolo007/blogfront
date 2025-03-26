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

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const categoryNames = {
    'ai-tools': 'AI Tools',
    'digital-marketing': 'Digital Marketing',
    'blogging': 'Blogging',
    'seo': 'SEO',
    'online-business': 'Online Business',
  };

  const loadPosts = async () => {
    try {
      const data = await fetchCategoryPosts(categoryNames[slug]);
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
  }, [slug]);

  return (
    <Container>
      <Intro>
        <h1>{categoryNames[slug]}</h1>
        <p>Explore the best content related to {categoryNames[slug]} to grow your digital presence.</p>
      </Intro>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default CategoryPage;