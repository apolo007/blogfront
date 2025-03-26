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

const Content = styled.div`
  margin: 20px 0;
`;

const Img = styled.img`
  max-width: 100%;
  loading: lazy; /* Lazy load */
`;

const Ad = styled.div`
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
  margin: 20px 0;
`;

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(slug);
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
      <h1>{post.title}</h1>
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