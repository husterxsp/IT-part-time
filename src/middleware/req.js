export default function req({
    dispatch,
    getState
}) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        const {
            promise,
            types,
            after,
            onData,
            onError
        } = action;
        if (!promise || !types) {
            return next(action);
        }
        const [REQUEST, SUCCESS, FAILURE] = types;
        next({
            type: REQUEST
        });
        return promise()
            .then(data => {
                return onData(data);
            })
            .then(result => {
                    next({
                        result,
                        type: SUCCESS
                    });
                    return after ? after(result) : null;
                },
                err => {
                    const error = onError(err);
                    return next({
                        error,
                        type: FAILURE
                    });
                })
            .catch(err => {
                console.error('MIDDLEWARE ERROR:', err);
            });
    };
}
