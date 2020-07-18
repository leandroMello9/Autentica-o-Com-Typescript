import {Request, Response} from 'express'
import {getRepository, Repository} from 'typeorm'
import User from '../app/models/User'
class UserController {
    async store(req: Request, res: Response): Promise<User | any> {
        console.log('Hello')
        const respository = getRepository(User);
        const {email, password} = req.body;
        const usersExist =  await respository.findOne({where: {email}})
        
        if(usersExist) {
            return res.status(404).json({message: 'User exist'})
        }
        const user =  respository.create({
            email,
            password
        });
        await respository.save(user);

        
        return res.json(user);
       
        

    }

    async index(req: Request, res: Response):Promise<any> {
        const user = getRepository(User);
        const users = await user.find();

        return res.json(users)

      


    }


}
export default new UserController();