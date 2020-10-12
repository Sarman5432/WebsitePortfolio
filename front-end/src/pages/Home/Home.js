import React, { Component } from "react";
import Typist from "react-typist";
import TypistLoop from "react-typist-loop";
import { About, Contact, Skills, Portfolio } from '../../pages'
import { Navbar } from "../../components";

import "./Home.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      backspace: ["a Software Developer", "a Tech Enthusiast", "a Robust Debugger"],
      sidePage: 'home',
      nav: 'block',
      sideNav: 'slideOut',
      mobile: 'no',
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.leftCol = React.createRef();
    this.rightCol = React.createRef()
  }

  //add event listners
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  //remove event listners
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  //toggles mobile and desktop on resize
  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.checkMobile()
  }

  downloadResume = () => {
    fetch('/api/resume')
      .then(async res => ({
        filename: "Sarman's Resume.pdf",
        blob: await res.blob()
      }))
      .then(resObj => {
        // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
        const newBlob = new Blob([resObj.blob], { type: resObj.type})
        // create a link pointing to the ObjectURL containing the blob.
        const objUrl = window.URL.createObjectURL(newBlob);
        let link = document.createElement('a');
        link.href = objUrl;
        link.download = resObj.filename;
        link.click();

        // For Firefox it is necessary to delay revoking the ObjectURL.
        setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
      })
  }

  //opens a new tab
  redirect = (location) => {
    let link = document.createElement('a');
    link.href = location
    link.target = "_blank"
    link.click()
  }

  //toggles mobile and desktop on menu click
  checkMobile = async(obj) => {
    if(obj !== ''){
      await this.setState(obj)
    }
    if(this.state.width < 1023 && this.state.sidePage !== 'home'){
      this.leftCol.current.style.display = "none";
      this.rightCol.current.style.width = "100%";
      this.setState({mobile: 'yes'})
    }else{
      this.leftCol.current.style.display = "flex"
      this.rightCol.current.style.width = "50%"
      this.setState({mobile: 'no'})
    }

    if(this.state.width < 750 && this.state.sidePage === 'home'){
      this.rightCol.current.style.height = "30%";
    }else{
      this.rightCol.current.style.height = "100%";
    }
  }

  render() {
    const {sidePage, backspace, nav} = this.state;
    let page = ''
    if(sidePage === 'about') page = <About toContact={()=> this.setState({sidePage: 'contact'})}/>
    if(sidePage === 'skills') page = <Skills toContact={()=> this.setState({sidePage: 'contact'})}/>
    if(sidePage === 'portfolio') page = <Portfolio toContact={()=> this.setState({sidePage: 'contact'})}/>
    if(sidePage === 'contact') page = <Contact/>

    return (
      <React.Fragment>
        <div id="home">
          <div className="left-col" ref={this.leftCol}>
            <div>
              <div id="main-text">
                <p>Hi, I'm</p>
                <h2>SARMAN</h2>
                <TypistLoop interval={100}>
                  {backspace.map((text) => (
                    <Typist key={text} avgTypingDelay={50}>
                      {text}
                      <Typist.Backspace count={text.length} delay={2000} />
                    </Typist>
                  ))}
                </TypistLoop>
              </div>
              <div id="main-links">
                <button className="btn-main" onClick={() => this.downloadResume()}>RESUME</button><br></br>
                <button className="btn-main" onClick={() => this.redirect('https://github.com/Sarman5432')} style={{marginRight: '10px'}}>GITHUB</button>
                <button className="btn-main" onClick={() => this.redirect('https://www.linkedin.com/in/sarmanaulakh/')}>LINKEDIN</button>
              </div>
            </div>
          </div>
          <div className="right-col" ref={this.rightCol}>
            <div className='right-menu' style={{display: nav}}>
              <div 
                className="right-col-item"
                onClick={() => this.checkMobile({sidePage: 'about', nav: 'none'})}>
                01 About
              </div>
              <div 
                className="right-col-item"
                onClick={() => this.checkMobile({sidePage: 'portfolio', nav: 'none'})}>
                02 Portfolio
              </div>
              <div 
                className="right-col-item"
                onClick={() => this.checkMobile({sidePage: 'skills', nav: 'none'})}>
                03 Skills
              </div>
              <div 
                className="right-col-item"
                onClick={() => this.checkMobile({sidePage: 'contact', nav: 'none'})}>
                04 Contact
              </div>
            </div>
            <div style={{display: (nav==='block') ? 'none' : 'block'}}>
              <Navbar 
                mobile={this.state.mobile} 
                sideNav={this.state.sideNav}
                toggleSideNav={(position) =>this.setState({sideNav: position})}
                click={this.checkMobile}
              />
                {page}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
