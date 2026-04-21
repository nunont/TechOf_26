import { useState, useMemo } from "react"


export default function useFilterText(values){
  const [text, setText] = useState("")
  const [onlyActives, setOnlyActives] = useState(false)
  const filterValues = useMemo(() => {
    console.log("Processing", values)
    let filterValues = values.filter(f => f.name.toLowerCase().includes(text.toLowerCase()))
    if (onlyActives){
      return filterValues.filter(f => f.active);
    }
    return filterValues;
  }, [text, onlyActives])

  return [text, setText, onlyActives, setOnlyActives, filterValues];
  
}