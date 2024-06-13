"use server"
import React from 'react';
import CurrentWeekFreeHours from './current-week-free-hours';

const FreeDatesWeek = ({ currentDay }: { currentDay: string }) => {

  const fetchData = async () => {
    const dates = await CurrentWeekFreeHours();

    if(!dates){
      return
    }
    
    if ('error' in dates) {
      return <div>{dates.error}</div>;
    }
    if(currentDay === "понедельник"){
      return (
        <div>
          <p>Понедельник: {dates.Monday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "вторник"){
      return (
        <div>
          <p>Вторник: {dates.Tuesday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "среда"){
      return (
        <div>
          <p>Среда: {dates.Wednesday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "четверг"){
      return (
        <div>
          <p>Четверг: {dates.Thursday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "пятница"){
      return (
        <div>
          <p>Пятница: {dates.Friday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "суббота"){
      return (
        <div>
          <p>Суббота: {dates.Saturday.join(', ')}</p>
        </div>
      );
    }
    if(currentDay === "воскресенье"){
      return (
        <div>
          <p>Воскресенье: {dates.Sunday.join(', ')}</p>
        </div>
      );
    }

  };

  return (
    <div>
      {fetchData()}
    </div>
  );
};

export default FreeDatesWeek;