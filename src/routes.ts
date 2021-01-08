import {Router} from "express"
const routes = Router()

import userController from "./controllers/userController"
import newsletterController from "./controllers/newsletterController"

routes.post("/user/create", userController.create)
routes.post("/newsletter/create", newsletterController.create)


export default routes