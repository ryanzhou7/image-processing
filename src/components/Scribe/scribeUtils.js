import { useSelector, useDispatch } from "react-redux";

function useStuff(){

    const additionalComments = useSelector((state) => state.downloadReducer.additionalComments);

    return{
        
    }
}