import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import { WithContext as ReactTags } from 'react-tag-input';

/**
 * A contrived example using a transition between steps
 */
class WarmupStepper extends React.Component {

  constructor(){
    super();
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      tags: [ {id: 1, text: "Apples"} ],
      suggestions: ["Banana", "Mango", "Pear", "Apricot"]
    }

    this.dummyAsync = this.dummyAsync.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleDelete(i) {
      let tags = this.state.tags;
      tags.splice(i, 1);
      this.setState({tags: tags});
  }

  handleAddition(tag) {
      let tags = this.state.tags;
      tags.push({
          id: tags.length + 1,
          text: tag
      });
      this.setState({tags: tags});
  }

  handleDrag(tag, currPos, newPos) {
      let tags = this.state.tags;

      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: tags });
  }

  handleNext() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <ReactTags tags={this.state.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag} />
            <p>Something something whatever cool</p>
          </div>
        );
      case 1:
        return (
          <p>
            Pirijo and Hoang share the same interest in <b>#Geography</b>. <a>Click here</a> to start conversation with them
          </p>
        );
      case 2:
        return (
          <p>
            Having fun and at the same time learn from your classmates
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Write your interests</StepLabel>
          </Step>
          <Step>
            <StepLabel>Find classmates that match you</StepLabel>
          </Step>
          <Step>
            <StepLabel>Talk and learn with your classmates!</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}

export default WarmupStepper;