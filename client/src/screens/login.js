/** @jsxImportSource @emotion/react */
import { useAuth } from '../context/auth-context'
import { useAsync } from '../utils/hooks'

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync();
  function handleSubmit(event) {
    event.preventDefault();
    console.log("E", event);
    const { email, password } = event.target.elements;

    run(
      onSubmit({
        email: email.value,
        password: password.value,
      })
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {isError ? <div>An error happened</div> : null}
    </form>
  );
}

function LoginScreen() {
  const { login, register } = useAuth();
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
