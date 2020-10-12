import React, { Component } from 'react'
import './About.css'

export default class About extends Component {
  render() {
    return (
      <div id="about" className='page-wrap'>
        <section>
          <h1 className='title'>ABOUT</h1>
          <h2>I'm a Computer Engineering student at the University of Waterloo, Canada. Some of my passions include tech, music, and sports. I'm also a decent cook (or so i've been told) 
            <span role="img" aria-label="smiley face">&#128515;</span></h2>
          <p>Excellent communication ability is something I strive for, especially when in comes to the non-tech teams. Staying organized and positive are my secrets to success (with a little help from lady luck). I've also been developing my skills as a leader, presenter, and teammate from varies projects, job experiences, and hackathons. </p>
        </section>
        <section>
          <h1 className='title'>EXPERIENCE</h1>
          <div className='section-content'>
              <div>
                <p><span className='bold'>Applications Developer Intern</span></p>
                <p>Kenna Technologies | Sept 2020 - Dec 2020</p>
                <ul>
                  <li><span className='highlight'>Optimized queries in SQL Server</span>, helping speed up initial dashboard loading time and reduced query timeouts, which had become a common occur in staging environment </li>
                  <li>Helped build the backend for a new client campaign website in <span className='highlight'>Node.js/Express</span>, and setup an automated build process in <span className='highlight'>Jenkins</span></li>
                </ul>
              </div>
              <div>
                <p><span className='bold'>Front End Developer Intern</span></p>
                <p>Kenna Technologies | Sept 2019 - April 2020</p>
                <ul>
                  <li><span className='highlight'>Front end lead</span> for rebuilding Event Management application with <span className='highlight'>React</span> to simplify/optimize codebase and add modern styling to <span className='highlight'>decrease bounce rate by ~25% over predecessor</span></li>
                  <li>Created <span className='highlight'>test cases using Mocha/Chai dependencies in React</span> and helped increase management team efficiency by printing LCOV files to easily understand errors</li>
                </ul>
              </div>
              <div>
                <p><span className='bold'>Junior Software Developer Intern</span></p>
                <p>Atlas 365 Inc | MAY 2019 – AUG 2019</p>
                <ul>
                  <li>Created a <span className='highlight'>process using Node.js to track users</span> in app to help recommend/filter content, <span className='highlight'>increasing user engagement by 8%</span> (over 4 months)</li>
                  <li>Developed <span className='highlight'>Facebook Messenger in-app game</span> and web games using <span className='highlight'>Unity/C#</span>, utilizing the Ethereum network to create/distribute <span className='highlight'>in-game cryptocurrency rewards</span></li>
                </ul>
              </div>
          </div>
        </section>
        <section>
          <h1 className='title'>EDUCATION</h1>
          <div className='section-content'>
              <div>
                <p><span className='bold'>Computer Engineering, BASc</span></p>
                <p><span className='bold'>University of Waterloo</span> | Sept 2019 - April 2020</p>
                <ul><li>Finished first year Computer Engineering (co-op) and going into second year</li></ul>
              </div>
              <div>
                <p><span className='bold'>High School - OSSD</span></p>
                <p><span className='bold'>Mississauga Secondary School</span> | 2015 – 2019</p>
                <ul><li>Completed highschool as a <span className='highlight'>honour roll student with an average of ~95%</span> throughout high school.</li></ul>
              </div>
          </div>
        </section>
        <div className='align-center'>
          <button 
            className="btn-secondary" 
            onClick={() => this.props.toContact()}
            style={{margin: 0}}
          >Contact Me
          </button>
        </div>
      </div>
    )
  }
}
