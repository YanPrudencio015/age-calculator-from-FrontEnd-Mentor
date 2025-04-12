const GET_TIMELIVED = 'GET_TIMELIVED';

export function gettimelived(years, months, days){
    return({
        type: GET_TIMELIVED,
        payload:{years, months, days}
    })
}


const initialState = {
    TimelivedObj:{
        years:0,
        months:0,
        days:0,
    }
}

export function SendTimeLived(state = initialState, action){
    switch(action.type){
        case GET_TIMELIVED:
            return{...state, 
                    TimelivedObj:{
                        years: action.payload.years,
                        months: action.payload.months,
                        days: action.payload.days,
                    }
                
            }
            default: 
            return state;

    }
}