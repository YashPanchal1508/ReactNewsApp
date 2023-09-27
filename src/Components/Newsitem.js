import React from 'react'

const Newsitem = (props) =>{
 
    // let {title, description,imageUrl,newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card" style={{margin: '10px'}}>
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '92%', zIndex: '1'}}>
        {props.source}</span>
        {/* <span class="badge rounded-pill text-bg-danger" ></span> */}
          <img className="card-img-top" src={!props.imageUrl?"img.jpeg":props.imageUrl} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text"><small className="text-muted">By {!props.author ? "Unknown" : props.author} on  {new Date(props.date).toGMTString()}</small></p>
            <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
