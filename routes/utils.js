function requireCustomer(req, res, next) {
    if (!req.customer) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.isAdmin) {
        next({
            name: "admin error",
            message: "you are not an admin please contact a current administrator"
        })
    }
    next()
}

module.exports = {
    requireCustomer,
    requireAdmin
}