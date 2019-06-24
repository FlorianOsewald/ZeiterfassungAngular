export class LoginViewDataModel {
    username: string;
    password: string;

    constructor() {

    }

    static load() {
        return new LoginViewDataModel();
    }
}
