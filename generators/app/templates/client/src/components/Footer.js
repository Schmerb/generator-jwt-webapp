import React, { memo } from 'react';
import styled from 'styled-components';
import SocialMediaIcons from './SocialMediaIcons';

// // TODO: Will these be fetched dynamically?
const links = [
  { Platform: 'Facebook', Url: 'www.facebook.com' },
  { Platform: 'Twitter', Url: 'www.twitter.com' },
  { Platform: 'Google', Url: 'www.google.com' },
  { Platform: 'LinkedIn', Url: 'www.linkedin.com' },
  { Platform: 'Instagram', Url: 'www.instagram.com' },
];

const Footer = memo(() => (
  <Container>
    <InnerWrapper>
      <p style={{ color: 'lightgrey' }}>
        Copyright &copy; The Virtual Forge 2019
      </p>
      <SocialMediaIcons links={links} />
    </InnerWrapper>
  </Container>
));

export default Footer;

const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.Primary};
  background-color: #fff;
  color: #fff;
  height: 80px;
  box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0px 20px -8px rgba(0, 0, 0, 0.5);
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;

  @media screen and (min-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;
