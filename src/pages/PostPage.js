import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { fetchPost, fetchPostComments } from '../utils/api';
import ProgressBar from '../components/ProgressBar';
import LikeButton from '../components/LikeButton';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import RelatedPosts from '../components/RelatedPosts';
import Breadcrumbs from '../components/Breadcrumbs';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin: 20px 0;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${(props) => props.theme.colors.text};

  img {
    display: none; /* Hide any images in content */
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  h2, h3 {
    margin: 2rem 0 1rem;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  loading: lazy;
`;

const Ad = styled.div`
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
  margin: 20px 0;
  border-radius: 4px;
`;

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(slug);
        console.log('Post data:', postData); // Debug log
        setPost(postData);
        const commentData = await fetchPostComments(postData._id);
        setComments(commentData);
      } catch (err) {
        console.error(err);
      }
    };
    loadPost();
  }, [slug]);

  const handleCommentAdded = async () => {
    const updatedComments = await fetchPostComments(post._id);
    setComments(updatedComments);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Helmet>
        <title>{post.title} | Grow With Digitals</title>
        <meta name="description" content={post.content.substring(0, 150)} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.createdAt,
            author: 'Grow With Digitals',
            image: post.imageUrl || '',
          })}
        </script>
      </Helmet>
      <ProgressBar />
      <Breadcrumbs post={post} />
      <Title>{post.title}</Title>
      {post.imageUrl && <Img src={post.imageUrl} alt={post.title} />}
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      <LikeButton slug={post.slug} initialLikes={post.likes} />
      <Ad>Ad Space (Free/Paid Ads Here)</Ad>
      <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />
      <CommentList comments={comments} />
      <RelatedPosts currentPost={post} />
    </Container>
  );
};

export default PostPage;