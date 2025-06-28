import {
    GET_DATA_DEDUCTION_SUCCESS,
    GET_DATA_DEDUCTION_FAILURE,
    CREATE_DATA_DEDUCTION_SUCCESS,
    CREATE_DATA_DEDUCTION_FAILURE,
    UPDATE_DATA_DEDUCTION_SUCCESS,
    UPDATE_DATA_DEDUCTION_FAILURE,
    DELETE_DATA_DEDUCTION_SUCCESS,
    DELETE_DATA_DEDUCTION_FAILURE
} from '../../action/DeductionDataAction/DeductionDataActionTypes';

const initialState = {
    DeductionData: [],
    message: null,
    error: null
};

const DeductionDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_DEDUCTION_SUCCESS:
            return {
                ...state,
                DeductionData: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_DEDUCTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_DATA_DEDUCTION_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_DATA_DEDUCTION_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DATA_DEDUCTION_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_DATA_DEDUCTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_DATA_DEDUCTION_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_DATA_DEDUCTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default DeductionDataReducer;
