/** @format */

import React from "react";
import { Spinner } from "react-bootstrap";
export const Loader = () => {
	return (
		<Spinner
			animation='border'
			style={{
				height: "100px",
				width: "100px",
				margin: "auto",
				display: "block",
			}}
			role='status'>
			<span className='sr-only'> Loading....</span>
		</Spinner>
	);
};
