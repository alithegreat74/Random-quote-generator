
import React, { useCallback, useEffect, useState } from 'react'

function Quote() {

  const [quote,setQuote]=useState(undefined);
  const [isDataLoaded,setDataLoaded]=useState(false);
  

  const apiFunction=useCallback(()=>{
    fetch('https://api.quotable.io/quotes/random')
    .then(response => response.json())
    .then(data =>{
      setQuote(data);
      setDataLoaded(true);
      console.log(data);
    });
  },[])
  
  useEffect(()=>{
    apiFunction();
  })

  return (
    <div className='quote'>
      {isDataLoaded?quote[0].content:<></>}
      
    </div>
  )
}

export default Quote
