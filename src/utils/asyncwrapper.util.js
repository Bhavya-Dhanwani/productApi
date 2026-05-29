// Making a async wrapper to handle the async funcitons
function asyncwrapper(fn) {

    // returning the Promise
    return (req, res, next) => {

        // Made the promise to handle the async and non async controller
        Promise.resolve(fn(req, res, next)).catch(err => next(err));

    }

}

export default asyncwrapper;