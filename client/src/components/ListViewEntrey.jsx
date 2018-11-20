import React from 'react';


const ListViewEntrey = (props) => {
return(
	<div className="ListViewEntrey">
      <a href={props.repo.html_url} target="_blank">{props.repo.full_name}</a>
	</div>


	)

}

export default ListViewEntrey;