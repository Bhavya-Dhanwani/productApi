// function to filter the data
function sanitize({ name, email, _id }) {

    // returned the filtered data as the password id removed
    return {
        id: _id,
        name,
        email,
    }

}

export default sanitize;