import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"

class userController{
    async create(req: Request, res: Response){
        const { email } = req.body
        const { tagId } = req.params
        let user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            user = await prisma.users.create({
                data:{
                    email: email,
                    tags: {
                        connect:{
                            id: parseInt(tagId)
                        }
                    }
                }
            })
        }


        await prisma.users.update({
            where:{
                email: email,
            },
            data:{
                tags: {
                    connect:{
                        id: parseInt(tagId)
                    }   
                }
            }
        })

        res.send("User has been created")
    };

    async disconnect(req: Request, res: Response){
        const { email, tagId } = req.body

        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(401).send("User not found")
        }

        if(tagId){
            await prisma.users.update({
                where: {
                    email: email
                },
                data:{
                    tags:{
                        disconnect:{
                            id: tagId
                        }
                    }
                }
            })

            return res.send("User removed from " + tagId)  
        }

        await prisma.users.delete({
            where:{
                email: email
            }
        })

        res.send("User has been deleted")

        
    };

}

export default new userController();