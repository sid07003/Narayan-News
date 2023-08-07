import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading.js";

export class News extends Component {
  articles = [];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: this.totalResults,
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 14)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=12e08c55f819446db1fb99b97a97f054&page=${
        this.state.page + 1
      }&pagesize=14`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let fdata = await data.json();
      this.setState({
        articles: fdata.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  prevPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=12e08c55f819446db1fb99b97a97f054&page=${
      this.state.page - 1
    }&pagesize=14`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let fdata = await data.json();
    this.setState({
      articles: fdata.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=12e08c55f819446db1fb99b97a97f054&page=${this.state.page}&pagesize=14`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let fdata = await data.json();
    this.setState({
      articles: fdata.articles,
      totalResults: fdata.totalResults,
      loading: false,
    });
  }
  render() {
    return (
      <div className="container my-4">
        <h3 className="text-center">
          <b>NarayanNews - Latest Headlines</b>
        </h3>
        {this.state.loading && <Loading />}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element) => {
            console.log(element.articles);
            return (
              <div className="col-md-4 my-4 p-0">
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "click read more to view"
                  }
                  url={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://www.yourfreecareertest.com/wp-content/uploads/2016/07/reporter.jpg"
                  }
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.prevPage}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 14)
            }
            type="button"
            className="btn btn-primary ml-100"
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
