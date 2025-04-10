import { getUserInfo } from "@/store/userSlice/userSlice";
import { createContext, useEffect, useState } from "react" ;
import { useSelector } from "react-redux";
import { io } from 'socket.io-client' ; 
export const socketcontext = createContext({socket: null}) ;

const SocketContextProvider = ({children}) =>{
    const [ socket , setSocket ] = useState() ;
    const userInfo = useSelector(getUserInfo);
 
  
    useEffect(() => {

      if( userInfo ){
        
      
        //  Instance Of Socket
        const newSocket = io(`${import.meta.env.VITE_BACKEND_BASE_URL}`,{
          query: { userId: userInfo?._id },
          withCredentials: true,
        });
      
        //  Updating Socket State On Sucessfull Connection
        newSocket.on("connect", () => { 
          setSocket(newSocket);
          console.log(
            `SOCKET CONNECTED SUCCESFULLY ON CLIENT SIDE :: ID ${newSocket.id}`
          );
        });


        newSocket.on("updated-application-status",(data)=>{
          console.log("Updated Status",data);
          
        })


      
        
        //  Triggers When Socket Joins On Client Side           
        newSocket.on("join-message", (data) => {
          console.log("JOIN RECIVED :: " + data);
          
        });
        newSocket.on("message", (data) => {
          console.log("RECIVED :: " + data);
          setMessages((prevState) => [data,...prevState]);
        });
     
        newSocket.on("typing-started",()=>{
          setTyping(true) ;
          console.log("The Other User Has Staretd Typing");
          
        })
        newSocket.on("typing-stopped",()=>{
          setTyping(false) ;
          console.log("The Other User Has Stopped Typing");
          
        })
        
    
        return () => {
          newSocket.close();
        };
      }
      }, [userInfo]);



      return <socketcontext.Provider value={{socket}}>
            {
                children
            }
      </socketcontext.Provider>
} ;



export default SocketContextProvider ;