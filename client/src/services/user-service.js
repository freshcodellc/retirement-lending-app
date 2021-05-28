import { client } from "../utils/api-client";

function resetPassword({ email}) {
  return client("users/password-reset", { data: { email} }).then(
    res => res
  );
}

function confirmReset({ reset_token, new_password }) {
  console.log('C', confirm)
  return client("users/password-reset-confirmation", { data: { reset_token, new_password } }).then(
    res => res
  );
}

export { resetPassword, confirmReset }
