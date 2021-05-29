import { Routes, Route } from "react-router-dom";
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
      <Route path="/pre-application" element={<PreApplicationScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default AuthenticatedApp;
