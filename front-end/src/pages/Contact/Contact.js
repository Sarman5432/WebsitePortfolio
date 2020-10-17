import React, { Component } from "react";
import { Spinner } from "../../components";
import "./Contact.css";

export default class Contact extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      message: "",
      spinner: false,
      filter: "",
    };
  }

  submitForm = (e) => {
    this.setState({ spinner: true, filter: "grayscale(80%)" });
    fetch("/api/contact", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      }),
    })
      .then((res) => this.setState({ spinner: false, filter: "" }))
      .catch((err) => {
        alert(err);
        this.setState({ spinner: false, filter: "" });
      });

    this.setState({
      name: "",
      email: "",
      message: "",
    });
    e.preventDefault();
  };

  render() {
    let spinner = "";
    if (this.state.spinner) {
      spinner = (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner />
        </div>
      );
    }
    return (
      <div
        id="contact"
        className="page-wrap"
        style={{ filter: this.state.filter }}
      >
        {spinner}
        <section>
          <h1 className="title">CONTACT ME</h1>
          <h3>
            Send me an email and i'll get back to you as soon as possible!
          </h3>
          <br></br>
        </section>
        <section>
          <form onSubmit={this.submitForm}>
            <div className="contact-input">
              <h3>Name:</h3>
              <input
                type="text"
                placeholder="John"
                id="contact-name"
                name="contact-name"
                style={{ width: "200px" }}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />
            </div>
            <div className="contact-input">
              <h3>Email:</h3>
              <input
                type="email"
                placeholder="John@gmail.com"
                id="contact-email"
                name="contact-email"
                style={{ width: "200px" }}
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>
            <div className="contact-input">
              <h3>Message:</h3>
              <textarea
                rows="10"
                placeholder="Enter message here..."
                style={{ width: "200px", resize: "none", overflow: "auto" }}
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                required
              />
            </div>
            <div className="contact-input">
              <input
                type="submit"
                className="btn-secondary"
                value="SEND EMAIL"
              />
            </div>
          </form>
        </section>
      </div>
    );
  }
}
