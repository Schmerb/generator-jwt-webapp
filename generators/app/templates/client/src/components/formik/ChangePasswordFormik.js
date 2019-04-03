import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from 'components/atoms/Button';

import { flashSuccess, flashError } from 'actions/flashMessage';
import { updateUser } from 'actions/user';

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

const ChangePasswordFormik = ({
  dispatch,
  router,
  onRequestClose,
  bindResetForm,
  setLoading,
  setLoadingText,
  doneLoading,
}) => {
  const submitText = 'submitText';
  let timeoutSubmit;
  useClearTimeout(timeoutSubmit);
  let timeoutReset;
  useClearTimeout(timeoutReset);
  return (
    <FormikContainer>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          rePassword: '',
          checkbox: false,
        }}
        validate={values => {
          let errors = {};
          if (!values.password) {
            errors.password = 'Required';
          } else if (!values.newPassword) {
            errors.newPassword = 'Required';
          } else if (values.newPassword.length < 10) {
            errors.newPassword = 'Password must be a minimum of 10 characters.';
          } else if (!values.rePassword) {
            errors.rePassword = 'Required';
          } else if (values.newPassword !== values.rePassword) {
            errors.rePassword = 'Passwords must match.';
          }

          return errors;
        }}
        onSubmit={(
          values,
          { setSubmitting, setFieldValue, setFieldError, resetForm },
        ) => {
          setLoading(true);
          setLoadingText('Updating password...');
          timeoutSubmit = setTimeout(() => {
            doneLoading();
            const userCreds = {
              password: values.password,
              newPassword: values.newPassword,
            };

            dispatch(updateUser(userCreds))
              .then(res => {
                onRequestClose();
                dispatch(flashSuccess('Successfully updated password!'));
                timeoutReset = setTimeout(resetForm, 400);
              })
              .catch(error => {
                if (error.code === 401) {
                  setFieldError('password', 'Password Incorrect.');
                }
                if (error.message) {
                  dispatch(flashError(error.message));
                } else {
                  dispatch(flashError());
                }
              });

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, touched, submitCount, resetForm }) => {
          bindResetForm(resetForm);
          return (
            <Form>
              <Container>
                <Flex>
                  <InputsWrapper hasError={errors.server}>
                    {renderField('password', 'password', 'Current Password')}
                    {renderField('password', 'newPassword', 'New Password')}
                    {renderField(
                      'password',
                      'rePassword',
                      'Re-enter New Password',
                    )}
                  </InputsWrapper>
                  {errors.server && <ServerError>{errors.server}</ServerError>}
                </Flex>
                <Controls>
                  <BottomBtnWrapper>
                    <Button
                      width="100%"
                      style={{ borderRadius: '3px' }}
                      onClick={onRequestClose}
                    >
                      Cancel
                    </Button>
                  </BottomBtnWrapper>
                  <BottomBtnWrapper>
                    <Button
                      width="100%"
                      style={{ borderRadius: '3px' }}
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

ChangePasswordFormik.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  bindResetForm: PropTypes.func.isRequired,
  doneLoading: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoadingText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});
export default withRouter(connect(mapStateToProps)(ChangePasswordFormik));

const FormikContainer = styled.div`
  ${({ theme }) => theme.styles.grow};
  text-align: left;

  form {
    ${({ theme }) => theme.styles.grow};
  }
`;

const Flex = styled.div`
  ${({ theme }) => theme.styles.grow};
`;

const Container = styled.div`
  ${({ theme }) => theme.styles.grow};
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

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const BottomBtnWrapper = styled.div`
  width: 49%;

  @media screen and (max-width: 599px) {
    margin-top: 15px;
  }
`;
