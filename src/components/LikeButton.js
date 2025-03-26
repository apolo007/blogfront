import React, { useState } from 'react';
import styled from 'styled-components';
import { likePost } from '../utils/api';

const Button = styled.button`
  padding: 5px 10px;
  background: ${(props) => (props.liked ? props.theme.colors.primary : '#ccc')};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const LikeButton = ({ slug, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(slug);
      setLikes(updatedPost.likes);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleLike} liked={liked} disabled={liked}>
      Like ({likes})
    </Button>
  );
};

export default LikeButton;