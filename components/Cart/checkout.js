import { useRef,useState } from 'react';
import classes from './checkout.module.css';
const isempty = (value) =>{
    return(value.trim() !== '')
}

const Checkout = (props) =>{
    let isform = true;
    const [validform, setvalidform] = useState({
        name:true,
        street:true,
        postal:true,
        city:true,
    })
    const entername = useRef();
    const enterstreet = useRef();
    const enterpostal = useRef();
    const entercity = useRef();
  const submithandlers = (event) =>{
event.preventDefault();
  
    const saveentername = entername.current.value;
    const saveenterstreet = enterstreet.current.value;
    const saveenterpostal = enterpostal.current.value;
    const saveentercity = entercity.current.value;

    const validentername = isempty(saveentername)
    const validenterstreet = isempty(saveenterstreet)
    const validenterpostal = isempty(saveenterpostal)
    const validentercity = isempty(saveentercity)
    setvalidform({
        name:validentername,
        street:validenterstreet,
        postal:validenterpostal,
        city:validentercity,
    })

    isform = validentername && validenterstreet && validenterpostal && validentercity;
    if (!isform)   return 
   props.onConfirm({
       names:saveentername,
       streets:saveenterstreet,
       postals:saveenterpostal,
       city:saveentercity,
   })
     

}

    return <form className = {classes.form} onSubmit = {submithandlers}>
        <div className= {classes.control}>
            <label htmlFor = 'name'>Name</label>
            <input type ='text' id = 'name' ref = {entername}></input>
            {!validform.name ? <p>wrong name input</p> : '' }
        </div>
        
        <div className= {classes.control}>
            <label htmlFor = 'street'>street</label>
            <input type ='text' id = 'street' ref = {enterstreet}></input>
            {!validform.street ? <p>wrong street input</p> : "" }
        </div>
        
        <div className= {classes.control}>
            <label htmlFor = 'postal'>postal</label>
            <input type ='text' id = 'postal' ref = {enterpostal}></input>
            {!validform.postal ? <p>wrong postal input</p> : '' }
        </div>
       
        <div className= {classes.control}>
            <label htmlFor = 'name'>city</label>
            <input type ='text' id = 'city' ref = {entercity}></input>
            {!validform.city ? <p>wrong name input</p> : ''}
        </div>
     
        {<div className = {classes.actions}>
            <button className= {classes.button} onClick = {props.onCancel}> close </button>
            <button className = {classes.submit}  disabled = {!isform}> confirm </button>
        </div>}
    </form>
}
export default Checkout;