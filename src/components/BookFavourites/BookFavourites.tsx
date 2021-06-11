import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Row, Col, Button } from "react-bootstrap";
import { Trash as TrashIcon } from "react-bootstrap-icons";
import { actions as favouritesActions } from "../../redux/reducers/favourites-reducer";
import truncate from "../../helpers/truncate";
import "./BookFavourites.css";

const BookFavourites: React.FC = () => {
	const favourites = useSelector(
		(store: RootState) => store.favourites.items,
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const keys = Object.keys(favourites);

	return (
		<Row>
			<Col>
				<Row>
					<Col>
						<br />
						<strong>&nbsp;&nbsp;&nbsp;Favourites ({keys.length})</strong>
					</Col>
				</Row>

				{keys.map((e: string, k: number) => {
					const book = favourites[e];
					return (
						<Row key={k} className="book-favourite">
							<Col title={book.title}>{truncate(book.title, 50)}</Col>
							<Col xs={2}>
								<Button
									onClick={() => {
										dispatch(favouritesActions.remove(e));
									}}
								>
									<TrashIcon className='trash-icon' />
								</Button>
							</Col>
						</Row>
					);
				})}
			</Col>
		</Row>
	);
};

export default BookFavourites;
