import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [options, setOptions] = useState({
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true
  });

  const generatePassword = (length, options) => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()<>,.?/;:{}[]-=_+";
    
    let allChars = "";
    let password = "";

    if(options.upperCase) {
      allChars += upperCase;
    }
    if(options.lowerCase) {
      allChars += lowerCase;
    }
    if(options.numbers) {
      allChars += numbers;
    }
    if(options.symbols) {
      allChars += symbols;
    }

    if(allChars.length === 0) {
      return "";
    } 

    for(let i=0;i<length;i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password;
  }

  const handleGeneratePassword = () => {
    let newPassword = generatePassword(length, options);
    setPassword(newPassword);
  };

  const handleCheckBoxChange = (event) => {
    const {name, checked} = event.target;
    setOptions({
      ...options,
      [name] : checked
    });
  };

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          alert('Password copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy password: ', err);
        });
    }
  };

  return(
    <div className='main'>
      <h1>Password Generator</h1>
      <div className='password-div'>
        {/* <p className="password">{password}</p> */}
        <input type="text" value={password} placeholder='Your password will appear here...' className='password' readOnly disabled />
        <i class="fa-solid fa-copy" onClick={handleCopyPassword}></i>
      </div>
      <div className='pw-length'>
        <p>Enter password length (5 - 50 characters)</p>
        <input className='length-inp' type="number" value={length} onChange={(e) => {setLength(Number(e.target.value))}} min="5" max="50" />
      </div>
      <div className='pw-type'>
        <div className='check'>
          <input onChange={handleCheckBoxChange} value={length} name='upperCase' checked={options.upperCase} type="checkbox" />
          <p>Include Upper Case</p>
        </div>
        <div className='check'>
          <input onChange={handleCheckBoxChange} value={length} name='lowerCase' checked={options.lowerCase} type="checkbox" />
          <p>Include Lower Case</p>
        </div>
        <div className='check'>
          <input onChange={handleCheckBoxChange} value={length} name='numbers' checked={options.numbers} type="checkbox" />
          <p>Include Numbers</p>
        </div>
        <div className='check'>
          <input onChange={handleCheckBoxChange} value={length} name='symbols' checked={options.symbols} type="checkbox" />
          <p>Include Symbols</p>
        </div>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
    </div>
  )
}

export default App
