import React, { Component } from 'react'
import { Field, Control, Input, Textarea, Button, Section} from 'reactbulma'
import ToggleDisplay from 'react-toggle-display';

class AddPostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      url: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  render() {
    return (
      <div className="form">
        <Field>
          <Control>
            <Input primary name="title" type="text" value={this.state.title} placeholder="Title" onChange={this.handleChange}/>
          </Control>
        </Field>

        <Field>
          <Control>
            <Input warning name="url" type="text" value={this.state.url} placeholder="Image URL" onChange={this.handleChange}/>
          </Control>
        </Field>

        <Field>
          <Control>
            <Textarea info name="description" type="text" value={this.state.description} placeholder="Description" onChange={this.handleChange}/>
          </Control>
        </Field>

        <Field groupedCentered onClick={(e) => this.props.addPost(e,this.state)} >
          <Control>
            <Button primary type="submit" value="Create Post">Create Post</Button>
          </Control>
        </Field>
      </div>
    )
  }
}

export default AddPostForm;
