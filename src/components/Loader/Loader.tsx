import React from 'react';
import css from './Loader.module.css';

const Loader:React.FC = () => (
	<>
		<div className={css.lds_ripple}>
			<div className={`${css.lds_ripple_child}`}></div>
			<div className={`${css.lds_ripple_child} ${css.lds_ripple_child_2}`}></div>
		</div>
	</>
);

export default Loader;