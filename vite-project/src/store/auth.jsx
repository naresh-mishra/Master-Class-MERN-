//we use hook called Contextapi and usecontext
import {useState,useEffect} from "react";
import {createContext,useContext} from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState("");
    const [isLoading,setIsLoading]=useState(true);
    const [services,setServices]=useState([]);
    const authorizationToken=`Bearer ${token}`;

    const storeTokenInLs=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };

    let isLoggedIn=!!token;
    //if token value true then isLoggedIn value true else false
    
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    };
    //JWt authentication-to get the currently logged in user data
    const userAuthentication=async()=>{
        try{
            setIsLoading(true);
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,//token from local storage
                },
            });
            if(response.ok){
                const data=await response.json();
                setUser(data.userData);
                setIsLoading(false);
            // console.log("userdata",data.userData);
        }
        else{
            user("");
            setIsLoading(false);
        }
        }catch(err){
            console.log("Error fetching user daata");
        }
    }
    const getServices=async()=>{
        try{
          const response=await fetch("http://localhost:5000/api/data/service",{
             method:"GET",
          });
          if(response.ok){
            const data=await response.json();
            console.log(`data getservices:${data.msg[0].service}`);
            setServices(data.msg);//get all the data in array foramtt
          }
        }catch(err){
            console.log(`services frontend err:${err}`);
        }
    };
    useEffect(()=>{//run code once whenever start 
        userAuthentication();
        getServices();
        },[]);

    return (
    <AuthContext.Provider value={{isLoggedIn,storeTokenInLs,LogoutUser,user,services,authorizationToken,isLoading}}>
        {children}
    </AuthContext.Provider>
    );
};
//useAuth function now contains the value provided by the AuthContext.Provider higher 
// up in the component tree
export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
                                                               
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
};