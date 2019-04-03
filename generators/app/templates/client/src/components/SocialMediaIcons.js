import React, { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SocialMediaIcons = memo(({ links }) => {
  return (
    <SocialMediaLinks>
      {links &&
        links.map(({ Platform, Url }) => (
          <Link key={Platform} href={Url} passHref>
            <a>
              <SocialMediaIcon className={`fa fa-${Platform.toLowerCase()}`} />
            </a>
          </Link>
        ))}
    </SocialMediaLinks>
  );
});

SocialMediaIcons.propTypes = {
  links: PropTypes.array.isRequired,
};

export default SocialMediaIcons;

const SocialMediaLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    line-height: 0;
  }
`;

const SocialMediaIcon = styled.i`
  cursor: pointer;
  font-size: 0.8rem;
  margin: auto 5px;
  transition: color 0.3s;
  color: white;

  &:hover {
    color: lightgrey;
  }
`;
