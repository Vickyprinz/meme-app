import Add_post from "./Add_post";
import {useState, useEffect} from "react";

const Meme = () => {
  const [Memes, setMemes] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:9292/users/1');
        const userData = await response.json();
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserData();
  }, []);
  

  
}
export default Meme