import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Subscribe from "./Subscribe";

const FooterWrapper = styled.footer`
  background: #333;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Links = styled.div`
  margin-bottom: 1rem;
  a {
    color: white;
    margin: 0 1rem;
    text-decoration: none;
    &:hover {
      color: #ddd;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Links>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/privacy">Privacy Policy</NavLink>
      </Links>
      <Subscribe />
      <p>&copy; 2025 SaaSifySuccess. All rights reserved.</p>
    </FooterWrapper>
  );
}

export default Footer;