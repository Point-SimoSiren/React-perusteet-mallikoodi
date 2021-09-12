import React, {Component} from 'react';
import './App.css';

class TypicodeFetch extends Component {

    constructor(props) {
        super(props);
        console.log("TypicodeFetch: Constructor");
        this.state = {
            todos: [],
            recordcount: 0,
            start: 0,
            end: 10
        };
    }

    componentDidMount() {
        console.log("TypicodeFetch: componentDidMount");
        this.HaeTypicodesta();
    } 

    handleClickPrev = (event) => {
        let startvalue = this.state.start;
        if (startvalue > 0) {
            startvalue = startvalue-10;
        }
        this.setState({
            start: startvalue,
            end: startvalue+10
        });
        this.HaeTypicodesta();
    }

    handleClickNext = (event) => {
        this.setState({
            start: this.state.start+10,
            end: this.state.end+10
        });
        this.HaeTypicodesta();
    }

    HaeTypicodesta() {
        //let uri = 'https://jsonplaceholder.typicode.com/todos';
        let uri = 'https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end;
        console.log("HaeTypicodesta " + uri);
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ todos: json, recordcount: json.length});
            });
    }

    componentWillUnmount() {
        console.log("TypicodeFetch: componentWillUnmountssa");
    }

    render() {
        console.log("TypicodeFetch: renderissä");
        let viesti = "Rivejä " + this.state.recordcount;

        let taulukko = [];
        if (this.state.todos.length > 0) {
          for (let index = 0; index < this.state.todos.length; index++) {
            const element = this.state.todos[index];
            taulukko.push(<tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.userId}</td>
              <td>{element.title}</td>
              <td>{element.completed}</td>
            </tr>);
          }
        }
        else {
          viesti = "Ladataan tietoja Typicoden API:sta..."
        }

        return (
        <div className="App">
            <h3>{viesti}</h3>
            <button onClick={this.handleClickPrev}>Edelliset</button>
            <button onClick={this.handleClickNext}>Seuraavat</button>
            <table id="t01"><tbody>{taulukko}</tbody></table>
        </div>
        );
    }
}

export default TypicodeFetch;
