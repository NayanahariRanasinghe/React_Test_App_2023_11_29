import React from 'react'

export default function CutomInputField({ name, value, setValue, inputMode,onBlur }) {
  return (
    <div>
      <input
        name={name}
        value={value && value !== null ? value : ''}
        onChange={(e) => { console.log(e.target.value); setValue(e.target.value); }}
        inputMode={inputMode}
        onBlur={()=>{
          if(onBlur && onBlur!==null){
            onBlur()
          }
        }}
      />
    </div>
  )
}
