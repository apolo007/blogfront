import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin: 10px 0;
`;

const Breadcrumb = styled.span`
  margin-right: 5px;
`;

const Breadcrumbs = ({ post }) => {
  const { slug } = useParams();

  return (
    <Nav>
      <Breadcrumb><Link to="/">Home</Link></Breadcrumb> &gt;
      <Breadcrumb><Link to={`/category/${post.category.toLowerCase().replace(/ /g, '-')}`}>{post.category}</Link></Breadcrumb> &gt;
      <Breadcrumb>{post.title}</Breadcrumb>
    </Nav>
  );
};

export default Breadcrumbs;