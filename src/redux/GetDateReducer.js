
const SET_DATE = "SET_DATE";


export function setdate (years,months,days){
return({
    type: "SET_DATE",
    payload:{years, months, days}
})
}

const initialDate ={
    dateObject:{
        years:0,
        months:0,
        days:0,
    } 
}


export function GetDateReducer(state = initialDate, action){
    switch(action.type){
        case SET_DATE:
            return{...state, 
                    dateObject:{
                        days:action.payload.days,
                        months:action.payload.months, 
                        years: action.payload.years, 
                    }
    }
    default:
        return state;
}
}