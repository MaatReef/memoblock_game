import {MemoBlock} from "../MemoBlock/MemoBlock";
import "./Tablero.css"

export function Tablero({animating, handleMemoClick, memoBlocks}){
    return (
        <div>
            <h1 className='title-memo'>REACT - MEMOBLOCK 🎯</h1>
            <main className="board">
                {memoBlocks.map((item, index) =>{
                    return <MemoBlock 
                                key={`${index}_${item.emoji}`} 
                                memoBlock={item}
                                animating={animating}
                                handleMemoClick={handleMemoClick}/>
                })}
            </main>
        </div>)
}