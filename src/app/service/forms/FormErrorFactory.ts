export class FormErrorFactory {

    public static getErrors(error : any) {
        const fe = new FormErrors({});

        if(!error) {
            return fe;
        }

        const errorData = error.json().errors.children;
        let formErrors = {};
        // iterate the keys in errors
        for(let key in errorData) {
            errorData[key].errors ? formErrors[key]=errorData[key].errors[0] : formErrors[key] = null;
        }

        return fe.setData(errorData);
    }

}


class FormErrors {

    constructor(private __data: any) {
    }

    public getError(key) {
        return this.__data[key] ? this.__data[key].errors : false;
    }

    public getErrorClass(key) {
        if(!this.getError(key)) {
            return null;
        }

        return 'has-error';
    }

    public hasError(key) {
        return !!this.getError(key);
    }

    public setData(data) {
        this.__data = data;

        return this;
    }
}