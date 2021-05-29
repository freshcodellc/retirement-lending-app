/** @jsxImportSource @emotion/react */
import { colors } from "@solera/ui";
import logo from "../images/logo.svg";

function Nav(params) {
  return (
    <nav
      css={{
        width: "100%",
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

function Layout({ children }) {
  return(
    <div>
      <header
        css={{
          top: 0,
          width: "100%",
          position: "sticky",
          backgroundColor: colors.primary,
          padding: "12px 75px",
        }}
      >
        <Nav />
      </header>
      <main
        css={{
          margin: "0 auto",
          padding: "5rem 1rem",
          width: "calc(var(--grid-container-width)/var(--grid-base-width)*100%)",
          maxWidth: "calc(var(--grid-container-width)*1px)",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export { Layout }
