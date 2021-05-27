/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/hooks";
import { Button, Input, TextLink } from "@solera/ui";

function SignUpForm({ onSubmit }) {
  const { isLoading, isError, isSuccess, data, error, run } = useAsync();
  const { register, reset, handleSubmit } = useForm();

  function submitForm(formData) {
    const { first_name, last_name, phone_number, email, password } = formData;
    run(
      onSubmit({
        first_name,
        last_name,
        phone_number,
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
      <h1>Sign up</h1>
      <form
        name="sign-up"
        onSubmit={handleSubmit((d) => submitForm(d))}
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
          "& div": {
            marginTop: "65px",
          },
        }}
      >
        <Input
          id="firstName"
          label="First Name"
          name="first_name"
          type="text"
          {...register("first_name")}
        />
        <Input
          id="lastName"
          label="Last Name"
          name="last_name"
          type="text"
          {...register("last_name")}
        />
        <Input
          id="phone"
          label="Phone Number"
          name="phone_number"
          type="text"
          {...register("phone_number")}
        />
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          {...register("email")}
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          {...register("password")}
        />
        <div
          css={{
            marginTop: "75px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button type="submit">Submit</Button>
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
