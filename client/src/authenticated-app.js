import { Routes, Route } from "react-router-dom";
import { DashboardScreen } from "./screens/dashboard";
import { PreApplicationScreen } from "./screens/pre-application";
import { NotFoundScreen } from "./screens/not-found";
import { Layout } from "./components/layout";

function AuthenticatedApp() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/pre-application/:uuid" element={<PreApplicationScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default AuthenticatedApp;
