import {Router} from "express"
const routes = Router()

import userController from "./controllers/userController"
import newsletterController from "./controllers/newsletterController"


routes.post("/newsletter/create", newsletterController.create)
routes.delete("/newsletter/delete", newsletterController.delete)
routes.post("/newsletter/:id", newsletterController.sendMail)


routes.post("/newsletter/:tagId/subscribe", userController.create)
routes.delete("/newsletter/unsubscribe", userController.disconnect)


export default routes