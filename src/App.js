import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
class App extends React.Component {

  // constructor(){
  //   super();
  // }
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key='general' country='in' category='general' pageSize={10} />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' country='in' category='business' pageSize={10} />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' country='in' category='entertainment' pageSize={10} />}></Route>
            <Route exact path='/general' element={<News setProgress={this.setProgress} key='general' country='in' category='general' pageSize={10} />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' country='in' category='health' pageSize={10} />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' country='in' category='science' pageSize={10} />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' country='in' category='sports' pageSize={10} />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' country='in' category='technology' pageSize={10} />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;
