import {Router} from "express"
const routes = Router()

import userController from "./controllers/userController"
import newsletterController from "./controllers/newsletterController"
import tagsController from "./controllers/tagsController"

routes.post("/user/create", userController.create)
routes.post("/newsletter/create", newsletterController.create)
routes.get("/tags", tagsController.index)

export default routes