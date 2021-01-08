import {Router} from "express"
const routes = Router()

import userController from "./controllers/userController"
import newsletterController from "./controllers/newsletterController"
import tagsController from "./controllers/tagsController"

routes.post("/newsletter/create", newsletterController.create)
routes.post("/newsletter/delete", newsletterController.delete)

routes.post("/user/create", userController.create)
routes.post("/user/remove", userController.disconnect)

routes.get("/tags", tagsController.index)

export default routes