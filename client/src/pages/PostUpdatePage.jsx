import React ,{ useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import * as styled from "../styles/styledComponents";
import ImageUploader from "../components/writing/ImageUploader";
import UpdateContent from "../components/writing/UpdateContent";
import axios from "axios";


const PostsUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [newDetail, setNewDetail] = useState({});

    const getPost = async () => {
        const postId = id;

        try {
            const response =  await axios.get(`/api/posts/getPost?id=${postId}`);
            setNewDetail(response.data.list);
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleSubmitEditPosts = async (e) => {
        e.preventDefault();

        const updatePosts = {
            _id: newDetail._id,
            title: newDetail.title,
            content: newDetail.content,
        }

        try {
            if(window.confirm("게시물 내용을 수정하시겠습니까?")) {
                const response = await axios.put("/api/posts/update" , updatePosts);

                if(response.data.updateSuccess === false) {
                    alert(response.data.messsage);
                    return;
                }
                
                if(response.data.updateSuccess === true) {
                    navigate(-1 , {replace: true});
                    alert(response.data.messsage);
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    return (
        <>
        <div className ="editor-container">
            <form 
            className ="editor-form"
            onSubmit ={ handleSubmitEditPosts }>

                <div className ="content-container">
                    <ImageUploader/>
                    <UpdateContent 
                    newDetail ={ newDetail }
                    setNewDetail ={ setNewDetail }
                    />
                </div>
                
                <div className ="writing-button__container">
                    <styled.DeleteButton
                    className ="writing-button__delete delete-btn"
                    type ="button"
                    onClick={() => {
                        if(window.confirm("게시글 수정을 취소 하시겠어요?")) {
                            navigate(-1, { replace: true });
                            return;
                        }
                    }}>
                        취소
                    </styled.DeleteButton>

                    <styled.SubmitButton
                    type ="submit"
                    className ="writing-button__submit default-btn">
                        수정
                    </styled.SubmitButton>
                </div>
            </form>
        </div>
        </>
    );
};

export default PostsUpdatePage;