import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/noteType";

class NoteTypeService {
  getAllNoteTypes = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getNoteType = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addNoteType = (data) => {
    console.log("requesting post: ", data)
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateNoteType = (data) => {
        axios
            .put(API_URL + `/${data.noteTypeId}`, data, { headers: authHeader() })
            .then((response) => {
                if (response.data) {
                    console.log("Response: ", response.data)
                }

                return response.data;
            });
  };

  deleteNoteType = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new NoteTypeService();