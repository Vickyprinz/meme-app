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
  
  const allMemes = myMemes.map(meme => (
    <div key={meme.id} className="text-white p-4 mt-5 bg-slate-400 border ml-20 rounded-xl shadow">
      <p className=""><span className="text-black-900 font semi-bold">title: </span>{meme.title}</p>
      <p className=""><span className="text-black-900 font semi-bold">punchline: </span>{meme.message}</p>
    </div>
  ));
  

}
export default Meme