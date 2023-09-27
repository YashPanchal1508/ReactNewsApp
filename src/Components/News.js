import React, {useEffect, useState} from "react"
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';



const  News = (props) => {    
  
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
   
  const updateNews = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ac76a6ed6654212a64e35ea24cccf92&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    // this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    
  }

  const handlePrevious = async () =>{ 
      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ac76a6ed6654212a64e35ea24cccf92
      // &page=${this.state.page - 1}&pageSize=${props.pageSize}`;
      // this.setState({loading: true})
      // let data = await fetch(url);
      // let parseData = await data.json();
      // console.log(parseData);   
      // this.setState({
      //   page:  this.state.page - 1,
      //   articles: parseData.articles,
      //   loading: false
      // }) 
      setPage(page - 1)
     
      updateNews();
    }


    
    const handleNext = async () =>{
      if(!(page + 1 > Math.ceil(totalResults/props.pageSize)))
      {
        //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ac76a6ed6654212a64e35ea24cccf92
        //&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        //   let data = await fetch(url);
        //this.setState({loading: true})
        //let parseData = await data.json();
        //console.log(parseData); 
        //this.setState({
        //page:  this.state.page + 1,
        //articles: parseData.articles,
        //loading: false
    // })
    setPage(page + 1)
    updateNews();

  }
    }

    useEffect(() => {
      
      updateNews();
    }, [])
    
 

    return (
      <div>
        <div className="container my-3" >
         <div className="text-center my-4"> <h2  style={{marginTop: '90px'}}>NewsMonkey - Top Headlines</h2></div>
        {loading && <Spinner/>}
          <div className="row my-3">
            {!loading && articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button"  className="btn btn-dark" onClick={handlePrevious}>&larr; previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>&rarr; Next</button>
          </div>
          
        </div>
      </div>
    );
  
}

News.defaultProps = {
  pageSize: 10,
  country: "in",
  category: "sports",
}
News.propTypes = {
pageSize: PropTypes.number,
country: PropTypes.string,
category: PropTypes.string,
}

export default News;
