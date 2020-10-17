import React, { Component } from "react";
import { FilterBar, Spinner } from "../../components";
import "semantic-ui-css/semantic.min.css";
import "./Portfolio.css";

export default class Portfolio extends Component {
  constructor(props) {
    super();
    this.state = {
      portfolioData: [],
      filteredData: [],
    };
  }

  componentDidMount() {
    fetch("/api/portfolio")
      .then((response) => response.json())
      .then((res) => {
        setTimeout(
          () => this.setState({ portfolioData: res, filteredData: res }),
          1000
        );
      })
      .catch((err) => console.log(err));
  }

  updateData = (filters) => {
    // build array of objects to show amount of filters that apply to each data
    let highestCount = 0;
    const filterCount = this.state.portfolioData.map((data) => {
      let count = 0;

      //matching searchbar
      const searchbarValue = filters[0].value.toLowerCase();
      if (
        data.title.toLowerCase().includes(searchbarValue) ||
        data.tags.toLowerCase().includes(searchbarValue) ||
        data.description.toLowerCase().includes(searchbarValue)
      )
        count++;

      //matching category
      if (data.category.toLowerCase() === filters[1].value.toLowerCase())
        count++;

      //update highestCount (most matched filters)
      if (count > highestCount) highestCount = count;

      return {
        id: data.id,
        count: count,
      };
    });

    //filter out only the items with the highest count as they will meet all filter conditions
    let filteredData = "";
    if (highestCount !== 0) {
      filteredData = [
        ...this.state.portfolioData.filter((item) => {
          let returnItem = false;
          filterCount.forEach((element) => {
            if (element.id === item.id && element.count === highestCount) {
              returnItem = true;
            }
          });
          return returnItem;
        }),
      ];
    }

    //sort data
    if (filters[2].value !== "") {
      const data = filteredData ? filteredData : this.state.portfolioData;
      filteredData = this.sortData(data, filters[2].value);
    }

    //update state data
    this.setState({ filteredData: filteredData });
  };

  //Sorts data by sort type (4 options)
  sortData = (data, sortBy) => {
    if (sortBy === "Ascending A-Z") {
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    } else if (sortBy === "Descending Z-A") {
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "New") {
      return data.sort((a, b) => {
        const date_a = Date.parse(a.startDate);
        const date_b = Date.parse(b.startDate);
        if (date_a > date_b) {
          return -1;
        } else if (date_a < date_b) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "Old") {
      return data.sort((a, b) => {
        const date_a = Date.parse(a.startDate);
        const date_b = Date.parse(b.startDate);
        if (date_a > date_b) {
          return 1;
        } else if (date_a < date_b) {
          return -1;
        }
        return 0;
      });
    }
  };

  //opens a new tab
  redirect = (location) => {
    let link = document.createElement("a");
    link.href = location;
    link.target = "_blank";
    link.click();
  };

  render() {
    let content = "";
    if (this.state.portfolioData.length < 1) {
      content = <Spinner />;
    } else {
      content = (
        <section className="portfolio-items-container">
          {this.state.filteredData.length<1 ? '' : this.state.filteredData.map((item) => (
            <div key={item.title} className="portfolio-item">
              <img
                src={item.url}
                className="portfolio-images"
                alt={`${item.title} portfolio item`}
                onClick={() => this.redirect(item.link)}
              ></img>
              <div className="portfolio-description">
                <div>
                  <h3 onClick={() => this.redirect(item.link)}>{item.title}</h3>
                  <p>{item.startDate.slice(0, 7)}</p>
                </div>
                <p className="description">{item.description}</p>
                <p className="portfolio-tags">{item.tags}</p>
              </div>
            </div>
          ))}
        </section>
      );
    }
    return (
      <div id="portfolio" className="page-wrap">
        <section>
          <h1 className="title">My Portfolio</h1>
          <h3>
            Below are some of the projects I worked on, positions I had, and
            roles I played!
          </h3>
        </section>
        <section>
          <FilterBar
            filters={filters}
            updateData={(filters) => this.updateData(filters)}
          />
        </section>
        {content}
        <div className="align-center">
          <button
            className="btn-secondary"
            onClick={() => this.props.toContact()}
            style={{ margin: 0 }}
          >
            Contact Me
          </button>
        </div>
      </div>
    );
  }
}

const filters = [
  { id: "Search", type: "text", value: "", placeholder: "Search" },
  {
    id: "Category",
    type: "dropdown",
    dropdown: [
      "Personal Projects",
      "Group Projects",
      "Work Experience",
      "Hackathons",
    ],
    value: "",
    placeholder: "Category",
  },
  {
    id: "Sort",
    type: "dropdown",
    dropdown: ["Ascending A-Z", "Descending Z-A", "New", "Old"],
    value: "",
    placeholder: "Sort By",
  },
];
