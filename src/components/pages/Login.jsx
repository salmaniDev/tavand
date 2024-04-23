import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThreeDots } from 'react-loader-spinner'

// styles
import '../../assets/sass/components/templates/login/login.scss'

// images
import topLogo from '../../assets/images/Login_Logo.png'
import bottomLogo from "../../assets/images/logo2.png";

// helper
import validation from '../../helper/validation';

function Login({ setLoginSuccess }) {

    const [values, setValues] = useState({ name: '', password: '' })
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const changeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault();
        setErrors(validation(values))

        if (Object.keys(errors).length === 0 && values.name !== '' && values.password !== '') {
            const data = {
                "username": values.name,
                'password': values.password
            }
            setLoading(true)
            const postData = async () => {
                try {
                    let res = await axios.post('http://api.faash.tavand.ir/api/login', data)
                    localStorage.setItem('usename', res.data.name)
                    localStorage.setItem('Lock', false)
                    localStorage.setItem('token', res.data.token)
                    toast.success('ورود با موفقیت انجام شد')
                    setLoading(false)
                    setTimeout(() => {
                        setLoginSuccess(true)
                    }, 1500)
                } catch (err) {
                    console.log(err);
                    toast.error('نام کاربری یا رمز عبور اشتباه است')
                    setLoading(false)
                }
            }
            postData()
        }
    }
    
    return (
        <>
            <div className='loginBox'>
                <div className="box">
                    <div className="top">
                        <img className='image' src={topLogo} alt="image" />
                        <p className="desc">سیستم مدیریت صورتحساب های الکترونیکی</p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <span className='title'>لطفا نام کاربری و رمز عبور خود را وارد کنید</span>
                        <div className="item">
                            <div className={`inputBox ${!!errors.name ? 'error' : ''}`}>
                                <input type="text" placeholder='نام کاربری' autoComplete='off' name='name' value={values.name} onChange={changeHandler} />
                                <i className='icon icon-login'></i>
                            </div>
                            {!!errors.name && <p className='errorMessage'>{errors.name}</p>}
                        </div>
                        <div className="item mb-0">
                            <div className={`inputBox ${!!errors.password ? 'error' : ''}`}>
                                <input type="password" placeholder='*****' autoComplete='off' name='password' value={values.password} onChange={changeHandler} />
                                <i className='icon icon-Key1'></i>
                            </div>
                            {!!errors.password && <p className='errorMessage'>{errors.password}</p>}
                        </div>
                        <button className='submit' type='submit'>{!!loading ? <ThreeDots wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '23px' }} height="40"
                            width="40"
                            radius="9"
                            color="#fff"
                            ariaLabel="three-dots-loading" /> : "ورود"}</button>
                    </form>
                    <img className='bottomLogo' src={bottomLogo} alt="" />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login