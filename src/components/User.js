import {useState} from "react";
const User=(props)=>
{
    const [count]=useState(0);
    const [count2]=useState(1);
    return(
        <div className="user-card">
            <h1>Count={count}</h1>
            <h1>Count={count2}</h1>
            <h2>Name : {props.name}</h2>
            <h3>Location:Chiyyedu,Ananthapuram</h3>
            <h4>Contact: vennelachitra@gmail.com</h4>
        </div>
    );
};

//loading creting new instance of clss
export default User;