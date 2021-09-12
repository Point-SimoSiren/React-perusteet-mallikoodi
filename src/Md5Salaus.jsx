/*import React, { Component } from 'react';
import Request from 'react-http-request';
import './App.css';

***TÄMÄ TOIMINTO ON DISABLOITUNA KUN EI TOIMINUT JA ON***
***TAVALLAAN SIVUJUONI LOPULLISEN SOVELLUKSEN KANNALTA***

class Md5Salaus extends Component {
  render() {
    let url = "http://md5.jsontest.com/?text=" + this.props.salattava;
    return (
      <Request url={url} method="get" accept="Application/json" verbose={false}>
        {
          ({ error, result, loading }) => {
            if (loading) {
              return <div>loading...</div>;
            } else if (error) {
              return <div><p>Tietoa ei löydy</p></div>;
            } else {
              return (
                <div>
                  <p>{result.body.original} </p>
                  <p>{result.body.md5} </p>
                </div>
              );
            }
          }
        }
      </Request>
    );
  }
}
export default Md5Salaus;
*/
