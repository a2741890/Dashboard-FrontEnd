import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Blog from './containers/Blog/Blog';
import WidgetUI from './components/WidgetUI/Widget';

class App extends Component {
  render() {
    return (
        <Layout className="App">
          <Blog />
          <WidgetUI />
        </Layout>
    );
  }
}

export default App;
