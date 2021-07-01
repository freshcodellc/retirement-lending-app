import { apiSecureClient } from "../utils/api-client";

function getUser() {
  return apiSecureClient("users/me");
}


function resetPassword({ email}) {
  return apiSecureClient("applicants/password-reset", { data: { email} }).then(
    res => res
  );
}

function confirmReset({ reset_token, new_password }) {
  return apiSecureClient("applicants/password-reset-confirmation", { data: { reset_token, new_password } }).then(
    res => res
  );
}

export { resetPassword, confirmReset, getUser }
