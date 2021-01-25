import axios from 'axios';


export const chineseAPI = async () => {
    try {
      const chinese = await axios
      .get("http://localhost:5000/chinese/")
      return chinese;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
      
}