import { useEffect,useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts=()=>{
    const [user,setUser]=useState([]);
    const {authorizationToken}=useAuth();

    const getAllUserData=async()=>{
        try{
            // using get so we dosent need to pass body
            const response=await fetch("http://localhost:5000/api/admin/contacts",{
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
        const response=await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
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
          <table style={{ width : 1000}}>
            <thead >
                <tr>
                    <th style={{ width : 250}}>Name</th>
                    <th style={{ width : 250}}>Email</th>
                    <th style={{ width : 250}}>Message</th>
                    <th style={{ width : 250}}>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
             user.map((curUser,index)=>{
              return(
                <tr key={index} style={{ width : 1000}} >
                    <td style={{ width : 200}}>{curUser.username}</td>
                    <td style={{ width : 200}}>{curUser.email}</td>
                    <td style={{ width : 200}}> 
                        {curUser.message}
                    </td>  
                    <td style={{ width : 200}}><button onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
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