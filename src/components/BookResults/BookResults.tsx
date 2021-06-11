import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
	Star as StarIcon,
	StarFill as StarFillIcon,
} from "react-bootstrap-icons";
import { shallowEqual, useSelector } from "react-redux";
import { bookResult } from "../../models/book-models";
import { RootState, useAppDispatch } from "../../redux/store";
import { actions as favouritesActions } from "../../redux/reducers/favourites-reducer";
import styles from "./BookResults.module.css";
import Loader from "../Loader/Loader";
import truncate from '../../helpers/truncate';


const BookResults = () => {
	const results = useSelector(
		(store: RootState) => store.search.results,
		shallowEqual
	);

	const loading = useSelector(
		(store: RootState) => store.search.loading,
		shallowEqual
	);

	const favourites = useSelector(
		(store: RootState) => store.favourites.items,
		shallowEqual
	);
	
	if(loading)
		return (
			<Row>
				<Col className='text-center'>
					<Loader />
				</Col>
			</Row>
		)
	if (results.length == 0)
			return (
				<Row>
					<Col>
						<h3>Please enter a phrase in the search area above.</h3>
					</Col>
				</Row>
			)
	return (
		<Row>
			<Col>
			{results.map((r, k: number) => {
				const selected = favourites[r.id] !== undefined;
				return <SearchResult selected={selected} key={k} {...r} />;
			})}
			</Col>
		</Row>
	);
};

const SearchResult: React.FC<
	bookResult & {
		selected: boolean;
	}
> = (book) => {

	const dispatch = useAppDispatch();

	const favouritesHandler = () => {
		if(!book.selected){
			const to_add: bookResult = {
				...book
			};
			dispatch(favouritesActions.add(to_add));
		} else {
			dispatch(favouritesActions.remove(book.id));
		}
	}

	return (
		<Row role='result'>
			<Col>
				<div className={styles.bookResult}>
					<Row>
						<Col>
							<span title={book.title} className="title">Title: {truncate(book.title, 50)}</span>
						</Col>
						<Col xs={3} className="text-right">
							<Button onClick={favouritesHandler} variant="success">
								{!book.selected ? <StarIcon /> : <StarFillIcon />}
							</Button>
						</Col>
					</Row>

					<Row>
						<Col>
							<Row>
								<Col>
									{book.published && (
										<span className="published">
											Published: {book.published}
										</span>
									)}
								</Col>
							</Row>
							<Row>
								<Col>
									{book.publisher && (
										<span className="publisher">
											Publisher: {book.publisher}
										</span>
									)}
								</Col>
							</Row>
							<Row>
								<Col>
									{book.authors && book.authors?.length > 0 && (
										<span className="authors">
											Author(s):{" "}
											{book.authors?.reduce(
												(prev, curr) =>
													prev !== "" ? `${prev}, ${curr}` : curr,
												""
											)}
										</span>
									)}
								</Col>
							</Row>
						</Col>

						<Col xs={3}>
							{book.image && (
								<div className="image">
									<img
										className={`${styles.img} img-responsive`}
										alt={book.title}
										src={book.image}
									/>
								</div>
							)}
						</Col>
					</Row>

					<Row>
						<Col>
							{book.description && (
								<p title={book.description} className="description">
									Description: {truncate(book.description, 100)}
								</p>
							)}
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	);
};

export default BookResults;
