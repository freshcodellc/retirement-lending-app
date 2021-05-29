import { Routes, Route } from "react-router-dom";
import { ForgotPasswordScreen } from "./screens/forgot-password";
import { LoginScreen } from "./screens/login";
import { NotFoundScreen } from "./screens/not-found";
import { ResetPasswordScreen } from "./screens/reset-password";
import { SignUpScreen } from "./screens/sign-up";
import { Layout } from "./components/layout";

function UnauthenticatedApp() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/sign-up" element={<SignUpScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default UnauthenticatedApp;
