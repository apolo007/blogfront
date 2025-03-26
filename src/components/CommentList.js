import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  margin: 20px 0;
`;

const Comment = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const CommentList = ({ comments }) => (
  <List>
    <h3>Comments</h3>
    {comments.length === 0 ? (
      <p>No comments yet.</p>
    ) : (
      comments.map((comment) => (
        <Comment key={comment._id}>
          <strong>{comment.name}</strong> <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          <p>{comment.comment}</p>
        </Comment>
      ))
    )}
  </List>
);

export default CommentList;