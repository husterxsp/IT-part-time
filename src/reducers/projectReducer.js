import {
    PUBLISH_PROJECT_REQUEST,
    PUBLISH_PROJECT_SUCCESS,
    PUBLISH_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE,
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAILURE,
    APPLY_PROJECT_REQUEST,
    APPLY_PROJECT_SUCCESS,
    APPLY_PROJECT_FAILURE,
    GET_APPLIED_PROJECT_REQUEST,
    GET_APPLIED_PROJECT_SUCCESS,
    GET_APPLIED_PROJECT_FAILURE,
    GET_APPLIER_LIST_REQUEST,
    GET_APPLIER_LIST_SUCCESS,
    GET_APPLIER_LIST_FAILURE,
    UPDATE_APPLIER_LIST_REQUEST,
    UPDATE_APPLIER_LIST_SUCCESS,
    UPDATE_APPLIER_LIST_FAILURE,
    GET_EVALUATE_REQUEST,
    GET_EVALUATE_SUCCESS,
    GET_EVALUATE_FAILURE,
    CREATE_EVALUATE_REQUEST,
    CREATE_EVALUATE_SUCCESS,
    CREATE_EVALUATE_FAILURE
} from '../constants/projectTypes';

const initialState = {
    projects: [],
    detailProject: {},
    applyList: [],
    publishedProject: []
};

export default function project(state = initialState, actions = {}) {

    const {
        type,
        result,
        error
    } = actions;
    switch (type) {
        case PUBLISH_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                projects: [
                    result.project,
                    ...state.projects
                ]
            };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                projects: state.projects.filter(item =>
                    item._id !== result._id
                )
            };
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                projects: state.projects ? state.projects.map(item =>
                    item._id === result.project._id ?
                    Object.assign({}, item, result.project) :
                    item
                ) : [],
                publishedProject: state.publishedProject ? state.publishedProject.map(item =>
                    item._id === result.project._id ?
                    Object.assign({}, item, result.project) :
                    item
                ) : []
            };
        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                projects: result.project,
                publishedProject: result.publishedProject
            };
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                detailProject: result.project
            };
        case GET_APPLIED_PROJECT_SUCCESS:
        case GET_APPLIER_LIST_SUCCESS:
        case UPDATE_APPLIER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                applyList: result.applyList
            };
        case GET_EVALUATE_SUCCESS:
        case CREATE_EVALUATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                success: result.success,
                evaluateList: result.evaluateList
            };
        case PUBLISH_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case UPDATE_PROJECT_REQUEST:
        case GET_PROJECTS_REQUEST:
        case GET_PROJECT_REQUEST:
        case GET_APPLIED_PROJECT_REQUEST:
        case GET_APPLIER_LIST_REQUEST:
        case UPDATE_APPLIER_LIST_REQUEST:
        case GET_EVALUATE_REQUEST:
        case CREATE_EVALUATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PUBLISH_PROJECT_FAILURE:
        case DELETE_PROJECT_FAILURE:
        case UPDATE_PROJECT_FAILURE:
        case GET_PROJECTS_FAILURE:
        case GET_PROJECT_FAILURE:
        case GET_APPLIED_PROJECT_FAILURE:
        case GET_APPLIER_LIST_FAILURE:
        case UPDATE_APPLIER_LIST_FAILURE:
        case GET_EVALUATE_FAILURE:
        case CREATE_EVALUATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: error,
                success: ''
            };
        default:
            return state;
    }
}
