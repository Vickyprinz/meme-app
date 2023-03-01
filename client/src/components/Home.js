import Signin from "./Signin"
import Signup from "./Signup"
import { useNavigate} from "react-router-dom"


const Home = ({setIsAuthenticated}) => {

    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate('/allmemes')
       console.log("go to home now")
       setIsAuthenticated(true)
    }

    return ( 
      <div>
  
        <div className=" bg-cover bg-center flex flex-col justify-cente items-center text-white"  >
          <Signin handleSubmit={handleSubmit} />
        </div>
        <div className=" bg-cover bg-center flex flex-col justify-cente items-center text-white"  >
          <Signup handleSubmit={handleSubmit} />
        </div>

        
           
           {}
      </div>
     )
}

 
export default Home;