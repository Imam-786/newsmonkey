// import axios from "axios";
import React from "react";
import Newsitem from "./Newsitem";
// import loading from './loading.gif';
import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
class News extends React.Component {
    // articles = [
    //     {
    //         "source": { "id": "news24", "name": "News24" },
    //         "author": "Sibusiso Mjikeliso",
    //         "title": "Cricket SA wants to 'get to the bottom' of Nkwe resignation concerns, says CEO | Sport",
    //         "description": "Acting Cricket South Africa CEO Pholetsi Moseki says the board is concerned about the issues former Proteas assistant coach Enoch Nkwe raised in his resignation.",
    //         "url": "https://www.news24.com/sport/Cricket/Proteas/cricket-sa-wants-to-get-to-the-bottom-of-nkwe-resignation-concerns-says-ceo-20210826",
    //         "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/10743/97d776dc91734e98906c0e1b7f3b1afa.jpg",
    //         "publishedAt": "2021-08-26T11:40:16+00:00",
    //         "content": "<ul><li>Cricket South Africa has committed to \"getting to the bottom\" of Enoch Nkwe's sudden resignation as Proteas assistant coach. </li><li>Nkwe voiced concerns with the current culture and working… [+3497 chars]"
    //     },
    //     {
    //         "source": { "id": "abc-news-au", "name": "ABC News (AU)" },
    //         "author": "ABC News",
    //         "title": "England cricket great Ted Dexter dies aged 86",
    //         "description": "The former England captain, nicknamed \"Lord Ted\", is fondly remembered as a giant of the game and one of his country's greatest players.",
    //         "url": "http://www.abc.net.au/news/2021-08-26/england-cricket-great-ted-dexter-dies-aged-86/100411276",
    //         "urlToImage": "https://live-production.wcms.abc-cdn.net.au/1006c7ecf34ec0935eef2aade5017711?impolicy=wcms_crop_resize&cropH=2815&cropW=5004&xPos=0&yPos=223&width=862&height=485",
    //         "publishedAt": "2021-08-26T09:07:52Z",
    //         "content": "Former England captain Ted Dexter has died aged 86 following a recent illness.\r\n<ul><li>Dexter played 62 Tests for England and was captain on 30 occasions</li><li>He was inducted into the ICC Hall of… [+1746 chars]"
    //     },
    //     {
    //         "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]
    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 10
    }

    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        pageSize: PropTypes.number
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    }
    updateNews = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6711dd6cae4f7a903ecc018c0701ba&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    //dbe57b028aeb41e285a226a94865f7a7
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6711dd6cae4f7a903ecc018c0701ba&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    }
    render() {
        return (
            <>
                {/* <div className="container my-3" style={{ alignItems: 'center' }}> */}
                <h1 className="text-center" style={{ marginTop: "75px" }}>NewsMonkey-Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element, index) => {
                                return <div className="col-md-4" key={index}>
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                                        newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} /></div>
                            })}
                        </div>
                    </div>
                    {/* <div className="container d-flex justify-content-between">
                            <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr;Previous</button>
                            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                        </div> */}
                </InfiniteScroll>
                {/* </div> */}
            </>
        )
    }
}
export default News;