import { useMemo } from "react";

export const imageHandler = async () => {

    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
         //이미지를 담아 전송할 file을 만든다
        const file = input.files?.[0];


        try {

            const compressedFile = await resizeFile(file);

            const imageUrl = await uploadImageToS3(compressedFile);

            //이미지 업로드 후
            //곧바로 업로드 된 이미지 url을 가져오기
            //useRef를 사용해 에디터에 접근한 후
            //에디터의 현재 커서 위치에 이미지 삽입
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            // 가져온 위치에 이미지를 삽입한다
            editor.insertEmbed(range.index, "image", imageUrl);

        }
        catch (error) {
            console.log(error);
        }
    });
};


export const modules = useMemo(() => {

    return {
        
            toolbar: {
                container: [
                    ["image"],
                    ["video"],  
                    [{ "header" : [1, 2, 3, 4, 5, 6, false] }],
                    [{ "align" : [] }],
                    ["bold"],
                    ["underline"],
                    ["strike"], 
                    ["blockquote"],
                    [{ "list" : "ordered" }],
                    [{ "list" : "bullet" }],
                    [{ "color" : [] }], 
                    [{ "background" : [] }],
                ],
                handlers: {
                    image: imageHandler
                }
            }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
} , []);


const formats = [
    "image",
    "video",
    "header",
    "align",
    "bold",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "ordered",
    "color",
    "background",
];