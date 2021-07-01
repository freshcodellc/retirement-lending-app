/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import has from 'lodash/has';
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, InputError, TextLink } from "@solera/ui";

function matchPasswords() {
  return this.parent.password === this.parent.passwordConfirm
}

const schema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().min(8).required("Required"),
  passwordConfirm: yup
    .string()
    .min(8)
    .test("passwordMatch", "Passwords must match", matchPasswords)
    .required("Required"),
});

function SignUpForm({ onSubmit }) {
  const { isLoading, isError, isSuccess, data, error, run } = useAsync();
  const { register, reset, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    submitFocusError: true,
  });

  function submitForm(formData) {
    const { email, password } = formData;
    run(
      onSubmit({
        email,
        password,
      })
    );
  }

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <h1>Create your account</h1>
      <form
        name="sign-up"
        onSubmit={handleSubmit((d) => submitForm(d))}
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <div
          css={{
            marginTop: "65px",
          }}
        >
          <Input
            id="email"
            label="Email"
            name="email"
            type="email"
            hasError={has(formState, 'errors.email')}
            {...register("email")}
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            render={({ message }) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: "65px",
          }}
        >
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            hasError={has(formState, "errors.password")}
            {...register("password")}
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            render={({ message }) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: "65px",
          }}
        >
          <Input
            id="passwordConfirm"
            label="Confirm Password"
            name="passwordConfirm"
            hasError={has(formState, "errors.passwordConfirm")}
            type="password"
            {...register("passwordConfirm")}
          />
          <ErrorMessage
            errors={formState.errors}
            name="passwordConfirm"
            render={({ message }) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: "75px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="secondary" type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
          <Link
            to="/"
            css={{
              marginTop: "40px",
            }}
          >
            <TextLink variant="secondary">Already have an account?</TextLink>
          </Link>
        </div>
        {isError ? <div>An error happened</div> : null}
        {isSuccess ? (
          <div>
            Success! Please check your email and click the confirmation link
            before logging in.
          </div>
        ) : null}
      </form>
    </div>
  );
}

function SignUpScreen() {
  const { register } = useAuth();
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignUpForm onSubmit={register} />
    </div>
  );
}

export { SignUpScreen };
