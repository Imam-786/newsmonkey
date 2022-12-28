import React from "react";
class Newsitem extends React.Component {
    // constructor() {
    //     super();
    //     // console.log("I am inside NewsItem Component!");
    // }
    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <>
                <div className="my-3">
                    <div className="card mb-3">

                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}><span className="badge rounded-pill bg-danger"> {source} </span>
                        </div>

                        <img src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2022/08/fandosensexniftyderivative-1-770x433.jpg" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text" ><small className="text-success">By <strong>{!author ? 'Unknown' : author}</strong> on {new Date(publishedAt).toGMTString()}</small></p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark" rel="noreferrer">Read more</a>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default Newsitem;