/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/hooks";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, InputError, TextLink } from "@solera/ui";

const schema = yup.object().shape({
  email: yup.string().email().required("Required"),
});

function ForgotPasswordForm({ onSubmit }) {
  const { isLoading, isError, isSuccess, data, error, run } = useAsync();
  const { formState, register, reset, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    submitFocusError: true,
  });

  function submitForm(formData) {
    const { email } = formData;
    run(
      onSubmit({
        email,
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
      <h1>Forgot Password</h1>
      <p>Enter your account email below and we’ll help you reset it.</p>
      <form
        name="forgot-password"
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
            marginTop: "75px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="secondary" disabled={!formState.isValid} type="submit">
            Submit
          </Button>
          <Link
            to="/"
            css={{
              marginTop: "40px",
            }}
          >
            <TextLink>Already have an account?</TextLink>
          </Link>
        </div>
        {isError ? <div>An error happened</div> : null}
        {isSuccess ? (
          <div>
            Success! Please check your email for a link to reset your password.
          </div>
        ) : null}
      </form>
    </div>
  );
}

function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ForgotPasswordForm onSubmit={resetPassword} />
    </div>
  );
}

export { ForgotPasswordScreen };
