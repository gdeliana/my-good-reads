import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";
import Main from "./pages/Main";
import { Container } from "react-bootstrap";

function App() {
	return (
		<>
			<header className="header">
				<div className="header--content">
					<h1>My Good Reads</h1>
				</div>
			</header>
			<Container fluid>
				<Main />
			</Container>
		</>
	);
}

export default App;
