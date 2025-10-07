import Users from "../models/User.model.js"

class UserRepository {
    static async createUser(name, email, password){
        //logica de interaccion con DB para crear el usuario 
        const result = await Users.insertOne({
            name: name,
            email: email,
            password: password,
        })
        console.log(result)
        return result
    }

    //traer a todos los usuarios
    static async getAll(){
        //find es un metodo para hacer filtro en una coleccion 
        const users = await Users.find()
        return users
    }

    //Borrar usuario por id 
    static async deleteById(user_id){
        await Users.findByIdAndDelete(user_id)
        return true
    }

    //traer un usuario por el id
    static async getById(user_id){
        const user_found = await Users.findById(user_id)
        return user_found
    }

    //actualizar valores de un usuario 
    static async updateById(user_id, new_values){
        const user_updated = await Users.findByIdAndUpdate(
            user_id,
            new_values,
            {
                new: true //Cuando se haga la actualizacion nos traiga el objeto actualizado
            })
        return user_updated
    }

    static async getByEmail(email){
        const user = await Users.findOne({email: email})
        return user
    }
}


export default UserRepository
//Un metodo o propiedad estatica puede ser llamada desde la clase, sin necesidad de isntanciar dicha clase
//Por que usar estaticos? para no tener mas de una instancia del UserRpository


/* 
const UserRepository = new UserRepository()
UserRepository.createUser()
 */