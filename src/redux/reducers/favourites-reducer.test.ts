import { reducer, actions, initialState } from "./favourites-reducer";
import uniqid from "uniqid";

const id = uniqid();
const title = uniqid();

test("adding favourite book to reducer", () => {
	expect(
		reducer(
			initialState,
			actions.add({
				id,
				title,
			})
		)
	).toEqual({ items: { [id]: { id, title } } });
});

test("removing favourite book from reducer", () => {
	expect(
		reducer(
			initialState,
			actions.add({
				id,
				title,
			})
		)
	).toEqual({ items: { [id]: { id, title } } });
	expect(reducer(initialState, actions.remove(id))).toEqual({
		items: {},
	});
});
