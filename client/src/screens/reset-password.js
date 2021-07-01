/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/hooks";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import has from 'lodash/has';
import * as yup from "yup";
import { Button, Input, InputError, TextLink } from "@solera/ui";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const schema = yup.object().shape({
  new_password: yup.string().min(8).required("Required"),
});

function ResetPasswordForm({ onSubmit }) {
  const { isLoading, isError, isSuccess, data, error, run } = useAsync();
  const { formState, register, reset, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    submitFocusError: true,
  });
  const query = useQueryParams();
  const token = query.get('token');

  function submitForm(formData) {
    const { new_password } = formData;
    run(
      onSubmit({
        reset_token: token,
        new_password,
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
      <h1>Reset Password</h1>
      <form
        name="confirm-reset"
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
            id="newPassword"
            label="New Password"
            name="new_password"
            type="password"
            hasError={has(formState, 'errors.new_password')}
            {...register("new_password")}
          />
          <ErrorMessage
            errors={formState.errors}
            name="new_password"
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
          <Button
            variant="secondary"
            disabled={!formState.isValid}
            type="submit"
          >
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
          <div>Success! Please log in with your new password.</div>
        ) : null}
      </form>
    </div>
  );
}

function ResetPasswordScreen() {
  const { confirmReset } = useAuth();
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResetPasswordForm onSubmit={confirmReset} />
    </div>
  );
}

export { ResetPasswordScreen };
