import jwt from 'jsonwebtoken'

export const chackToken = (req, res, next) => {


    let token = req.headers.token
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "First login" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY)
        req.user = result
        next()
    }
    catch (err) {
        next(err)
    }
}

export const chackTokenForAdmin = (req, res, next) => {
    let token = req.headers.token
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "First login" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY)
        req.user = result
        if (result.role == "ADMIN")
            next()
        else
            next(err)
    }
    catch (err) {
        next(err)
    }
}