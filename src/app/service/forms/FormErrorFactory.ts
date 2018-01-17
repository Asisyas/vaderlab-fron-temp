export class FormErrorFactory {

    public static getErrors(error : any) {
        const fe = new FormErrors({});

        if (!error) {
            return fe;
        }

        const ej = error.json();

        if (!ej['errors'] || !ej['errors']['children']) {
            return fe;
        }

        const errorData = ej.errors.children;
        const formErrors = {};
        // iterate the keys in errors
        for ( const key in errorData ) {
            if (!errorData.hasOwnProperty(key)) {
                continue;
            }
            errorData[key].errors ? formErrors[key] = errorData[key].errors[0] : formErrors[key] = null;
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

    public getErrorText(key) {
        const errors = this.getError(key);
        if (!errors) {
            return null;
        }

        return errors.join("\r\n");
    }

    public hasError(key) {
        return !!this.getError(key);
    }

    public setData(data) {
        this.__data = data;

        return this;
    }
}