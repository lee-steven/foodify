class Auth {
    constructor(){
        this.authenticated = false
    }

    login(){
        this.authenticated = true
    }

    logout(){
        this.authenticated = false
    }

    isAuthenticated(){
        return this.authenticated
    }
}

export default new Auth()