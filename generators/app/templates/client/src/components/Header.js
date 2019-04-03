import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from 'static/img/React.svg';

import { SettingsBurger, Cog } from 'components/icons/settings';
import IconButton from 'components/atoms/IconButton';

import { flashMessage, flashError } from 'actions/flashMessage';
import { logout } from 'actions/auth';
import { toggleMenu } from 'actions/display';

import { colors } from 'utils/theme';
import { setCookie } from 'utils/cookies';

import useResize from 'utils/hooks/useResize';

let type = '';
let renderFlashButtons = null;

// handles logout res action
const handleLogout = async ({ router, dispatch }) => {
  await dispatch(logout());
  await router.push('/login');
  dispatch(flashMessage('Successfully logged out!'));
};

const HeaderPropTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  router: PropTypes.object,
};

const renderLoginSignup = ({ user, router, dispatch }) => (
  <>
    <Button color="#000" type="button" onClick={evt => router.push('/login')}>
      Log In
    </Button>
    <Divider />
    <Button color="#000" type="button" onClick={evt => router.push('/signup')}>
      Sign Up
    </Button>
  </>
);

const renderDashboardHeader = ({ user, router, dispatch }) => {
  const { width } = useResize();
  return (
    <>
      {width < 700 ? (
        <IconButton
          SvgComponent={SettingsBurger}
          svgWidth="30px"
          svgFill={colors.Primary}
          svgHoverFill="grey"
          onClick={evt => dispatch(toggleMenu())}
        />
      ) : (
        <>
          <Text>
            <Link href="/dashboard">
              <a href="/dashboard">
                <Name>Welcome, {user.username}</Name>
              </a>
            </Link>
            <Divider />
            <Button
              type="button"
              onClick={evt => handleLogout({ router, dispatch })}
            >
              Log Out
            </Button>
          </Text>
          <Vertical />
          <IconButton
            SvgComponent={Cog}
            svgWidth="1.7rem"
            svgFill={colors.Primary}
            svgHoverFill="grey"
            onClick={evt => dispatch(toggleMenu())}
          />
        </>
      )}
    </>
  );
};

const Header = memo(({ user, dispatch, router }) => {
  const _props = { user, router, dispatch };
  return (
    <Container>
      <InnerWrapper>
        <Link href="/">
          <a href="/">
            <Image src={Logo} alt="Logo" />
          </a>
        </Link>
        {/* {renderFlashButtons(dispatch)} */}
        <Wrapper>
          {user ? renderDashboardHeader(_props) : renderLoginSignup(_props)}
        </Wrapper>
      </InnerWrapper>
    </Container>
  );
});

renderLoginSignup.propTypes = HeaderPropTypes;
renderDashboardHeader.propTypes = HeaderPropTypes;
Header.propTypes = HeaderPropTypes;

const mapStateToProps = ({ user }) => ({ user });
export default withRouter(connect(mapStateToProps)(Header));

const LOGO_WIDTH = '80px';

const Container = styled.header`
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.Primary}; */
  height: 80px;
  box-shadow: 0 0px 20px -8px rgba(0, 0, 0, 0.5);
  /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Image = styled.img`
  height: 45px;
  width: auto;
`;

const InnerWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (min-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  color: ${colors.Blue};
`;

const Vertical = styled.div`
  position: relative;
  width: 20px;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    content: '';
    background-color: ${({ theme }) => theme.colors.Primary};
    height: 100%;
    width: 0.5px;
  }
`;

// const LoginSignupWrapper = styled(Wrapper)``;
// const DashHeadWrapper = styled(Wrapper)``;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.Primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin: 0;
`;

const Name = styled.span`
  ${({ theme }) => theme.styles.ellipsisMask};
  max-width: calc(100vw - ${LOGO_WIDTH} - ${LOGO_WIDTH} - 20px);
`;

const Divider = styled.span`
  margin-left: 6px;
  margin-right: 6px;
  &::before {
    content: '/';
    color: ${({ theme }) => theme.colors.Primary};
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ color, theme }) => color || theme.colors.Primary};
  font-size: inherit;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  min-width: 55px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: grey;
  }
`;

renderFlashButtons = dispatch => (
  <form
    onSubmit={evt => {
      evt.preventDefault();
      const { value } = evt.target.elements[0];

      dispatch(flashMessage(value, type, { defaultLabel: true, top: true }));
    }}
  >
    <div>
      <input name="my-input" /> test me!
      <div>
        <button
          type="submit"
          onClick={evt => {
            type = 'success';
          }}
        >
          Success!
        </button>
        <button
          type="submit"
          onClick={evt => {
            type = 'error';
          }}
        >
          Error!
        </button>
        <button
          type="submit"
          onClick={evt => {
            type = 'warning';
          }}
        >
          Warning!
        </button>
        <button
          type="submit"
          onClick={evt => {
            type = 'general';
          }}
        >
          General!
        </button>
      </div>
    </div>
  </form>
);
