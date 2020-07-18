import {Request, Response} from 'express'
import {getRepository, Repository} from 'typeorm'
import User from '../app/models/User'
import bcrypt from 'bcryptjs';

import jtw from 'jsonwebtoken'
class AuthController {
    async store(req: Request, res: Response): Promise<User | any> {
        const respository = getRepository(User);
        const {email, password} = req.body;
        const user =  await respository.findOne({where: {email}})
      
       if(!user) {
           return res.status(400).json({message: 'User is not exist'})
       }

       const isValidPassword = await bcrypt.compare(password, user.password);
       
       if(!isValidPassword) {
        return res.status(400).json({message: 'Senha is not correct'})

       }
       const token = jtw.sign({ id: user.id }, 'secret', {expiresIn: '1d'})
        
       delete user.password
       return res.json({
           user,
           token
       })

    }

   

}
export default new AuthController();