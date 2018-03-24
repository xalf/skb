import ReactDom from 'react-dom';
import React from 'react';
import ComboboxSelect from './js/combobox-select.component';
import ComboboxSearch from './js/combobox-search.component';
import mockFull from './kladr.json';

const mockShort = mockFull.slice(0, 50);

const renderItem = item => { 
	return (
		<div
			className=""
			key={ item.Id }>
			{ item.City }
		</div>
	);
};
const filterListFn = item => {

}

const App = () => {
	return (
		<div className="row">
			<div className="col-md-4">
				<ComboboxSelect
					itemsList={ mockShort }
					renderItem={ renderItem }
					filterListFn={ filterListFn } />
			</div>
		</div>
	);
}

ReactDom.render(
	<App />,
	document.getElementById('app-root')
);