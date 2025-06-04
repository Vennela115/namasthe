import User from "./User";
import UserClass from "./UserClass";
const About=()=>{
    return(
        <div>
            <h1>
                Hi Hello all
            </h1>
            <User name={"Vennela Chitra (function)"} />
            <UserClass name={"Vennela Chitra (class)"} location={"Chiyyedu,Ananthapuram"}/>
        </div>
    );
};
export default About;