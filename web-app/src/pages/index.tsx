import React, { Fragment } from "react";
import "./index.less";
import {getCookie} from "@/util/cookie";
export default function IndexPage(props: any) {
  return (
    <Fragment>
        {props.children}
    </Fragment>
  );
}


export function currentUserInfo() {
	const cookie = getCookie("currentUser");
	if(cookie) {
		return JSON.parse(cookie);
	}
}
