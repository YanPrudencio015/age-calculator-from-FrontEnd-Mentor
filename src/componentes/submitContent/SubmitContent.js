import React, { useEffect, useState } from "react";
import './submitcontent.css'

// redux
import { useSelector, useDispatch } from "react-redux";
import { gettimelived } from "../../redux/TimeLiveReducer";

function SubmitContent(props) {
    const stateGetDate = useSelector(state => state.getUserDate.dateObject);
    const dispatch = useDispatch();
    const [canSend, setCanSend] = useState(false);

    useEffect(() => {
        setCanSend(props.canCalcDate === true);
    }, [props.canCalcDate]);

    // Using useEffect for event listener to avoid adding multiple listeners
    useEffect(() => {
        const handleKeyDown = (e) => {
            if(canSend === true && e.key === 'Enter'){
                handleDate();
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [canSend]); // Dependency array includes canSend

    function handleDate() {
        props.submitCheck(true);

        // Convert string values to numbers
        let turnToNumbers = Object.fromEntries(
            Object.entries(stateGetDate).map(([key, value]) => {
                if (typeof value === 'string') {
                    const convertedNumber = !isNaN(value) && value.trim() !== '' ? +value : 0;
                    return [key, convertedNumber];
                }
                return [key, value];
            })
        );
        
        const updatedUserDate = {
            days: turnToNumbers.days, 
            months: turnToNumbers.months, 
            years: turnToNumbers.years,
        };
        
        // Validate all inputs
        if (isValidDate(updatedUserDate)) {
            calcTemp(updatedUserDate);
        } else {
            // If data is invalid, dispatch zeros or error values
            dispatch(gettimelived(0, 0, 0));
        }
    }
    
    // Function to validate date inputs
    function isValidDate(dateData) {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Basic validation checks
        if (
            typeof dateData.days !== 'number' || 
            typeof dateData.months !== 'number' || 
            typeof dateData.years !== 'number'
        ) {
            return false;
        }
        
        // Additional validation rules
        if (
            dateData.days <= 0 || dateData.days > 31 ||
            dateData.months <= 0 || dateData.months > 12 ||
            dateData.years <= 0 || dateData.years > currentYear
        ) {
            return false;
        }
        
        // Check for valid day of month
        const lastDayOfMonth = new Date(dateData.years, dateData.months, 0).getDate();
        if (dateData.days > lastDayOfMonth) {
            return false;
        }
        
        // Check if date is in the future
        const inputDate = new Date(dateData.years, dateData.months - 1, dateData.days);
        if (inputDate > today) {
            return false;
        }
        
        return true;
    }
    
    function calcTemp(dateData) {
        let date = new Date();
        let newYear = date.getFullYear() - dateData.years;
        let newMonths = date.getMonth() + 1 - dateData.months; 
        let newDays = date.getDate() - dateData.days;
    
        if(newMonths < 0){
            newYear--;
            newMonths += 12;
        }
    
        if(newDays < 0){
            newMonths--;
            const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            newDays += lastDayOfLastMonth;
            
            if(newMonths < 0){
                newMonths += 12;
                newYear--;
            }
        }

        dispatch(gettimelived(newYear, newMonths, newDays));
    }
   
    return (
        <div className="submit-section" 
            tabIndex="0"
            onClick={handleDate}
            style={{cursor: 'pointer'}}>
            <svg className="svg-class" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" strokeWidth="2">
                    <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                </g>
            </svg>
        </div>
    );
}

export default SubmitContent;