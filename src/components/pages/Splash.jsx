//images
import LogoImage from '../../assets/images/Login_Logo.png';


// style
import '../../assets/sass/base/splash.scss';

function Splash() {
    return (
        <div className='splashScreen'>
            <img src={LogoImage} alt='logo image' />
        </div>
    )
}

export default Splash