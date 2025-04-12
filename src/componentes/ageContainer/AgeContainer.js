import React, { useState, useEffect, useRef } from "react";
import './agecontainer.css';
import inputsArray from '../values/values';
import { useDispatch } from "react-redux";
import { setdate } from "../../redux/GetDateReducer";


function AgeContainer(props) {
  const dispatch = useDispatch();


  // Consolidated state with initial empty values
  const [timeData, setTimeData] = useState({
    days: '',
    months: '',
    years: '',
  });
  const inputsRefs= [
    useRef(null),
    useRef(null),
    useRef(null),
  ];




  
  // Handle input changes
  const handleInputChange = (field, value) => {
    // receives only nunbers
    if (!/^\d*$/.test(value)) {
      return;
    }
  
    // update the state
    const dateValues = {...timeData};
    dateValues[field] = value;
    setTimeData(dateValues);
    
    // find the current index from field
    let currentIndex = -1;
    for (const key in fieldMapping) {
      if (fieldMapping[key] === field) {
        currentIndex = Number(key);
        break;
      }
    }
    
    
    // if it found the index and doesn't last field
    if (currentIndex !== -1 && currentIndex < inputsRefs.length - 1 && inputsRefs[currentIndex + 1].current) {
      // for 'years', move after 4 characters
      if (field === 'years' && value.length >= 4) {
        inputsRefs[currentIndex + 1].current.focus();
      }
      // For others fields, move after 2 characters
      else if (field !== 'years' && value.length >= 2) {
        inputsRefs[currentIndex + 1].current.focus();
      }
    }
  };


  // if press Enter Button, go to the next field
  function keydownButton(index, event){

    if(event.key === 'Enter'){
      if(index < inputsRefs.length - 1){
        inputsRefs[index + 1].current.focus();
      }
    }

    // if press backspace Button, go to the last field
    if(event.key === "Backspace"){
      const field = fieldMapping[index];
      const value = timeData[field]
      
      
      if(value === '' || event.target.selectionStart === 0)
        if(index > 0){
          event.preventDefault();
          inputsRefs[index - 1].current.focus();
          
          const prevfield = fieldMapping[index - 1];
          const prevvalue = timeData[prevfield]

          setTimeout(()=>{
            inputsRefs[index -1].current.setSelectionRange(
              prevfield.length,
              prevvalue.length
            )
          },0);
          };

    }
  }











// when timeDate changes, dispatch the acion to update Redux store;
// if isn't check the erros and send considition to doesn't count the numbers
useEffect(()=>{
  if(timeData.years !== ''||timeData.months !== '' || timeData.days !== ''){
    dispatch(setdate(timeData.years, timeData.months, timeData.days))
    }

}, [timeData,dispatch])











  
  // Map input fields to their corresponding state keys
  const fieldMapping = {
    0: 'days',
    1: 'months',
    2: 'years'
  };
  

  // to check if Submit component can calc the time 

  useEffect(()=>{
    if(timeData.years.length === 4){
      props.canSubmit(true);
    } else{
      props.canSubmit(false);
    }
    checkError();
  },[timeData.years, props.canSubmit])
  
  
  function checkError(){

    const invalidDay = timeData.days > 31 || timeData.days < 0;
    const invalidMonth = timeData.months > 12 || timeData.months < 0;
    const invalidYear = timeData.years > new Date().getFullYear() || timeData.years < 0;
  
    const emptyDay = timeData.days === "";
    const emptyMonth = timeData.months === "";
    const emptyYear = timeData.years === "";
  
    setFieldErros({
      days: {empty: emptyDay, invalid: invalidDay},
      months: {empty: emptyMonth, invalid: invalidMonth},
      years: {empty: emptyYear, invalid: invalidYear},
    });

  }

  const [validationTriggered, setValidationTriggered] = useState(false); // to valid Error
  const [fieldErrors, setFieldErros] = useState({
    days: {empty: false, invalid: false},
    months: {empty: false, invalid: false},
    years: {empty: false, invalid: false}
  });


  useEffect(()=>{
    props.submitCheck === true? setValidationTriggered(true): setValidationTriggered(false) ; 
  },[props.submitCheck])

      // functions to show if should show the erros:
      function shouldShowEmptyError(field){
        return validationTriggered && fieldErrors[field].empty;
      }
      function shouldShowInvalidError(field){
        return validationTriggered && fieldErrors[field].invalid
      }


  return (
    <div className="ageForm">
      {inputsArray.map((input, index) => (
        <label className="label-Info" key={input.title}>
          <span className="span-Info">{input.title}</span>
          <input 
              ref={inputsRefs[index]}
              className="input-Info"
              type="text"
              placeholder={input.placeholder}
              maxLength={fieldMapping[index] === 'months' ? 2 : (fieldMapping[index] === 'days' ? 2 : 4)}
              value={timeData[fieldMapping[index]]}
              onChange={(e) => handleInputChange(fieldMapping[index], e.target.value)}
              onKeyDown={(e)=> keydownButton(index,e)}
            />

              {shouldShowEmptyError(fieldMapping[index])
                &&<span className="error-message">{input.invalid}</span>}
              {shouldShowInvalidError(fieldMapping[index])
                &&<span className="error-message">{input.empty}</span>}


          
        </label>
      ))}
    </div>
  );
}

export default AgeContainer;