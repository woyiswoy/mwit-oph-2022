import { sign, verify } from "jsonwebtoken";

// export function generateAccessToken(user) {
//     return sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '10s' });
// }

export function generateAuthToken(user) {
    delete user['password']
    return sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}

// export function generateLocalToken(user) {
//     return sign({ id: user.id, email: user.email }, process.env.LOCAL_SECRET, { expiresIn: '7d' });
// }

export const authenticated = (fn) => async(req, res) => {
    verify(req.cookies.auth, process.env.REFRESH_SECRET, async function(err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(401).json({ message: 'Unauthorized' });
    })
}