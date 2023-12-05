import React from 'react'

export default function CutomInputField({ name, value, setValue, inputMode }) {
  return (
    <div>
      <input
        name={name}
        value={value && value !== null ? value : ''}
        onChange={(e) => { console.log(e.target.value); setValue(e.target.value); }}
        inputMode={inputMode}
      />
    </div>
  )
}
