import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   display:flex;
   flex-direction:column;
   padding:0px 20px 20px 20px;
   
   & h3 {
      color:#01a4f6;
      margin:20px 0 10px 5px;
      font-size:1.3rem;
   }
   & div {
      cursor:pointer;
      background-color:#2f3438;
      margin-bottom:3px;
      border-radius:10px;
      padding:10px 10px 10px 30px;
      display:flex;
      justify-content:space-between;
      transition:background-color 0.2s ease-in-out;
      & p {
         width:30%;
         font-size:1rem;
      }
      & .accepted {
         color:green;
      }
      & .pending {
         color:yellow;
      }
      & .failed {
         color:red;
      }
      &:hover {
         background-color:#FB677B;
      }
   }
`
const SubmittedLastNames = ({handleOpenModalDisplay, submittedLNames}) => {
   const [ displayLNames, setDisplayLNames] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling'];

   

   useEffect(()=>{
      const buildLNameElements = () => {
         let elementList = [];
         let counter = 0;
         let raceCounter = 0;
         Object.keys(submittedLNames).forEach(key => {
            elementList.push(
               <h3 key={counter}>{races[raceCounter]}</h3>
            )
            counter++;
            raceCounter++;
            submittedLNames[key].forEach(function callback(element){
               elementList.push(
                  <div 
                     data-text={element.lastname} 
                     key={counter}
                     onClick={()=>handleOpenModalDisplay(element)} 
                  >
                     <p>Last Name: {element.lastname} </p>
                     <p className={(element.moderation) ? 'accepted' : (element.moderation === null) ? 'pending' : 'failed' }>Moderation Status: {(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }</p>
                  </div>
               )
               counter++
            })
         })
         setDisplayLNames(elementList)
      }
      if(submittedLNames){
         buildLNameElements();
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps
   
   

   return(
      <Wrapper>
         {displayLNames}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedLNames:state.submissions.submittedLNames,
});

export default connect(mapStateToProps)(SubmittedLastNames);