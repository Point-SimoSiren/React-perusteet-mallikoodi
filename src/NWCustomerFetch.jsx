import React, { Component } from 'react';
import Helpit from './Helpit';
import './App.css';
import NWCustomerAdd from './NWCustomerAdd';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    console.log("NWCustomerFetch-komponentti: constructor");
    this.state = { 
        asiakkaat: [], 
        start: 0,
        take: 10,
        visible: "table",
        renderChild: true   
    }; 
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
  }

  handleChildUnmount(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChild: true})
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({start: startvalue},this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({start: this.state.start+10},this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
}

  HaeNWRestApista() {
    let uri = 'https://localhost:5001/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
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
    //Ehdollinen return
    if (this.state.visible==="table") {
      return (<div className="box1">
        <h1>Tietokantahaku</h1>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickPrev}>Edelliset</button>
        <button onClick={this.handleClickNext}>Seuraavat</button>
        <table className="table table-dark" id = "t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
        <p>{viesti}</p>
      </div>
    );
    } else if (this.state.visible==="addform") {
      return (<div className="box1">
        <h1>Uuden asiakkaan lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChild ? <NWCustomerAdd unmountMe={this.handleChildUnmount} /> : null}
      </div>
      );

    } else if (this.state.visible==="help") {
      return (<div className="box1">
        <h1>Sovelluksen opasteet</h1>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <Helpit moduli="NWCustomerFetch"/>
      </div>
      );

    } else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
    

  }
}
export default NWCustomerFetch;

