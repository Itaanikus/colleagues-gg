import React from 'react';

import './Cardbox.css'

function Cardbox(props) {
  return (
    <div className="card">
    {props.title && <h5 className="card-header">{props.title}</h5>}
    <div className="card-body">
      {props.children}
    </div>
  </div>
  );
}

export default Cardbox;