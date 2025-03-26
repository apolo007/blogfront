import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: 1rem;
  padding: 5px 10px;
  transition: color 0.3s;
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const Navbar = () => {
  const categories = [
    { name: 'AI Tools', slug: 'ai-tools' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'Blogging', slug: 'blogging' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Online Business', slug: 'online-business' },
  ];

  return (
    <Nav>
      <Logo to="/">Grow With Digitals</Logo>
      <NavLinks>
        {categories.map((category) => (
          <StyledLink key={category.slug} to={`/category/${category.slug}`}>
            {category.name}
          </StyledLink>
        ))}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;