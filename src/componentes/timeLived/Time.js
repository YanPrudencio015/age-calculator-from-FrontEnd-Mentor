import React, { useState, useEffect } from "react";
import './time.css';
import { useSelector } from "react-redux";

function Time(props) {
    const UserTimeLived = useSelector(state => state.userTimeLived.TimelivedObj);

    const [timecount, setTimeCount] = useState({
        years: 0,
        months: 0,
        days: 0
    });



    if(timecount.years === 0){
        setTimeCount({years:'--', months:'--', days:'--'})
    }

    useEffect(() => {


        // Verifica se há valores para animar
        if (UserTimeLived && UserTimeLived.months) {
            // Cria uma função para animar os meses
            const animateMonths = () => {
                let currentMonths = 0;
                
                const monthInterval = setInterval(() => {
                    currentMonths++;
                    
                    setTimeCount(prev => ({
                        ...prev,
                        months: currentMonths
                    }));
                    
                    // Para quando atingir o número de meses desejado
                    if (currentMonths >= UserTimeLived.months) {
                        clearInterval(monthInterval);
                    }
                }, 20); // Intervalo de 100ms, ajuste conforme necessário
            };

            // Cria uma função para animar os anos
            const animateYears = () => {
                let currentYears = 0;
                
                const yearInterval = setInterval(() => {
                    currentYears++;
                    
                    setTimeCount(prev => ({
                        ...prev,
                        years: currentYears
                    }));
                    
                    // Para quando atingir o número de anos desejado
                    if (currentYears >= UserTimeLived.years) {
                        clearInterval(yearInterval);
                    }
                }, 20); // Intervalo de 200ms, ajuste conforme necessário
            };

            const AnimateDays = ()=>{
                let days = 0;
                const daysCount = setInterval(()=>{
                    days++;
                    setTimeCount((prev)=>({
                      ...prev,
                      days: days  
                    }))
                    if(days >= UserTimeLived.days){
                        clearInterval(daysCount);
                    }
                },50)


            }

            // Inicia as animações
            animateMonths();
            animateYears();
            AnimateDays();
        }
    }, [UserTimeLived]);

    // Atualiza dias quando UserTimeLived mudar
    useEffect(() => {
        if (UserTimeLived && UserTimeLived.days) {
            setTimeCount(prev => ({
                ...prev,
                days: UserTimeLived.days
            }));
        }
    }, [UserTimeLived]);

    const ageInfoArray = [
        { number: timecount.years, title: "years" },
        { number: timecount.months, title: "months" },
        { number: timecount.days, title: "days" },
    ];

    return (
        <div className="Age-info">
            {ageInfoArray.map((info, index) => (
                <div key={index} className="info-div">
                    <div className="number-square">
                    <p className="info-input">{info.number}</p>
                    </div>
                    <p className="info-title">{info.title}</p>
                </div>
            ))}
        </div>
    );
}

export default Time;