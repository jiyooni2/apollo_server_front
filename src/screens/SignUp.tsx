import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
import PageTitle from "../components/pageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
`;

type FormValues = {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  result: string;
};

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const navigate = useNavigate();
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
    createAccount: {
      ok: boolean;
      error?: string;
    };
  }

  //gives us data, result of the createAccount
  const onCompleted = (data: IData) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }

    //redirect,
    navigate(routes.home, {
      state: { message: "Account created. Please log in" },
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid: SubmitHandler<FormValues> = (data) => {
    if (loading) {
      return;
    }
    const { firstName, lastName, username, email, password } = getValues();
    createAccount({
      variables: { firstName, lastName, username, email, password },
    });
  };

  const clearSignUpError = () => {
    return clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <Button type="submit" value="log in with facebook" />
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", { required: "First Name is required" })}
            onFocus={clearSignUpError}
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState.errors?.firstName)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            onFocus={clearSignUpError}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(formState.errors?.lastName)}
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input
            {...register("email", { required: "Email is required." })}
            onFocus={clearSignUpError}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email)}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars",
              },
              validate: (currentValue) =>
                /[a-zA-Z0-9]{3,18}$/.test(currentValue) ||
                "username is not validate",
            })}
            onFocus={clearSignUpError}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required" })}
            onFocus={clearSignUpError}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
