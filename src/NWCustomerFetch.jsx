import React, { Component } from 'react';
import './App.css';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    console.log("NWCustomerFetch-komponentti: constructor");
    this.state = {
      asiakkaat: [],
      start: 0,
      take: 10
    }; //Luodaan asiakkaat -olio (taulukko)
  }

  handleClickPrev = (event) => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
      startvalue = startvalue - 10;
    }
    this.setState({
      start: startvalue,
      take: 10
    });
    this.HaeNWRestApista();
  }

  handleClickNext = (event) => {
    this.setState({
      start: this.state.start + 10,
      take: 10
    });
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    console.log("NWCustomerFetch-komponentti: componentDidMount");
    let uri = 'https://localhost:5001/api/customer/r?offset=' + this.state.start + '&limit=' + this.state.take;
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ asiakkaat: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
      });
  }


  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWCustomerFetch-komponentti: render");
    let viesti = "NW Customers-rivejä:" + this.state.asiakkaat.length;
    let taulukko = [];
    let tHeaders = "";
    if (this.state.asiakkaat.length > 0) {
      //Luodaan taulukon otsikot
      tHeaders = <tr><th>customerId</th><th>companyName</th><th>contactName</th></tr>
      for (let index = 0; index < this.state.asiakkaat.length; index++) {
        const element = this.state.asiakkaat[index];
        taulukko.push(<tr key={element.customerId}>
          <td>{element.customerId}</td>
          <td>{element.companyName}</td>
          <td>{element.contactName}</td>
        </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    return (<div className="oma5">
      <h1>Tietokantahaku</h1>
      <p>{viesti}</p>
      <button onClick={this.handleClickPrev}>Edelliset</button>
      <button onClick={this.handleClickNext}>Seuraavat</button>
      <table class="table table-dark" id="t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
    </div>
    );
  }
}
export default NWCustomerFetch;

