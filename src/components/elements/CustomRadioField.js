import React from 'react'

export default function CustomRadioField({name, checkValueList,setValue,selectedValue }) {
  return (
    <div>
      {checkValueList && checkValueList.length > 0 ?
        checkValueList.map((item) =>
          <>
            <label key={item.id}>
              <input
                name={name}
                type='radio'
                value={item.value}
                checked={selectedValue && selectedValue === item.value ? true : false}
                onChange={(e) => { console.log(e.target.value); setValue(item.value);}}
              />
              {item.value}
            </label>
          </>
        )
        : <></>
      }
    </div>
  )
}
