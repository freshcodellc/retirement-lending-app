/** @jsxImportSource @emotion/react */
import { Routes, Route } from "react-router-dom";
import { ForgotPasswordScreen } from "./screens/forgot-password";
import { LoginScreen } from "./screens/login";
import { NotFoundScreen } from "./screens/not-found";
import { ResetPasswordScreen } from "./screens/reset-password";
import { SignUpScreen } from "./screens/sign-up";
import { colors } from "@solera/ui";

import logo from "./images/logo.svg";

function UnauthenticatedApp() {
  return (
    <div>
      <header
        css={{
          top: 0,
          width: "100%",
          position: "sticky",
          backgroundColor: colors.primary,
          padding: "12px 75px"
        }}
      >
        <Nav />
      </header>
      <main
        css={{
          margin: "0 auto",
          padding: "5rem 1rem",
          width:
            "calc(var(--grid-container-width)/var(--grid-base-width)*100%)",
          maxWidth: "calc(var(--grid-container-width)*1px)",
        }}
      >
        <AppRoutes />
      </main>
    </div>
  );
}

function Nav(params) {
  return (
    <nav
      css={{
        width: "100%",
        height: "calc(var(--header-height)*1px)",
        padding: "1rem calc(var(--grid-margin-width)*1px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: colors.base,
      }}
    >
      <img src={logo} alt="Solera National Bank" />
    </nav>
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
