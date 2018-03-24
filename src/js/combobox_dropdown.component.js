import React from 'react';
import Loader from './loader.component';

export default class ComboboxDropdown extends React.Component {
  
  render(){
  	const list = this.props.itemsList.map(item => {
  		return this.props.renderItem(item);
  	});
    return (
    	<div>
    		{ list }
    	</div>
    );
  }
}
