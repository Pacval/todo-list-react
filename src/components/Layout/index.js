import React from "react";

const Layout = ({ title, children, author }) => (
  <>
    <header>
      <h1>{title}</h1>
    </header>
    <main>{children}</main>
    <footer>{author}</footer>
  </>
);

export default Layout;
