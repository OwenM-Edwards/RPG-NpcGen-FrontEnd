import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import InfoCards from './components/infoCards/InfoCards';
import SubmitButtons from './components/submitButtons/SubmitButtons';
import InputName from './components/inputName/InputName';
import InputImage from './components/inputImage/InputImage';
import InputDesc from './components/descInput/descInput';
import LoadingIcons from './components/loadingIcons/LoadingIcons';



const initialState = {
  fullRandom: true,
  gender:'male',
  race: 'human',
  system: 'Random',
  nameOutput:'',
  imageOutput: '',
  statsOutput:'',
  role:'merchant',
  ageOutput: '',
  lastNameOutput:'',
  display:'init'
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  //HANDLES SUBMIT BUTTON

  submit = () => {
    this.setState({display:'loading'})
    fetch('http://localhost:3000/genchar', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "race": this.state.race,
        "gender": this.state.gender,
        "role":this.state.role
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({display:'loaded'})
      this.setState({nameOutput:data[0][0].name})
      this.setState({imageOutput:data[1][0].url})
      this.setState({
        ageOutput:Math.floor(Math.random()*data[2][0].maxage)
      })
      this.setState({lastNameOutput:data[3][0].lastname})
      if(this.state.ageOutput < 2){
        this.setState({
          ageOutput:this.state.ageOutput+14
        })
      } 
      else if(this.state.ageOutput < 4){
        this.setState({
          ageOutput:this.state.ageOutput*7
          
        })
      } else if(this.state.ageOutput < 13){
        this.setState({
          ageOutput:this.state.ageOutput*3
          
        })
      } 
      
    })
    .then(this.setState({
      fullRandom: false
    }))
    .then(this.setState({
      submitted: true
    }))
    .catch(err=>{
      console.log('problemo')
    })
  }

  //HANDLES DROP OPTIONS CHANGES
  handleGenderChange = (event) => {
    this.setState({gender: event.target.value});
  }
  handleRaceChange = (event) => {
    this.setState({race: event.target.value});
  }
  handleSystemChange = (event) => {
    this.setState({system: event.target.value});
  }
  handleRoleChange = (event) => {
    this.setState({role: event.target.value});
  }


  render() {
    const {nameOutput, imageOutput, ageOutput,role,race,lastNameOutput } = this.state;
    var displayState;
    if (this.state.display === 'init') {
      displayState = <div></div>;
    } else if(this.state.display === 'loading') {
      displayState = <LoadingIcons />;
    } else if(this.state.display === 'loaded') {
      displayState = <InfoCards imageOutput={imageOutput} nameOutput={nameOutput} ageOutput={ageOutput} role={role} race={race} lastNameOutput={lastNameOutput}/>;
    }


    return (
      <div className="App">
        <h1>The RPG character generator</h1>
        <h2>Who are you looking for?</h2>

        <SelectionButtons handleRoleChange={this.handleRoleChange} handleRaceChange={this.handleRaceChange} handleSystemChange={this.handleSystemChange} handleGenderChange={this.handleGenderChange}/>
        <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
        {displayState}
        <InputName/>
        <InputImage/>
        <InputDesc/>


        
          

        

      
      </div>
    );
  }
}

export default App;