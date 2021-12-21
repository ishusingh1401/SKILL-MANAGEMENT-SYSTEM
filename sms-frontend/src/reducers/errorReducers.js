import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(action, state=initialState){

    switch(action){
        case GET_ERRORS:
            return action.payload;

        default:
            return state;
    }
}