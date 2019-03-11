import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' 

 // https://www.npmjs.com/package/react-tagsinput
class ReactTagInput extends Component {
    constructor() {
        super()
        this.state = {tags: [], tag: ''}
      }
     
      handleChange = (tags) => {
        this.setState({tags})
      }
     
      handleChangeInput = (tag) => {
        this.setState({tag})
      }
     
      render() {
        return (
          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange}
            inputValue={this.state.tag}
            onChangeInput={this.handleChangeInput}
          />
        )
      }
};
 
export default ReactTagInput;