import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm, Loading } from '../components';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        if (login) {
          localStorage.setItem('token', login.token as string);
          localStorage.setItem('userId', login.id as string);
        }
      }
    }
  );
}
