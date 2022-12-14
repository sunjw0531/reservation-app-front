import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import baseStyle from '../styles/baseStyle';
import styled from 'styled-components';
import axios from 'axios';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { redisKey } = useParams();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '비밀번호는 최소 8자, 최대 20자로 입력해주세요.')
        .max(20, '비밀번호는 최소 8자, 최대 20자로 입력해주세요.'),
      passwordConfirm: Yup.string()
        .required('비밀번호를 입력해주세요.')
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        const { password } = values;
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/password`,
          {
            redisKey,
            password,
          },
          { withCredentials: true }
        );
        alert(`비밀번호를 정상적으로 변경하였습니다.`);
        navigate('/');
      } catch (error) {
        setError(error);
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FormTitle>비밀번호 변경</FormTitle>
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <InputErrorMessage>{formik.errors.password}</InputErrorMessage>
        ) : null}
        <InputLabel htmlFor="passwordConfirm">비밀번호 확인</InputLabel>
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirm}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <InputErrorMessage>{formik.errors.passwordConfirm}</InputErrorMessage>
        ) : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <SubmitButton type="submit">비밀번호 변경</SubmitButton>
      </Form>
    </Container>
  );
};

export default ChangePassword;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0 2rem;
`;

const InputLabel = styled.label`
  margin: 1rem 0.25rem 0.25rem;
`;

const Input = styled.input`
  height: 2.5rem;
  font-size: 1rem;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  padding-left: 1rem;
  background-color: rgb(233, 233, 233);
`;

const InputErrorMessage = styled.div`
  margin: 0.25rem;
  font-size: 0.8rem;
  color: red;
`;

const ErrorMessage = styled.div`
  margin: 0.25rem;
  font-size: 0.8rem;
  color: red;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  margin: 2rem 0;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  color: ${baseStyle.mainColor};
  font-weight: bold;
  font-size: 1rem;
  background-color: #222;
`;
