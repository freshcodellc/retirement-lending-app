/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { useAsync } from '../utils/hooks'
import { Button, Input, TextLink } from '@solera/ui'

function LoginForm({ onSubmit }) {
  const { isLoading, isError, error, run } = useAsync();
  const { register, handleSubmit } = useForm();

  function submitForm(formData) {
    const { email, password } = formData;

    run(
      onSubmit({
        email,
        password,
      })
    );
  }

  return (
    <div css={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "600px",
      width: "100%"
    }}>
      <h1>Log in</h1>
      <form
        name="login"
        onSubmit={handleSubmit(d => submitForm(d))}
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
          "& div": {
            marginTop: "65px"
          }
        }}
      >
        <Input id="email"
          label="Email"
          name="email"
          type="email"
          {...register("email")} />
        <Input id="password"
          label="Password"
          name="password"
          type="password"
          {...register("password")} />
        <div css={{
          marginTop: "75px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Button type="submit">Submit</Button>
          <Link to="forgot-password" css={{
            marginTop: '40px'
          }}>
            <TextLink>Forgot your password?</TextLink>
          </Link>
          <p>- OR -</p>
          <Link to="sign-up" css={{
            marginTop: '40px'
          }}>
            <TextLink>Sign up</TextLink>
          </Link>
        </div>
        {isError ? <div>An error happened</div> : null}
      </form>

    </div>
  );
}

function LoginScreen() {
  const { login } = useAuth();
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginForm onSubmit={login} />
    </div>
  );
}

export { LoginScreen };
