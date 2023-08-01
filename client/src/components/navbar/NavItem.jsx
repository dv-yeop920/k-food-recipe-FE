import React from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "../../store/slice/userSlice";
import { useSelector ,  useDispatch} from "react-redux";
import axios from 'axios';




const NavItem = ({ showLoginModal , setShowLoginModal , showSignUpModal , setShowSignUpModal}) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleClickLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            axios.post("/api/users/logout")
            .then((response) => {
                if(response.status === 200) {
                    dispatch(logoutUser());
                    console.log(response.data , response.status);
                    return navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
                return alert("로그아웃 하는데 실패 했습니다");
            });
        }
    }
    return (
        <>
        <div className="navbar-container">
            <nav className="navbar">
                <ul className="navbar__column">
                    <li
                    className="navbar-link"
                    onClick={() => {
                        if(user.loginSuccess === false) {
                            alert("회원만 이용할 수 있습니다");
                            return navigate("/signUp")
                        }
                        return navigate("/noticeBoard")
                    }}
                    >자유 게시판</li>
                    <li 
                    style={{borderBottom:"1px solid #ddd"}}
                    className="navbar-link"
                    onClick={() => {
                        if(user.loginSuccess === false) {
                            alert("회원만 이용할 수 있습니다");
                            return navigate("/signUp");
                        }
                        return navigate("/myPage");
                    }}>마이페이지</li>
                    <li 
                    className="navbar-link"
                    onClick={() => setShowSignUpModal(!showSignUpModal)}>
                        {user.loginSuccess === true ? "":"회원 가입"}
                    </li>
                    <li 
                    className="navbar-link"
                    onClick={(e) => {
                        setShowLoginModal(!showLoginModal);
                        if(e.target.value === "로그아웃")
                            return handleClickLogout();
                    }
                    }>
                        {user.loginSuccess === true ? "로그아웃":"로그인"}
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default NavItem;