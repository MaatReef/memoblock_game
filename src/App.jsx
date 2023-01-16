import { useState, useEffect } from 'react';
import {MemoBlock} from "./components/MemoBlock/MemoBlock";
import {Tablero} from "./components/Tablero/Tablero";

// Con el ... lo representamos como lista para luego poder mapearlo
const emojiList = [..."🎨🙌👌✔📑💾📽🎬"];

function App() {
  const [memobloquesbarajados, setmemobloquesbarajados ] = useState([]);

  const [animating, setAnimating] = useState(false);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);

  useEffect(() => {
    const barajadoEmojiLista = barajarArray([...emojiList, ...emojiList])
    setmemobloquesbarajados(
      barajadoEmojiLista.map((emoji, i) => ({
        index: i, 
        emoji, 
        flipped:false
      })));
  }, []); // Acá especificamos que el useEffect se setee 1 vez con []

  const barajarArray = (a) =>{
    for(let i = a.length-1; i>0; i--)  {
      const j = Math.floor(Math.random() * ( i + 1 ));
      [a[i], a[j]] = [a[j], a[i]];

    }
    return a;
  };

  const handleMemoClick = memoBlock => {
    const MemoBlockinvertido = {...memoBlock, flipped: true};  
    let memmobloquesbarajadosCopy = [...memobloquesbarajados];
    // Splice elimina o agrega de acuerdo al uso, 
    memmobloquesbarajadosCopy.splice(memoBlock.index, 1, MemoBlockinvertido)

    setmemobloquesbarajados(memmobloquesbarajadosCopy);
    if(selectedMemoBlock === null){
      setSelectedMemoBlock(memoBlock)
    }else if (selectedMemoBlock.emoji === memoBlock.emoji){
      setSelectedMemoBlock(null);
    }else{
      setAnimating(true);
      setTimeout(() => {
        memmobloquesbarajadosCopy.splice(memoBlock.index, 1, memoBlock)
        memmobloquesbarajadosCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock)
        setmemobloquesbarajados(memmobloquesbarajadosCopy)
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }

  };

  return (
    <div>
      <Tablero memoBlocks={memobloquesbarajados} handleMemoClick={handleMemoClick} animating={animating}/>
    </div>
  )
}

export default App
