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

import { createUser } from 'utils/http/user';
import useClearTimeout from 'utils/hooks/useClearTimeout';

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

const signUserUp = ({
  values,
  dispatch,
  router,
  doneLoading,
  setFieldError,
}) => {
  const user = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    // falls back to email if no username supplied
    username: values.username || values.email,
  };

  createUser(user)
    .then(res => {
      doneLoading();
      if (res && 'id' in res) {
        // complete login
        const loginUserObject = {
          username: res.username,
          password: values.password,
          redirect: false,
        };
        dispatch(login(loginUserObject))
          .then(async isSuccess => {
            doneLoading();
            if (isSuccess) {
              await router.push('/dashboard');
              dispatch(flashSuccess('Successfully created new user!'));
            }
          })
          .catch(error => {
            doneLoading();
            dispatch(
              flashError('Something went wrong trying to log new user in.'),
            );
          });
      }
    })
    .catch(err => {
      doneLoading();
      // eslint-disable-next-line
      console.log({ err });
      setFieldError(err.location, err.message);
      dispatch(flashError(err.message));
    });
};

const SignupFormik = ({
  dispatch,
  router,
  setLoading,
  setLoadingText,
  doneLoading,
}) => {
  const submitText = 'submitText';
  let timeoutSubmit;
  useClearTimeout(timeoutSubmit);
  return (
    <FormikContainer>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          rePassword: '',
          checkbox: false,
        }}
        validate={values => {
          let errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          } else if (!values.lastName) {
            errors.lastName = 'Required';
          } else if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be a minimum of 9 characters.';
          } else if (!values.rePassword) {
            errors.rePassword = 'Required';
          } else if (values.password !== values.rePassword) {
            errors.rePassword = 'Passwords must match.';
          } else if (!values.checkbox) {
            errors.checkbox = 'Must agree to terms and conditions.';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setLoading(true);
          setLoadingText('Signing up...');
          timeoutSubmit = setTimeout(() => {
            signUserUp({
              doneLoading,
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
                  {renderField('text', 'firstName', 'First Name')}
                  {renderField('text', 'lastName', 'Last Name')}
                  {renderField('email', 'email', 'Email')}
                  {renderField(
                    'text',
                    'username',
                    'Username (optional - defaults to email)',
                  )}
                  {renderField('password', 'password', 'Password')}
                  {renderField('password', 'rePassword', 'Re-enter Password')}
                </InputsWrapper>
                {errors.server && <ServerError>{errors.server}</ServerError>}
                <Controls>
                  <FieldWrapper>
                    <Field
                      visible
                      initialValue={values.checkbox}
                      value={values.checkbox}
                      style={{ justifyContent: 'center' }}
                      name="checkbox"
                      width="25px" // discrepency with svg, flex, and too much text
                      fill="cornflowerblue"
                      label="Label"
                      component={Checkbox}
                      renderLabel={() => (
                        <span>
                          I agree to <a href="#!">Terms</a> &
                          <a href="#!">Conditions</a>
                        </span>
                      )}
                      onChange={checked => {
                        setFieldValue('checkbox', checked);
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

SignupFormik.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  doneLoading: PropTypes.func,
  setLoading: PropTypes.func,
  setLoadingText: PropTypes.func,
};

const mapStateToProps = state => ({});
export default withRouter(connect(mapStateToProps)(SignupFormik));

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
      border-color: 'red';
    `}
`;

const ServerError = styled.div`
  color: 'red';
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
