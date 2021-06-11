import React from "react";
import BookSearch from "../components/BookSearch/BookSearch";
import BookResults from "../components/BookResults/BookResults";
import BookFavourites from "../components/BookFavourites/BookFavourites";
import { Col, Row } from "react-bootstrap";

const Main = () => (
	<>
		<Row>
			<Col xs={9}>
				<Row>
					<Col>
						<BookSearch />
					</Col>
				</Row>

				<Row>
					<Col>
						<BookResults />
					</Col>
				</Row>
			</Col>

			<Col xs={3}>
				<BookFavourites />
			</Col>
		</Row>
	</>
);

export default Main;
