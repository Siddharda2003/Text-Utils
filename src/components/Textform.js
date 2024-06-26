import React, {useState} from 'react'

export default function Textform(props) {
    
  const [text,setText]=useState("Enter the text here")
  const onHandleChange = (event) =>{
    console.log("onHandleChange is intialized")
    setText(event.target.value)
  }
  const onHandleUpper = () =>{
    console.log("onHandleUpper is intialized")
    const newText=text.toUpperCase()
    setText(newText)
    props.showAlert("Converted to UpperCase","success")
  }
  const onHandleLower = () =>{
    console.log("onHandleLower is intialized")
    const newText=text.toLowerCase()
    setText(newText)
    props.showAlert("Converted to LowerCase","success")
  }
  const onHandleClear = () =>{
    console.log("onHandleClear is intialized")
    const newText=""
    setText(newText)
    props.showAlert("Text cleared","success")
  }
  const onHandleCopy = () =>{
    console.log("onHandleCopy is intialized")
    var textArea=document.getElementById("text-box")
    textArea.select()
    navigator.clipboard.writeText(textArea.value);
    document.getSelection().removeAllRanges()
    props.showAlert("Text copied","success")
  }
  const onHandlePaste = async () =>{
    console.log("onHandlePaste is intialized")
    try{
      let newText=await navigator.clipboard.readText()
      setText(text+newText)
      props.showAlert("Text pasted","success")
    }catch(error){
      console.log(error)
    }
  }
  const onHandleRemove = () =>{
    console.log("OnHandleRemove is intialized")
    const newText=text.split(/[ ]+/)
    setText(newText.join(' '));
    props.showAlert("Extra spaces removed","success")
  }
  return (
    <>
    <div style={{color:(props.mode==='light')?'black':'white'}}>
      <h2 className='mb-3'>{props.heading}</h2>
      <div className="mb-3" >
        <textarea className="form-control" value={text} style={{backgroundColor:(props.mode==='light')?'#13466e':'white',color:(props.mode==='light')?'white':'black'}}  onChange={onHandleChange} id="text-box" rows="8"></textarea>
      </div>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandleUpper}>Convert to Uppercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandleLower}>Convert to Lowercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandleClear}>Clear Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandleCopy}>Copy Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandlePaste}>Paste Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={onHandleRemove}>Remove Extra Space</button>
    </div>
    <div className="container my-3" style={{color:(props.mode==='light')?'black':'white'}}>
        <h2>Your text summary:</h2>
        <ul>
           <li>Number of words:{text.split(/\s+/).filter((element)=>{
            return element.length!==0
           }).length}</li>
           <li>Number of characters:{text.length}</li>
           <li>{text.split(/\s+/).filter((element)=>{
            return element.length!==0
           }).length*0.008} Minutes read</li>
           <li><h6>Preview:</h6>
           <p>{text.length>0?text:"Nothing to preview. "}</p>
           </li>
        </ul>
    </div>
    </>
    
  )
}
