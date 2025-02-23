import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading.js";

const api_key = process.env.REACT_APP_API_KEY;

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allArticles: [],
      displayedArticles: [],
      loading: false,
      page: 1,
      articlesPerPage: 10,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${api_key}`;
    
    try {
      let data = await fetch(url);
      let fdata = await data.json();
      
      if (fdata.articles) {
        this.setState({
          allArticles: fdata.articles,
          displayedArticles: fdata.articles.slice(0, this.state.articlesPerPage),
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  handlePageChange = (direction) => {
    const { page, articlesPerPage, allArticles } = this.state;
    let newPage = direction === "next" ? page + 1 : page - 1;

    let startIndex = (newPage - 1) * articlesPerPage;
    let endIndex = startIndex + articlesPerPage;

    this.setState({
      page: newPage,
      displayedArticles: allArticles.slice(startIndex, endIndex),
    });
  };

  render() {
    return (
      <div className="container my-4">
        <h3 className="text-center">
          <b>NarayanNews - Latest Headlines</b>
        </h3>
        {this.state.loading && <Loading />}
        <div className="row my-4">
          {!this.state.loading &&
            this.state.displayedArticles.map((element, index) => (
              <div key={index} className="col-md-4 my-4 p-0">
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={element.description ? element.description.slice(0, 88) : "Click read more to view"}
                  url={element.urlToImage || "https://www.yourfreecareertest.com/wp-content/uploads/2016/07/reporter.jpg"}
                  newsurl={element.url}
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={() => this.handlePageChange("prev")}
          >
            &larr; Prev
          </button>
          <button
            disabled={this.state.page * this.state.articlesPerPage >= this.state.allArticles.length}
            type="button"
            className="btn btn-primary"
            onClick={() => this.handlePageChange("next")}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
