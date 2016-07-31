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
    UPDATE_APPLIER_LIST_FAILURE
}
from '../constants/projectTypes';
import ajax from './apiAction';

// import tokenDecode from 'jwt-decode';
import {
    message
}
from 'antd';

export function publish(data, callback) {
    return {
        types: [PUBLISH_PROJECT_REQUEST, PUBLISH_PROJECT_SUCCESS, PUBLISH_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: '/projects',
                method: 'POST',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                project,
                success
            } = result.data;
            message.success(success);
            return {
                project,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function getProjects(data, callback) {
    return {
        types: [GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE],
        promise() {
            return ajax({
                url: '/projects',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                project,
                publishedProject,
                success
            } = result.data;
            return {
                project,
                publishedProject,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function getProject(_id, callback) {
    return {
        types: [GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: `/project/${_id}`,
                method: 'GET'
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                project,
                success
            } = result.data;
            return {
                project,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}

export function apply(data, callback) {

    return {
        types: [APPLY_PROJECT_REQUEST, APPLY_PROJECT_SUCCESS, APPLY_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'POST',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const success = result.data.success;
            message.success(success);
            return {
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function getAppliedProjects(data, callback) {
    return {
        types: [GET_APPLIED_PROJECT_REQUEST, GET_APPLIED_PROJECT_SUCCESS, GET_APPLIED_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function getApplierList(data, callback) {
    return {
        types: [GET_APPLIER_LIST_REQUEST, GET_APPLIER_LIST_SUCCESS, GET_APPLIER_LIST_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'GET',
                params: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function updateApplierList(data, callback) {
    return {
        types: [UPDATE_APPLIER_LIST_REQUEST, UPDATE_APPLIER_LIST_SUCCESS, UPDATE_APPLIER_LIST_FAILURE],
        promise() {
            return ajax({
                url: '/apply',
                method: 'PUT',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                applyList,
                success
            } = result.data;
            return {
                applyList,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function deleteProject(_id, callback) {
    return {
        types: [DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: `/project/${_id}`,
                method: 'DELETE'
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                _id,
                success
            } = result.data;
            return {
                _id: _id,
                success: success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
export function updateProject(data, callback) {
    return {
        types: [UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE],
        promise() {
            return ajax({
                url: `/project/${data._id}`,
                method: 'PUT',
                data: data
            });
        },
        after() {
            if (typeof callback === 'function') {
                callback();
            }
        },
        onData(result) {
            const {
                project,
                success
            } = result.data;
            return {
                project,
                success
            };
        },
        onError(error) {
            const msg = error.data.error;
            message.error(msg);
            return msg;
        }
    };
}
