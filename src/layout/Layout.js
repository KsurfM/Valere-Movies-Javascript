import Navigation from "./Navigation";
import { Fragment } from "react";
const Layout = (props) => {
  return (
    <Fragment>
      <Navigation></Navigation>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
