import React from 'react';
import ListViewEntrey from './ListViewEntrey.jsx';

const ListView = (props) => {

return( 

	<div> 
	  {
     		props.repos.map((repo) => 
	  	      <ListViewEntrey repo = {repo} />
	        )
	  }
	</div>

	  )

}

export default ListView;