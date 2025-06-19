import Axios from './Axios'
import SummaryApi from '../common/SummaryApi'

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetials
        })

        const token = localStorage.getItem("accessToken");
        if (!token) return;  // ✅ No token, skip API

        return response.data

    } catch (error) {
        console.log(error);
    }
}

export default fetchUserDetails