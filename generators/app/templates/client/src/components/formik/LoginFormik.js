import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';

import { login } from 'actions/auth';
import { flashSuccess, flashError } from 'actions/flashMessage';

import { getCookie, setCookie } from 'utils/cookies';

const errorStyles = {
  color: 'red',
  marginLeft: '7px',
  marginTop: '7px',
};

const renderField = (type, name, placeholder) => {
  return (
    <FieldWrapper>
      <Field type={type} name={name} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" style={errorStyles} />
    </FieldWrapper>
  );
};

const logUserIn = ({
  setLoading,
  setLoadingText,
  values,
  setFieldError,
  dispatch,
  router,
}) => {
  setLoading(true);
  setLoadingText('Logging in...');

  const { email, password, rememberMe } = values;
  if (typeof rememberMe !== 'undefined') {
    setCookie('rememberMe', rememberMe);
  }

  dispatch(login({ username: email, password, router }))
    .then(res => {
      console.log({ res });
      setLoading(false);
      setLoadingText('');
      dispatch(flashSuccess('Successfully logged in!'));
    })
    .catch(error => {
      setLoading(false);
      setLoadingText('');
      if (error.status === 401) {
        dispatch(
          flashError(`${error.message} -- Username and/or Password Incorrect.`),
        );
        setFieldError('server', 'Username and/or Password Incorrect.');
      }
    });
};

const LoginFormik = ({ dispatch, router, setLoading, setLoadingText }) => {
  const rememberMe = getCookie('rememberMe');
  const submitText = 'submitText';
  return (
    <FormikContainer>
      <Formik
        initialValues={{ email: '', password: '', rememberMe }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            values.email.includes('@') &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            // can be username, so check if @ symbol exists to validate email
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setTimeout(async () => {
            logUserIn({
              setLoading,
              setLoadingText,
              values,
              setFieldError,
              dispatch,
              router,
            });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          errors,
          values,
          touched,
          submitCount,
        }) => {
          const showError = submitCount > 0 || touched.checkbox;
          return (
            <Form>
              <Container>
                <InputsWrapper hasError={errors.server}>
                  {renderField('text', 'email', 'Username or Email')}
                  {renderField('password', 'password', 'Password')}
                </InputsWrapper>
                {errors.server && <ServerError>{errors.server}</ServerError>}
                <Controls>
                  <FieldWrapper>
                    <Field
                      visible
                      initialValue={values.rememberMe}
                      value={values.rememberMe}
                      style={{ justifyContent: 'center' }}
                      name="rememberMe"
                      width="25px" // discrepency with svg, flex, and too much text
                      fill="cornflowerblue"
                      label="Remember Me"
                      component={Checkbox}
                      // CustomLabel={() => 'Remember Me'}
                      onChange={checked => {
                        setFieldValue('rememberMe', checked);
                      }}
                    />
                    {showError && errors.checkbox && (
                      <ServerError
                        style={{ marginLeft: '7px', marginTop: '7px' }}
                      >
                        {errors.checkbox}
                      </ServerError>
                    )}
                  </FieldWrapper>
                  <BottomBtnWrapper>
                    <Button
                      style={{ width: '100%', borderRadius: '3px' }} // keep in sync
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {submitText || 'Submit'}
                    </Button>
                  </BottomBtnWrapper>
                </Controls>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </FormikContainer>
  );
};

LoginFormik.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  setLoading: PropTypes.func,
  setLoadingText: PropTypes.func,
};

const mapStateToProps = state => ({});
export default withRouter(connect(mapStateToProps)(LoginFormik));

const grow = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FormikContainer = styled.div`
  ${grow}
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
  > div {
    width: 100%;
  }
`;

const InputsWrapper = styled.div`
  border-left: 5px solid transparent;
  padding: 2px;
  transition: border-color 0.3s;
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: red;
    `}
`;

const ServerError = styled.div`
  margin-top: 10px;
  color: red;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:first-of-type) {
    margin-top: 15px;
  }
  input {
    font-size: 1rem;
    line-height: 1.5rem;
    /* margin-bottom: 5px; */
    padding-left: 0.4rem;

    &::placeholder {
      opacity: 0.4;
    }
  }
`;

const BottomBtnWrapper = styled.div`
  @media screen and (max-width: 599px) {
    margin-top: 15px;
  }
`;
