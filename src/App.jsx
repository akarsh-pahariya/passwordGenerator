import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let specialCharacters = '!@#$%^&*()-_=+[{]}\|;:",<.>/?`~ ';
    if(num){
      str=str+numbers;
    }
    if(characters){
      str=str+specialCharacters;
    }
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random()*str.length);
      pass=pass+str[index]; 
    }
    setPassword(pass);
  }, [length, num, characters, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    console.log(passwordRef.current.value);
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(() => {passwordGenerator()},[length, num, characters, passwordGenerator]);
 
  return (
    <div>
      <div className="bg-black flex items-center h-screen w-full flex-col">
        <h1 className="text-white pt-14 font-mono text-5xl">Password Generator</h1>
        <div className="w-2/5 h-1/4 bg-slate-800 mt-20 flex-col flex items-center rounded-xl">
          <div className="flex w-5/6 h-10 mt-7">
            <input type="text" ref={passwordRef} readOnly value={password} className="rounded-l-lg w-4/5 text-xl font-semibold p-2"/>
            <button onClick={copyPassword} className="text-orange-600 bg-cyan-500 text-2xl w-1/5 rounded-r-lg">Copy</button>
          </div>
          <div className="flex text-xl text-white w-5/6 pt-10">
            <div className="basis-2/4">
              <input 
                type="range" 
                id="length" 
                min={8} 
                max={20} 
                value={length} 
                className="mr-1" 
                onChange={(e) => setLength(e.target.value)}/>
              <label for="length">Length ({length})</label>
            </div>
            <div className="basis-1/4">
              <input 
                type="checkbox" 
                id="number" 
                defaultChecked={num} 
                className="size-4 mr-1" 
                onChange={() => setNum((prev) => !prev)}  
                />
              <label for="number">Numbers</label>
            </div>
            <div className="basis-1/4">
              <input 
                type="checkbox" 
                id="characters" 
                defaultChecked={characters} 
                className="size-4 mr-1"
                onChange={() => setCharacters((prev) => !prev)}
                />
              <label for="characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
