import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/pageTitle";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";

const FaceBookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 35px;
`;

//Input의 type definition, error등 모든 데에서 쓰임
type FormValues = {
  username: string;
  password: string;
  result: string;
};

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LocationState {
  state: string;
}

function Login() {
  const location: any = useLocation();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  interface IData {
    login: {
      ok: boolean;
      error?: string;
      token?: string;
    };
  }

  const onCompleted = (data: IData) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  //등록된 value들이 data안에 들어있음
  const onSubmitValid: SubmitHandler<FormValues> = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    console.log(username, password);
    login({
      variables: { username, password },
    });
  };

  const onSubmitInvalid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  const clearLoginError = () => {
    return clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        {location?.state?.message}
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars",
              },
              //if use async, 백엔드에서 실시간으로 처리 가능
              validate: {
                value: (currentValue) =>
                  /[a-zA-Z0-9]{3,18}$/.test(currentValue) ||
                  "username is not validate",
              },
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username)}
          />
          <FormError message={formState.errors?.username?.message} />

          <Input
            //configure required error msg
            {...register("password", { required: "Password is required." })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FaceBookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FaceBookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
}

export default Login;
