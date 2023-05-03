import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './NoticeWrite.module.css';
// import style from './Notice.module.css';

function NoticeDetail({match, history}) {

    const {noticeIdx} = match.params;

    const [datas, setDatas] = useState([]);
    const [notice, setNotice] = useState({});
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    
    const handlerChangeTitle = e => setTitle(e.target.value);
    const handlerChangeContents = e => setContents(e.target.value);

    

    useEffect(() => {
        sessionStorage.setItem("token",'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY2FyIiwiZW1haWwiOiJhYWFAYWFhLmFhYSIsInN1YiI6ImFkbWluIiwianRpIjoiNWI5NjRiNjUtYTFjZC00ZTg2LTk1ZWUtYjBiZjExZDU1ZGM1IiwiaWF0IjoxNjgyNjY5NDA3LCJleHAiOjEwMzIyNjY5NDA3fQ.2Wmjibk8x_wdkaUyt28vETqI3E2zbQQDTSqF9BFkSjk');
        axios.get(`http://localhost:8080/api/notice/detail/${noticeIdx}` , {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
        .then(reponse => {
            console.log(reponse);
            setNotice(reponse.data);
                setTitle(reponse.data.title);
                setContents(reponse.data.contents);
        })
        .catch(error => console.log(error));
    },[]);

    const handlerClickList = () => {
        console.log(history);
        history.push('/notice');
    };

    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/api/notice/update/${noticeIdx}`,
        { "title": title, "contents": contents }) 
        .then(response => {
            console.log(response);
            if(response.data === 1) {
                alert('수정 완료');
            } else {
                alert('수정 실패');
                return;
            }
        })
        .catch(error => {
            console.log(error);
        console.log(error);
            alert(`수정에 실패했습니다.(${error.message})`)
            return;
        });
    };

    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/api/notice/delete/${noticeIdx}`)
        .then(response => {
            console.log(response);
            if(response.data === 1) {
                alert('해당 글이 정상적으로 삭제되었습니다.');
                history.push('/notice');
            } else {
                alert('삭제에 실패했습니다. 다시 시도해주세요.');
                return;
            }
        })
        .catch(error => {
            console.log(error);
            alert(`삭제에 실패하였습니다.(${error.message})`);
            return;
        });
    };

  
    return (
        <>
        <h1 className={style.Notice}>공지사항 등록</h1>
        <div className={style.Box}>

          <h1 className={style.Title}>제목</h1>
          {/* <input type="text" id="title" name="title" value={notice.title} onChange={handlerChangeTitle}/> */}
            <input className={style.TitleBox} value={notice.title} onChange={handlerChangeTitle}/>
          {/* <div className={style.TitleBox}>{notice.title}</div> */}
          <h1 className={style.Contents}>내용</h1>
          <input className={style.ContentsBox} value={notice.contents} onChange={handlerChangeContents}/>
          {/* <textarea className={style.TitleBox} value={notice.contents} onChange={handlerChangeContents}></textarea> */}
          <button className={style.Button2} onClick={handlerClickUpdate}>수정</button>
          <button className={style.Button3} onClick={handlerClickDelete}>삭제</button>
          <button className={style.Button3} onClick={handlerClickList}>목록으로</button>
        </div>

        { datas && datas.map(notice => (
                <div className={style.TitleBox}>
                    <div key={notice.title}>
                        <div>{notice.title}</div>
                        </div>
                        <div key={notice.ContentsBox}>
                        <div>{notice.contents}</div>
                        </div>
                        
                        </div>
                        ))
        }
                        {/* <div className="title">
                            <Link to={`/notice/detail/${notice.noticeIdx}`}>{notice.title}</Link></td> */}
                           {/* <Link to={`/notice/detail/${notice.noticeIdx}`}>{notice.title}</Link></div> */}
        
      </>
    );
};


export default NoticeDetail;