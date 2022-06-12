import React from 'react'

export default function AgendaFliterLabel({ item, filter, setFilter, filtersInitArray }) {

  const handleFilterChange = ({ target }) => {
    const { value, checked } = target;
    if (value === "all") {
      if (checked) setFilter(filtersInitArray);
      else setFilter([]);
    } else {
      if (checked) setFilter([].concat(filter, value)); // "all" will still be in filter if it's not unchecked by hand. so we need to clear it first.
      else setFilter( filter.filter(e => e !== "all" && e !== value) );
    }
  }

  return (
    <label className='form-label' htmlFor={item?.id}>
      <input
        className='form-input'
        type='checkbox'
        value={item?.value}
        checked={ 
          item.value === "all"
          ? (filter.length === filtersInitArray.length )
          : filter.indexOf(item.value) > -1
        }
        onChange={handleFilterChange}        
      />
      {item?.label}
    </label>
  )
}
