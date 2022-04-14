import React from "react";
import type {RunTimeLayoutConfig} from "umi";
import HeaderRight from "@/components/HeaderRightComponent/HeaderRight";


export const layout: RunTimeLayoutConfig = () => {
	return {
		rightContentRender: () => <HeaderRight />,
		childrenRender: (children) => {
			return (
				<>
					{children}
				</>
			)
		}
	}
};

