import jwt from "jsonwebtoken";
import config from "../JWT/config";
export default function (req: any, res: any, next: any) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Користувач не ввійшов у систему" });
        }
        const decodedData = jwt.verify(token, config.secret);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Користувач не ввійшов у систему" });
    }
}
