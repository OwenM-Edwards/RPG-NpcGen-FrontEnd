import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharDesc, clearInputDescError } from "../redux/actions/index";
import {optionsRace, optionsGender} from "../constants/index";
import { connect } from "react-redux";
import { LoadingIcon } from '../components/Index';

import Select from 'react-select';
const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   border:3px solid black;
   border-radius:5px;
   align-content:center;
`

const ErrorBox = styled.div`
   width:100px;
   height:100px;
   background-color:red;   
`


const InputCharDesc = ({ clearInputDescError, isFetching, error, submitCharDesc, userID, userEmail}) => {
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const [ inputFName, setinputFName] = useState('random');
   const [ inputLName, setinputLName] = useState('random');

   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }
   const handleFName = (event) => {
      setinputFName(event.target.value)
   }
   const handleLName = (event) => {
      setinputLName(event.target.value)
   }
   const handleSubmit = () => {
      submitCharDesc(
         selectedRace, 
         selectedGender,
         inputFName,
         inputLName,
         userEmail,
         userID,
      )
   }
   if(isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper >
            {(error)
               ? <ErrorBox onClick={()=> clearInputDescError()}>Error</ErrorBox>
               : <React.Fragment/>
            }
            <form>
               Character Names:
               <Select
                  defaultValue={optionsRace[0]}
                  options={optionsRace}
                  onChange={handleRace}
                  isSearchable={false}
               />
               <Select
                  defaultValue={optionsGender[0]}
                  options={optionsGender}
                  onChange={handleGender}
                  isSearchable={false}
               />
               <input
                  onChange={handleFName}
                  minLength="3"
                  maxLength="20"
                  name="charFName"
                  placeholder="First Name"
               />
               <input
                  onChange={handleLName}
                  minLength="3"
                  maxLength="20"
                  name="charLName"
                  placeholder="Optional Last Name - Gender neutral"
               />
               <button
                  type={"button"}
                  onClick={()=> handleSubmit()}
               >Submit</button>
            </form>
         </Wrapper>
      )
   }
} 


const mapStateToProps = (state) => ({ isFetching:state.inputCharDesc.isFetching, error:state.inputCharDesc.error, userID:state.authenticate.userID, userEmail:state.authenticate.userEmail  });

export default connect(mapStateToProps, { clearInputDescError, submitCharDesc })(InputCharDesc);