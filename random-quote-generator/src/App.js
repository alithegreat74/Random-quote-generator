import { useEffect, useRef, useState } from 'react';
import './App.css';



function App() {
  const [isGuesserOpen,setGuesserOpen]=useState(false);
  const guesserRef=useRef(null);
  const inputRef=useRef(null);

  const [quote,setQuote]=useState(undefined);
  const [isDataLoaded,setDataLoaded]=useState(false);

  const getQuote=()=>{
    

    fetch("https://api.quotable.io/quotes/random")
     .then((res) => res.json())
     .then((data) => {
       setQuote(data);
       setDataLoaded(true);
       console.log(data);
     });
  }

  useEffect(()=>{
    if(!isDataLoaded)
      getQuote();
  })

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if(!guesserRef.current.contains(e.target)){
        setGuesserOpen(false);  
      }
    }
    if(isGuesserOpen)
      document.body.addEventListener('mousedown',handleClickOutside);
  })

  const guess=()=>{
    if(inputRef.current.value === quote[0].author){
      console.log('correct');
    }
    else{
      console.log('incorrect');
    }
  }
  
  
    
  
  return (
    <div className="App">
      <div className='quote-container'>
        <p className='start-quote quote-sign'>"</p>
        <div className='quote-background'>
          <div className='quote'>
            {isDataLoaded ? quote[0].content:<></>}
          
          </div>
        </div>
        <p className='end-quote quote-sign'>"</p>
      </div>
      <button onClick={()=> setGuesserOpen(true)} className='guess-button'>Guess who said this</button>
      <div className={`guesser-container ${isGuesserOpen? `active slideup`:`deactive` }`} ref={guesserRef}>
        <p className='guess-prompt'>Guess who said this</p>
        <input className='guess-input' type='text' ref={inputRef}/>
        <button className='submit' onClick={guess}>Guess</button>

      </div>
    </div>
  );
}

export default App;
