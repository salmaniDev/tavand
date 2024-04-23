const validation = values => {

    let errors = {}

    if (!values.name) {
        errors.name = 'لطفا نام کاربری را وارد کنید'
    }

    if (!values.password) {
        errors.password = 'لطفا رمز عبور را وارد نمایید'
    }

     return errors

}

export default validation;