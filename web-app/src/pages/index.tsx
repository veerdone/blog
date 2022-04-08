import React, { Fragment } from "react";
import "./index.less";
export default function IndexPage(props: any) {
  return (
    <Fragment>
        {props.children}
    </Fragment>
  );
}
