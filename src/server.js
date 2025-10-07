
import ENVIROMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import workspace_router from "./Routes/Workspace.route.js";
import user_route from "./Routes/User.route.js";
import express from 'express';
import auth_router from "./Routes/auth.router.js";
import cors from 'cors';
import authMiddleware from "./Middlewares/auth.middleware.js";
import MemberWorkspace from "./models/MemberWorkspace.model.js";
import MemberWorkspaceRepository from "./repositories/MemberWorkspace.reporitory.js";

/* 
const token_test = jwt.sign(
    {
        nombre: 'PruebaToken'
    },
    ENVIROMENT.JWT_SECRET_KEY,
    {
        expiresIn: '1d'
    }
)

console.log(token_test) */


connectMongoDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/workspace', workspace_router)

app.use('/api/user', user_route)

app.use('/api/auth', auth_router)


app.get('/ruta-protegida', authMiddleware, (request, response) => {
    console.log(request.user)
    response.send({
        ok: true
    })
})

app.listen(
    8080,
    () => {
        console.log("Server en funcionamiento")
    }
)


