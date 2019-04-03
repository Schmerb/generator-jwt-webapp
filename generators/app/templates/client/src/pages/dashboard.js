import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import styled from 'styled-components';

//
// FadeIn HOC allows this to mount before app has loaded
//
const Dashboard = ({ user, router, status }) => {
  if (status.loaded && !user) {
    router.push('/login');
  }
  return (
    <Container>
      <h2>Dashboard!!!!!</h2>
    </Container>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
  status: PropTypes.object,
};
const mapStateToProps = ({ user, status }) => ({ user, status });
export default withRouter(connect(mapStateToProps)(Dashboard));

const Container = styled.div`
  ${({ theme }) => theme.styles.grow};
  justify-content: center;
  align-items: center;
  /* background-color: rebeccapurple; */
  color: #fff;
  min-height: 400px;
`;
