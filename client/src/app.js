import * as React from "react";
import { Global, css } from "@emotion/react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner, colors } from "@solera/ui";
import normalize from "normalize.css";

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./authenticated-app")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Global
        styles={css`
          ${normalize}
          :root {
            --header-height: 82;
            --grid-base-width: 1500;
            --grid-margin-width: 120;
            --grid-container-width: calc(
              var(--grid-base-width) - 2 * var(--grid-margin-width)
            );
            --field-adorn-width: 25;
          }
          * {
            font-family: "Work Sans";
            font-size: 1.6rem;
            color: ${colors.text};
          }
          html {
            font-size: 10px;
          }
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.6rem;
          }
        `}
      />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
