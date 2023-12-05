import React from 'react'

export default function CustomCheckboxField({name, checkValueList,setValue,selectedValue }) {
  return (
    <div>
      {checkValueList && checkValueList.length > 0 ?
        checkValueList.map((item) =>
          <>
            <label key={item.id}>
              <input
                name={name}
                type='checkbox'
                value={item.value}
                checked={item.selected? true : false}
                onChange={(e) => { console.log(item); setValue(item);}}
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
