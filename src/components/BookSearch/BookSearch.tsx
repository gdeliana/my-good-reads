import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchBooksByType } from "../../redux/reducers/search-reducer";
import { useAppDispatch } from "../../redux/store";

const BookSearch: React.FC = () => {
	const [bookType, setBookType] = useState("");

	const dispatch = useAppDispatch();

	let searchTimeout = useRef<NodeJS.Timeout | null>(null);

	const handleOnKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (searchTimeout.current) clearTimeout(searchTimeout.current);
			dispatch(fetchBooksByType(bookType));
		}
	};

	useEffect(() => {
		if (searchTimeout.current) clearTimeout(searchTimeout.current);

		searchTimeout.current = setTimeout(() => {
			dispatch(fetchBooksByType(bookType));
		}, 500);

		return () => {
			if (searchTimeout.current) clearTimeout(searchTimeout.current);
		};
	}, [bookType, dispatch]);

	return (
		<Row>
			<Col>
				<div className="search-params">
					<form onSubmit={(e) => e.preventDefault()}>
						<input
							className="full-width"
							autoFocus
							name="gsearch"
							type="search"
							value={bookType}
							placeholder="Search for books to add to your reading list and press Enter"
							onChange={(e) => setBookType(e.target.value)}
							onKeyPress={handleOnKeyDown}
							data-testid="search-book-input"
						/>
					</form>
				</div>
			</Col>
		</Row>
	);
};

export default BookSearch;
