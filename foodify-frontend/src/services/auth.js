class Auth {
    constructor(){
        this.authenticated = false
        this.userId = null
    }

    login(id){
        this.authenticated = true
        this.userId = id
    }

    logout(){
        this.authenticated = false
        this.userId = null
    }

    isAuthenticated(){
        return this.authenticated
    }

    getUserId(){
        return this.userId
    }
}

export default new Auth()