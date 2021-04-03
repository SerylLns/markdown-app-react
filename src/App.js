import { Component } from 'react';
import './App.css';
import marked from 'marked';
import { sampleText } from "./sampleText";
class App extends Component {
  state = {
    text: sampleText
  }
  handleChange = (e) => {
    const newText = e.currentTarget.value;
    this.setState({
      text: newText
    })
  }
  renderMarked = (text) => {
    return marked(text,{sanitize: true})
  }
  componentDidMount() {
    const text = localStorage.getItem("text")
    if (text) {   
      this.setState({ text: text })
    } else {
      this.setState({ text: sampleText });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { text } = this.state
    localStorage.setItem('text', text)
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              value={this.state.text}
              onChange={this.handleChange}
              className="form-control"
              rows="35"
            />
          </div>
          <div className="col-sm-6">
            <div
              dangerouslySetInnerHTML={{ __html: this.renderMarked(this.state.text) }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
