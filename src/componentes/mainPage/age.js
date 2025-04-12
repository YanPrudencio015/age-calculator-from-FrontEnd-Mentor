import React, { useEffect, useState } from "react";
import './age.css';
// components
import AgeContainer from "../ageContainer/AgeContainer";
import Submit from '../submitContent/SubmitContent';
import Time from "../timeLived/Time";
// redux
import {Provider} from 'react-redux'
import { createStore, combineReducers } from "redux";
import { GetDateReducer } from "../../redux/GetDateReducer";
import { SendTimeLived } from "../../redux/TimeLiveReducer";


// combineReducers can use one more reducer at same time in the same project
const reducers = combineReducers({
    getUserDate: GetDateReducer,
    userTimeLived: SendTimeLived,
})
const store = createStore(reducers)


 function AgeCalc(props){
    const[canSubmit, setCanSubmit] = useState(false);
    const[checkErros, setCheckErros] = useState(false); 
    const[showNumbers, setShowNumbers] = useState(false); // check is have any erros on date validation



    return(
        <Provider store={store}>
            <div className="ageCalc">
                <div className="ageContainer">
                    <AgeContainer 
                        canSubmit={setCanSubmit} 
                        submitCheck={checkErros} 
                        dontShowNumbers={setShowNumbers} 
                        />
                    <Submit canCalcDate={canSubmit} submitCheck={setCheckErros}/>
                    <Time dontShowNumbers={showNumbers}/>
                </div>
            </div>
        </Provider>
    )
}


export default  AgeCalc



// próximo passo é colocar os inputs responsivos para todas as telas e depois, 
// após colocar o botão de envio, fazer a lógica nos botões  