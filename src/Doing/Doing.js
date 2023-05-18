import style from './Doing.module.css'
import '../reset.css';
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Content from './Content';
import ContentUpdate from './ContentUpdate';
import ContentDetail from './ContentDetail';
import CommentWrite from './CommentWrite';
import Complete from './Complete';
import reply from './reply.png';
import Waveform from '../Component/Waveform';



const Doing = ({ history, match, pcIdx }) => {

    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [pdIdx, setPdIdx] = useState('');
    const [uploadClick, setUploadClick] = useState(true);
    const [editClick, setEditClick] = useState('');
    const [commentOpen, setCommentOpen] = useState('');
    const [isClick, setIsClick] = useState(false);
    const [isClick1, setIsClick1] = useState(false);
    const [isClick2, setIsClick2] = useState(false);
    const [detailClick, setDetailClick] = useState([]);
    const [commentUpload, setCommentUpload] = useState([]);
    const [variable, setVariable] = useState(false);
    const [progress, setProgress] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [contentList, setContentList] = useState([
        {
            pcNumber: '',
            content: '',
            writer: '',
            pdNumber: '',
            date: '',
            file: '',
            img: '',
            uuid: ''
        }])
    const [listArray, setListArray] = useState([
        {
            pdNumber: '',
            userId1: '',
            userId2: '',
            photo: '',
            tag1: '',
            tag2: '',
            tag3: '',
            progress: ''
        }
    ]);
    const [payList, setPayList] = useState(
        {
            sender: '',
            receiver: '',
            money: '',
            date: '',
            img: ''
        }
    );
    const [commentList, setCommentList] = useState([{
        pdcNumber: '',
        writer: '',
        content: '',
        img: '',
        pcNumber: ''
    }])

    useEffect(() => {
        console.log(sessionStorage.token);
        if (sessionStorage.getItem('token') == null) {
            history.push('/login')
            return;
        }
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);

        let userId = decode_token.sub;
        setUserId1(userId);
        console.log(decode_token);
        console.log(userId);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/projectList/${decode_token.sub}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setListArray(response.data.map((data) => {
                    return ({
                        pdNumber: data.pdIdx,
                        userId1: data.userId1,
                        userId2: data.userId2,
                        photo: data.profileImg,
                        tag1: data.userTag1,
                        tag2: data.userTag2,
                        tag3: data.userTag3,
                        progress: data.progress
                    })
                }))
            })
            .catch((error) => {
                console.log(error);
                console.log(userId)
                return;
            })
    }, []);

    const [partner, setPartner] = useState('');


    const handlerClickSelect = (index, pdNumber, progress, tag1, tag2, tag3) => {

        setUserId2(partner);
        console.log(userId1);
        console.log(userId2);
        setProgress(progress);
        tagList[0] = tag1;
        tagList[1] = tag2;
        tagList[2] = tag3;

        let partnerLet1;
        if (userId1 == listArray[index].userId1) {
            partnerLet1 = listArray[index].userId2
            setPartner(partnerLet1);
        } else if (userId1 == listArray[index].userId2) {
            partnerLet1 = listArray[index].userId1;
            setPartner(partnerLet1);
        }


        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/paylist/${userId1}/${partnerLet1}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setPayList({
                    sender: response.data.userId1,
                    receiver: response.data.userId2,
                    money: response.data.plMoney,
                    date: response.data.plDate,
                    img: response.data.profileImg
                })
            }).catch((error) => {
                return;
            }
            )

        setPdIdx(pdNumber);
        console.log(pdIdx);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/${pdNumber}`
        )
            .then(response => {
                console.log(response);
                setContentList(response.data.map((data) => {
                    return ({
                        pcNumber: data.pcIdx,
                        content: data.pcContent,
                        writer: data.pcWriter,
                        pdNumber: data.pdIdx,
                        date: data.pcDate,
                        file: data.pcFile,
                        img: data.profileImg,
                        uuid: data.cmMusic
                    });
                }));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                    history.push('/login');
                }
            });
    }

    // useEffect(() => {

    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/${pdIdx}`
    //     )
    //         .then(response => {
    //             console.log(response);
    //             setContentList(response.data.map((data) => {
    //                 return ({
    //                     pcNumber: data.pcIdx,
    //                     content: data.pcContent,
    //                     writer: data.pcWriter,
    //                     pdNumber: data.pdIdx,
    //                     date: data.pcDate,
    //                     file: data.pcFile,
    //                     img: data.profileImg,
    //                     uuid: data.cmMusic
    //                 });
    //             }));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             if (error.response.status === 403) {
    //                 alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
    //                 history.push('/3');
    //             }
    //         });
    // },[])

    const handlerClickUpload = () => {
        setUploadClick(!uploadClick);
    }

    const handlerEditClick = (index) => {
        console.log(index);
        // setIsClick(true);
        console.log("ccccccccccccccccccc")
        console.log(isClick);
        console.log(editClick);



        if (isClick == false) {

            console.log("bbbbbbbbbbbbbbbbbbbbbb")
            setIsClick(true);
            setEditClick(index);
            // setVariable(!variable);
            // editClick[index] = variable;
        }

        if (isClick == true) {
            if (editClick !== index) {
                alert("수정 중인 게시글이 있습니다.")
                return;
            }
            console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
            setIsClick(false);
            setEditClick('');
            // setVariable(!variable);
            // editClick[index] = variable
            return;
        }
    }
    // useEffect(() => {
    //     console.log("바뀐후 >>>>>>>>>>>>>>>>>>" + editClick);
    //     console.log('' == 0);
    // }, [editClick])


    const handlerDetailClick = (index) => {

        if (detailClick[index] == true) {
            detailClick[index] = false;
            setVariable(!variable)
        } else {
            detailClick[index] = true;
            setVariable(!variable)
        }
        console.log("detailClick[index] :" + detailClick[index])
    };

    const handlerClickComment = (pcIdx, index) => {

        if (isClick2 == false) {
            setCommentOpen(index);
            setIsClick2(true);
        }

        if (isClick2 == true) {
            if (commentOpen != index) {
                alert("펼쳐진 댓글이 있습니다.")
                return;
            }
            setIsClick2(false);
            setCommentOpen('');
            return;
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/comment/${pcIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setCommentList(response.data.map((data) => {
                    return ({
                        writer: data.userId,
                        content: data.pdcComment,
                        pdcNumber: data.pdcIdx,
                        img: data.profileImg,
                        pcNumber: data.pcIdx
                    })
                })
                )
                console.log(commentList);

            }).catch((error) => {
                return;
            })

    }

    const handlerCommentUpload = (index) => {
        if (isClick1 == true) {
            if (commentUpload != index) {
                alert("작성 중인 댓글이 있습니다.")
                return
            }
            setIsClick1(false)
            setCommentUpload('');
        } else {
            setIsClick1(true);
            setCommentUpload(index);
        }
    }

    const handlerContentDelete = (pcIdx) => {

        // if (pcWriter != userId1) {
        //     alert('작성자만 삭제할 수 있습니다.');
        //     console.log(userId1);

        //     return;
        // }

        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/delete/${pcIdx}`)
            .then(response => {
                console.log(response);
                if (response.data === "Y") {
                    alert('정상적으로 삭제되었습니다.');
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    }

    const handlerCommentDelete = (pdcIdx) => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/comment/delete/${pdcIdx}`)
            .then(response => {
                if (response.data == 1) {
                    alert("정상적으로 삭제되었습니다.")
                } else {
                    alert("삭제에 실패했습니다.");
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert("삭제에 실패했습니다.");
                return;
            })
    }




    const ProjectList = () => {
        // console.log(listArray);
        let partnerLet2;
        return listArray && listArray.map((value, index) => {
            if (userId1 == value.userId1){
                partnerLet2 = value.userId2;
            } else if (userId1 == value.userId2){
                partnerLet2 = value.userId1;
            }
            return (
                <>
                    <div key={index} className={style.partnerProfile}>
                        <button onClick={() => handlerClickSelect(index, value.pdNumber, value.progress, value.tag1, value.tag2, value.tag3)}>
                            <p className={style.img}> {value.photo}</p>
                            <div className={style.profileBox}>
                                <span className={style.nickname}>{partnerLet2}</span>
                                <span className={style.tag}> {'#' + value.tag1} {'#' + value.tag2} {'#' + value.tag3}</span>
                            </div>
                        </button>
                    </div>
                    {/* {console.log(pdIdx)} */}
                </>
            );
        });
    };


    const ProjectPage = () => {

        return (
            <>
                <div className={style.payBox}>
                    <div className={style.payDate}> {payList.date} </div>
                    <div className={style.payList}>
                        <div className={style.img}>{payList.img}</div>
                        <div className={style.sender}>{payList.sender}</div>
                        <div className={style.money}>예치금 {payList.money}원이 결제되었습니다.</div>
                    </div>
                </div>
                {/* {console.log(contentList)} */}

                {contentList && contentList.map((value, index) => {
                    const download = `http://localhost:8080/api/bridge/partnerdetail/download/${value.file}`;
                    return (
                        <div className={style.contentBox}>
                            <div className={style.contentTop}>
                                <div className={style.contentDate}>{value.date}</div>
                                <div className={style.contentEdit}>
                                    <button key={value.pcNumber} onClick={() => handlerEditClick(index)}>{editClick === index ? "수정취소" : "수정"}</button>
                                </div>
                                <div className={style.contentDelete}>
                                    <button onClick={() => handlerContentDelete(value.pcNumber)}> 삭제 </button>
                                </div>
                            </div>
                            <div className={style.content}>
                                <div className={style.img}>{value.img}</div>
                                <div className={style.writer}>{value.writer}</div>
                                <div className={style.main}>{value.content}</div>
                                <div className={style.file}><a href={download}>{value.file}</a></div>
                                <div className={style.commentLetter}>
                                    <button onClick={() => handlerClickComment(value.pcNumber, index)}>{commentOpen === index ? '접기' : '코멘트'}</button>
                                </div>
                                <div>
                                    {value.uuid != null &&
                                        <Waveform
                                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getMusic/${value.uuid}`}
                                        />}
                                </div>
                            </div>
                            {editClick === index ? <ContentUpdate pcIdx={value.pcNumber} setEditClick={setEditClick} setIsClick={setIsClick} /> : <></>}
                            {commentOpen === index && CommentList()}
                            {commentOpen === index ? <div className={style.commentWriteBox}><CommentWrite pcIdx={value.pcNumber} /></div> : <> </>}

                            {/* <button key={value.pcNumber} onClick={() => handlerEditClick(index)}>{editClick === index ? "게시글 수정취소" : "게시글 수정"}</button> 
                                {/* {editClick === index ? <ContentUpdate pcIdx={value.pcNumber} setEditClick={setEditClick} setIsClick={setIsClick} /> : <></>} */}

                            {/* {console.log(detailClick[index])} */}
                            {/* <button onClick={() => handlerDetailClick(index)} >{detailClick[index] == false || detailClick[index] == undefined ? "게시글 상세" : "게시글 접기"}</button> */}
                            {/* {console.log(detailClick)} */}
                            {/* {detailClick[index] == true ? <ContentDetail pcIdx={value.pcNumber} /> : <></>} */}
                            {/* <button onClick={() => handlerCommentUpload(index)}>댓글 작성</button> {commentUpload === index ? <CommentWrite pcIdx={value.pcNumber} setCommentUpload={setCommentUpload} setIsClick1={setIsClick1} /> : <> </>} */}
                            {/* <button onClick={() => handlerContentDelete(value.pcNumber)}> 게시글 삭제 </button> */}

                        </div>
                    )
                }
                )}
            </>
        )
    }

    const CommentList = () => {
        return commentList && commentList.map((data) => {
            return (
                <div className={style.comment}>
                    <div className={style.iconBox}><img src={reply} className={style.commentIcon} /></div>
                    <div className={style.img}>{data.img}</div>
                    <div className={style.writer}>{data.content != "" ? <p className={style.commentsname}> {data.writer}</p> : <p> 댓글이 없습니다. </p>} </div>
                    <div className={style.content}>
                        {data.content != "" && <p> {data.content}</p>} </div>
                    <div className={style.delete}>
                        <button onClick={() => handlerCommentDelete(data.pdcNumber)}>삭제</button>
                    </div>
                </div>
            );
        })
    }


    return (

        <>
            <div className={style.listBox}>
                <div className={style.list}>
                    <div className={style.listTitle}> 작업 목록 </div>
                    {ProjectList()}
                </div>
            </div>
            <div className='container clearfix' >
                <div className={style.doing}>
                    <div className={style.doingTitle}> {partner} </div>
                    <div className={style.doingProgress}>{progress == '0' ?
                        <>현재 작업이 <span style={{ fontWeight: 'bold' }}>진행 중</span>입니다. </>
                        :
                        <>완료된 작업입니다.</>}
                    </div>
                    <div className={style.doingTag}>{'#' + tagList[0]} {'#' + tagList[1]} {'#' + tagList[2]}</div>
                    <div>
                        {ProjectPage()}
                        <button className={style.upload} onClick={handlerClickUpload}>{uploadClick ? '업로드' : "업로드 취소"}</button>
                        <div className={style.contentBox}>
                            {uploadClick ? <></> : <Content pdIdx={pdIdx} uploadClick={uploadClick} setUploadClick={setUploadClick} state={contentList.state} contentList={contentList} setContentList={setContentList} />}
                        </div>
                        <Complete pdIdx={pdIdx} setProgress={setProgress} />
                    </div>
                </div>
            </div>
        </>

    
    )
}

export default Doing;