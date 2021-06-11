import { render } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import sleep from "./helpers/sleep";

const Render = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

test("renders search input box", () => {
	const { getByTestId } = render(<Render />);
	expect(getByTestId("search-book-input")).toBeTruthy();
});

test("searches books", async () => {
	const { getByTestId, findAllByRole } = render(<Render />);
	fireEvent.click(getByTestId("search-book-input"));
	fireEvent.keyboard("Tom");
	await sleep(1000);
	expect(findAllByRole("result")).toBeTruthy();
});
