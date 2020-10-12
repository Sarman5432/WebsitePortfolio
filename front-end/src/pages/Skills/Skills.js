import React, { Component } from "react";
import { FilterBar } from "../../components";
import "./Skills.css";

export default class Skills extends Component {


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

  render() {
    let content = <img src='/images/Skills_Placeholder.JPG' width="100%"/>
    return (
      <div id="skills" className='page-wrap'>
        <section>
          <h1 className='title'>SKILLS</h1>
          <h3>Below are some of the skills/tools I've learned over the years!</h3>
        </section>
        <section>
          {/* <FilterBar
            filters={filters}
            updateData={(filters) => this.updateData(filters)}
          /> */}
          UNDER CONSTRUCTION! Enjoy the static picture below for now 
        </section>
        <section>
            {content}
        </section>
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

// var mySkills = {
//   languages: "C++, Java, C#, JavaScript, HTML5, CSS3, SQL, XML",
//   libraries:
//     "React, Node.js, Bootstrap, JQuery, Redux, Webpack, npm, Firebase, REST API, AJAX via Axios, Express.js",
//   tools:
//     "Github, Bitbucket, Jira/Confluence, MS Teams, MS SQL Server, Visual Studio Code, Android Studio, Wordpress, Babel",
// };

const filters = [
  { id: "Search", type: "text", value: "", placeholder: "Search" },
  {
    id: "Category",
    type: "dropdown",
    dropdown: [
      "Language",
      "Libarary",
      "Framework/Env",
      "Applications",
      "DevOps",
      "Testing",
      "Other"
    ],
    value: "",
    placeholder: "Category",
  },
  {
    id: "Sort",
    type: "dropdown",
    dropdown: ["Ascending A-Z", "Descending Z-A", "Experience"],
    value: "",
    placeholder: "Sort By",
  },
];
