import { useEffect,useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [user,setUser]=useState([]);
    const {authorizationToken}=useAuth();

    const getAllUserData=async()=>{
        try{
            // using get so we dosent need to pass body
            const response=await fetch(`${API_BASE_URL}/api/admin/contacts`,{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            const data=await response.json();
            setUser(data);
            // console.log(`user ${data}`);
        }catch(err){
            console.log(err);
        }
    }
    const deleteUser=async(id)=>{
      try{
        const response=await fetch(`${API_BASE_URL}/api/admin/contacts/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:authorizationToken,
            }
        });
        if(response.ok)
        {
            getAllUserData();
        }
      }catch(err){
        console.log("contact not deleted");
      }
    }
    useEffect(()=>{
        getAllUserData();
    },[]);
    return (
        <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Contact user data</h1>
            </div>
         <div className="container admin-users">
          <table >
            <thead >
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
             user.map((curUser,index)=>{
              return(
                <tr key={index}  >
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td> 
                        {curUser.message}
                    </td>  
                    <td><button onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
                </tr>
              )
              
             })
            }
            </tbody>
          </table>
        </div> 
        </section>
        </>
    )
}