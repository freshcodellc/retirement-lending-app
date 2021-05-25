/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth-context'
import { useAsync } from '../utils/hooks'
import { Input } from '@solera/ui'

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
    <form
      onSubmit={handleSubmit(d => submitForm(d))}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <div>
        <label htmlFor="password">Password</label>
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
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {isError ? <div>An error happened</div> : null}
    </form>
  );
}

function LoginScreen() {
  const { login } = useAuth();
  return (
    <div
      css={{
        height: "100%",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginForm onSubmit={login} />
    </div>
  );
}

export { LoginScreen };
