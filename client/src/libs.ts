import axios from "axios";

class SearchService {

  async search(data: any) {
    try {
      return await axios.get(`${process.env.REACT_APP_BACKEND_URL}search?search_param=${data}`);
    } catch (e: any) {
      return e.message
    }
  }
}

export default new SearchService()