import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faX } from '@fortawesome/free-solid-svg-icons'
import { RxAvatar } from 'react-icons/rx';
import { getSessionStorage } from '../../controllers/getSessionStorage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { getShopDetailsApi } from '../../sections/shop/apiCalls/getShopDetails';
import { setActiveShop } from '../../../redux/activeShop';
import { setShopListDetails } from '../../../redux/shopListDetails';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaLayerGroup } from 'react-icons/fa';
import { server_baseurl } from '../../../baseUrl';
import { boxImg, pharmLogo, portImg } from '../../../assets/images';

interface DashboardHeaderProps{
    setHeaderToggle: React.Dispatch<React.SetStateAction<boolean>>; 
    headerToggle: boolean;
    logoutHandle: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setHeaderToggle, headerToggle, logoutHandle }) =>{
    const activeShop = useSelector((state: RootState) => state.activeShop); 
    const shopListDetails = useSelector((state: RootState) => state.shopListDetailsList);
    const [activeLink, setActiveLink] = useState("dashboard");
    const dispatch = useDispatch();
    
    const userShop = getSessionStorage();
    const { user } = userShop;

    useEffect(() =>{
        const shopDetails = getShopDetailsApi()
        shopDetails.then(data =>{
            if(!activeShop.shop && data !== undefined) {
                sessionStorage.setItem("activeshop", JSON.stringify(data[0]));
                dispatch(setActiveShop({shop: data[0]}));
            }
            dispatch(setShopListDetails(data));
        })
    },[shopListDetails.length === 0]);

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement>= (e) =>{
        const target = e.currentTarget as HTMLAnchorElement;

        const value = target.id;
        setActiveLink(value); 
    };

    const logo_url = activeShop.shop?.logo_path ? 
                    `${server_baseurl}/uploads/${activeShop.shop?.logo_path}` : `${pharmLogo}`;

    return(
            <header className="header dropdown border-bottom border  " id="header">
                {/* <div onClick={() => setHeaderToggle(!headerToggle)} 
                    className="header_toggle" id="header-toggle">
                    {headerToggle ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} /> }
                </div> */}
                <div className='d-flex text-xl column-gap-0'>
                    <Link onClick={handleLinkClick} id='dashboard' to="/user/dashboard" className="nav_logo column-gap-0 px-md-2 px-0 mb-0"> 
                        <img src={logo_url} alt="" className='rounded' 
                            style={{height: "30px", width:"30px"}}
                        />
                        {/* <span className="text-white ">{activeShop?.shop?.shop_name}</span>  */}
                    </Link>
                    <Link onClick={handleLinkClick} id='dashboard' to= "/user/dashboard"
                        className={`${activeLink === 'dashboard'? 'border-bottom border-primary border-2 ' :"" }nav_link text-dark px-1 px-md-2 column-gap-0 mx-2 mb-0`}>
                        <MdDashboard size={24}/>
                        {/* <span className="nav_name ">Dashboard</span> */}
                    </Link>
                    <Link onClick={handleLinkClick} id='boxes' to="/user/inventory/product-group" 
                        className={`${activeLink === 'boxes'? 'border-bottom border-primary border-2 ' :"" }nav_link column-gap-0 px-1 px-md-2 mx-2 mb-0`}>
                        <img src={boxImg} alt="" className='rounded' 
                            style={{height: "24px", width:"24px"}}
                        />
                        {/* <FaLayerGroup size={24}/> */}
                        {/* <span className="nav_name">Product Groups</span> */}
                    </Link>
                    <Link onClick={handleLinkClick} id='ports' to="/user/inventory/product-list" 
                        className={`${activeLink === 'ports'? 'border-bottom border-primary border-2 ' :"" } nav_link column-gap-0 px-1 px-md-2 mx-2 mb-0`}>
                        <img src={portImg} alt="" className='rounded' 
                            style={{height: "24px", width:"24px"}}
                        />
                        {/* <span className="nav_name">Product Groups</span> */}
                    </Link>
                </div>
                <div className='dropdown'>
                    <div style={{cursor: "pointer"}} className="d-flex align-items-center dropdown-toggle" 
                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="header_img d-flex align-items-center">
                            <RxAvatar  size={32}/>  
                        </span>
                        <span className="ms-1">{user?.first_name}({user?.user_id})</span> 
                    </div>
                
                    <ul  className={`dropdown-menu droping dropdown-menu-right `} 
                        style={{padding: '0, 2rem'}} aria-labelledby="dropdownMenuButton1" >
                        {
                        shopListDetails.map((data, i) =>(
                            <li key={i} onClick={() => {
                                sessionStorage.setItem("activeshop", JSON.stringify(data));
                                dispatch(setActiveShop({shop: data}));
                            }
                            }>
                                <Link className="dropdown-item fw-semibold" to="#">
                                    {data?.shop_name}
                                </Link>
                            </li>
                        ))
                        }
                        <li>
                            {
                                shopListDetails.length ? null :
                                <Link className="dropdown-item" to="/user/register-shop">
                                    Register Company
                                </Link>
                            }
                            <Link className="dropdown-item" to="/user/change-pass">
                                Change Password
                            </Link>
                        </li>
                        <li><hr className="dropdown-divider"/></li>
                        
                        <li onClick={logoutHandle}>
                            <Link className="dropdown-item" to="#">
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
    )
}

export default DashboardHeader;