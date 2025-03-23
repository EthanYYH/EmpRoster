import axios from "axios"
import { API_URL } from "../../dbURL";
import { useAuth } from "../../AuthContext";

export const LogUserOut = async (email) => {
    const { logout } = useAuth();

    // console.log(email)
    try {
        const response = await axios.post(`${API_URL}/logout`, email);
        logout();
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

export default {
    LogUserOut
}