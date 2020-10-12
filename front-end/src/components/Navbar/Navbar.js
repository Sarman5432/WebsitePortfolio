import React, { Component } from 'react'
import './Navbar.css'

export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      location: window.location.pathname
    }
  }

  render() {
    return (
      <div className='navbar'>
        <p>Hi, I'm <span style={{color:'#d7385e', fontWeight: 'bold'}}>Sarman</span></p>
        {
          this.props.mobile === 'yes' 
            ? <div className='nav'>
                <img 
                  src='/icons/menu.png' 
                  className='menu-icon'
                  alt='menu icon to toggle side menu'
                  onClick={() => this.props.toggleSideNav(this.props.sideNav === 'slideOut' ? 'slideIn' : 'slideOut')}
                  />
                <span className={`side-menu ${this.props.sideNav}`}>
                  <p onClick={() => this.props.click({sidePage: 'home', nav: 'block'})}>Home</p>
                  <p onClick={() => this.props.click({sidePage: 'about', nav: 'none'})}>About</p>
                  <p onClick={() => this.props.click({sidePage: 'portfolio', nav: 'none'})}>Portfolio</p>
                  <p onClick={() => this.props.click({sidePage: 'skills', nav: 'none'})}>Skills</p>
                  <p onClick={() => this.props.click({sidePage: 'contact', nav: 'none'})}>Contact</p>
                </span>
              </div>
            : <div className='nav'>
                <p onClick={() => this.props.click({sidePage: 'about', nav: 'none'})}>About</p>
                <p onClick={() => this.props.click({sidePage: 'portfolio', nav: 'none'})}>Portfolio</p>
                <p onClick={() => this.props.click({sidePage: 'skills', nav: 'none'})}>Skills</p>
                <p onClick={() => this.props.click({sidePage: 'contact', nav: 'none'})}>Contact</p>
                <p onClick={() => this.props.click({sidePage: 'home', nav: 'block'})} className='close'> X </p>
              </div>
        }
      </div>
    )
  }
}