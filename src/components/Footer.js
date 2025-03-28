import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import Subscribe from "./Subscribe";

const FooterWrapper = styled.footer`
  background: #333;
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  border-top: 4px solid ${(props) => props.theme.colors.primary};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @media (max-width: 480px) {
    gap: 1rem;
    justify-content: center;
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <Links>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/privacy">Privacy Policy</NavLink>
        </Links>
        {/* <Subscribe /> */}
      </FooterContent>
      <Copyright>© 2025 Grow With Digitals. All rights reserved.</Copyright>
    </FooterWrapper>
  );
}

export default Footer;