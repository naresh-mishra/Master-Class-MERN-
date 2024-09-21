import { NavLink } from "react-router-dom";
export const Error=()=>{
    return(
        <>
         <section id="error-page">
            <div className="container content">
                <h2 className="header">404</h2>
                <h4>Sorry!Page not found</h4>
                <p>
                    OOPS! It seems like the dpage you are trying to acess doesn't exist.
                    If you believe there is an issue ,feel free to report it,and Well
                    look into it.
                </p>
                <div className="btns">
                    <NavLink to="/">Return Home</NavLink>
                    <NavLink to="/contact">Report Problem</NavLink>
                </div>
            </div>
         </section>
        </>
    )
}