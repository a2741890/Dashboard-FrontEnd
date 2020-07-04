import React, { Component } from 'react';
import WidgetUI from './WidgetUI/WidgetUI';
import './Widget.css';


class Widget extends Component {

  state = {
    ws: null,
    wsClosed: false,
    dataArr: null,
    pairAscending: true,
    priceAscending: null,
    chageAscending: null,
    clickType: null,
    selectedBNB: false,
    selectedBTC: true,
    selectedALTS: false,
    selectedFIAT: false,
    toolbarClicked: 'BTC',
    showChange: true,
    searchText: '',
    counter: 0
  }

  timeout = 250;

  componentDidMount() {

    this.wsConnect();

    // this.ws = new WebSocket('ws://localhost:8080');

    // this.ws.onopen = () => {
    //   console.log('Open Connection!');
    // };

    // this.ws.onmessage = (event) => {
    //   this.setState({ dataArr: JSON.parse(event.data) });
    //   console.log(JSON.parse(event.data));
    // }

    // this.ws.onclose = () => {
    //   console.log('Close Connection!');
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.ws.onmessage = (event) => {
      let data = Object.assign(JSON.parse(event.data));
      this.setState((prevState)=>({ counter: prevState.counter + 1 }));
      this.setState({ dataArr: data });
    }
  }

  wsConnect = () => {
    const ws = new WebSocket('ws://localhost:8080');
    const self = this;
    let connectInterval;

    ws.onopen = () => {
      console.log('Open connection!');
      this.setState({ ws: ws });

      self.timeout = 250;
      clearTimeout(connectInterval);
    }

    ws.onmessage = (event) => {
        this.setState({ dataArr: JSON.parse(event.data) });
        console.log(JSON.parse(event.data));
      }

    ws.onclose = event => {
      console.log(`WebSocket is closed. Reconnect will be attempted in ${Math.min(
        10000 / 1000,
        (self.timeout + self.timeout) / 1000
      )} second.`,
        event.reason);

      self.timeout = self.timeout + self.timeout;
      connectInterval = setTimeout(this.checkConnection, Math.min(10000, self.timeout));
    }

    ws.onerror = error => {
      console.error(
        'WebSocket encountered error: ',
        error.message,
        'Closing WebSocket'
      );
      ws.close();
    }
  }

  checkConnection = () => {
    const { ws } = this.state;
    if(!ws || ws.readyState === WebSocket.CLOSED){
      this.wsConnect();
    }
  }

  closeWebsocket = () => {
    console.log('Forced close websocket!');
    this.state.ws.close();
  }

  closeServerWebsocket = () => {
    console.log('Forced close server websocket!');
    this.state.ws.send('close');
  }

  pairClickHandler = () => {
    this.setState({
      pairAscending: !this.state.pairAscending,
      priceAscending: null,
      changeAscending: null,
      clickType: 'pair'
    });
  }

  priceClickHandler = () => {
    this.setState({
      pairAscending: null,
      priceAscending: !this.state.priceAscending,
      changeAscending: null,
      clickType: 'price'
    });
  }

  changeClickHandler = () => {
    this.setState({
      pairAscending: null,
      priceAscending: null,
      changeAscending: !this.state.changeAscending,
      clickType: 'change'
    });
  }

  selectALTSHandler = (event) => {
    this.setState({
      toolbarClicked: event.target.value,
      selectedALTS: true,
      selectedFIAT: false,
      selectedBTC: false,
      selectedBNB: false
    });
  }

  clickALTSHandler = (event) => {
    this.setState({
      toolbarClicked: event.target.value,
      selectedALTS: true,
      selectedFIAT: false,
      selectedBTC: false,
      selectedBNB: false
    })
  }

  selectFIATHandler = (event) => {
    this.setState({
      toolbarClicked: event.target.value,
      selectedALTS: false,
      selectedFIAT: true,
      selectedBTC: false,
      selectedBNB: false
    });
  }

  toolbarButtonHandler = (event) => {
    if (event.target.innerText === 'BNB') {
      this.setState({
        selectedBNB: true,
        selectedBTC: false,
        selectedALTS: false,
        selectedFIAT: false,
      });
    }
    else {
      this.setState({
        selectedBNB: false,
        selectedBTC: true,
        selectedALTS: false,
        selectedFIAT: false
      });
    }

    this.setState({toolbarClicked: event.target.innerText});
  }


  radioButtonClickHandler = (event) => {
    if (event.target.value === 'Change') {
      this.setState({ showChange: true });
    }
    else {
      this.setState({ showChange: false });
    }
  }

  searchHandler = (event) => {
    this.setState({ searchText: event.target.value });
  }

  render() {
    let widgetUI = <p>Loading...</p>
    if (this.state.dataArr) {
      widgetUI = <WidgetUI
        dataArr={this.state.dataArr}
        pairAscending={this.state.pairAscending}
        priceAscending={this.state.priceAscending}
        changeAscending={this.state.changeAscending}
        pairClick={this.pairClickHandler}
        priceClick={this.priceClickHandler}
        changeClick={this.changeClickHandler}
        clickType={this.state.clickType}
        selectChangeALTS={this.selectALTSHandler}
        selectChangeFIAT={this.selectFIATHandler}
        clickALTSHandler={this.clickALTSHandler}
        selectedBNB={this.state.selectedBNB}
        selectedBTC={this.state.selectedBTC}
        selectedALTS={this.state.selectedALTS}
        selectedFIAT={this.state.selectedFIAT}
        toolbarButtonClick={this.toolbarButtonHandler}
        toolbarClicked={this.state.toolbarClicked}
        showChange={this.state.showChange}
        radioButtonClickHandler={this.radioButtonClickHandler}
        searchHandler={this.searchHandler}
        searchText={this.state.searchText} />;
    }

    return <div className="widget">
      <p>{this.state.counter}</p>
      {widgetUI}
      <button style={{margin:"10px"}} onClick={this.closeWebsocket}>Close WebSocket</button>
      <button style={{margin:"10px"}} onClick={this.closeServerWebsocket}>Close Server WebSocket</button>
    </div>
  }
}

export default Widget;