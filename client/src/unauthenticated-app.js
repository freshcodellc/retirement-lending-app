import { Routes, Route } from "react-router-dom";
import { ForgotPasswordScreen } from "./screens/forgot-password";
import { LoginScreen } from "./screens/login";
import { NotFoundScreen } from "./screens/not-found";
import { SignUpScreen } from "./screens/sign-up";

function UnauthenticatedApp() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/sign-up" element={<SignUpScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default UnauthenticatedApp;
