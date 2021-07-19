import React, { useState } from "react";
import "./styles.scss";

import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../assets/helper/helper";
import { createAnswer, createQuestion } from "../../store/action/round.action";
const { TextArea } = Input;

const CommentList = ({ comments, onClick, children, idQuestion }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'Bình luận' : 'Bình luận'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment actions={[<span onClick={onClick} id={props.idQuestion} key="comment-nested-reply-to">Trả lời</span>]} {...props.objComment}>{props.objList.length > 0 && <CommentListChild comments={props.objList} />}{(props.idQuestion == idQuestion) && children}</Comment>}
    />
);
const CommentListChild = ({ comments }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props}></Comment>}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Gửi
            </Button>
        </Form.Item>
    </>
);
function CommentRound() {
    const dispatch = useDispatch();
    const userLogin = getLocalStorage("userInfo");
    const [state, setState] = useState({
        comments: [],
        submitting: false,
        value: ''
    });
    const [idQuestion, setIdQuestion] = useState({
        id: "",
        submitAnswer: false,
        valueAnswer: ''
    });
    const { listQuestionAndAnswer } = useSelector(
        (state) => state.round
    );
    console.log(listQuestionAndAnswer);
    useEffect(() => {
        const arrayComment = [...state.comments];
        console.log(listQuestionAndAnswer);
        if (listQuestionAndAnswer === undefined) {
            return
        } else {
            for (let index = 0; index < listQuestionAndAnswer.length; index++) {
                let objCommentAll = {
                    objComment: {
                        author: listQuestionAndAnswer[index].name,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{listQuestionAndAnswer[index].question}</p>,
                        datetime: listQuestionAndAnswer[index].time,
                    },
                    objList: listQuestionAndAnswer[index].listAnswerResponses.map((answer) =>
                    ({
                        author: answer.name,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{answer.answer}</p>,
                        datetime: answer.time,
                    })),
                    idQuestion: listQuestionAndAnswer[index].idQuestion
                }
                arrayComment.push(objCommentAll);
            }
            setState({
                submitting: false,
                value: '',
                comments: arrayComment
            });
           
        }
    }, [listQuestionAndAnswer])
    const handleClick = (e) => {
        // for (let index = 0; index < state.comments.length; index++) {
        //     if(){


        // }
        setIdQuestion({
            id: e.target.id
        })

    }
    const handleSubmit = (e) => {
        console.log(moment().fromNow())
        console.log(moment().format("DD-MM-YYYY hh:mm"))
        if (!state.value) {
            return;
        }
        setState({
            ...state,
            submitting: true,
        });

        setTimeout(() => {
            setState({
                submitting: false,
                value: '',
                comments: [
                    ...state.comments,
                    {
                        objComment:
                        {
                            author: userLogin.name,
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            content: <p>{state.value}</p>,
                            datetime: moment().format("DD-MM-YYYY hh:mm"),
                        },
                        objList: [],
                        idQuestion: Math.floor(100000 + Math.random() * 900000)
                    }
                ],
            });
        }, 1000);
        const questionObj =
        {
            idInvestor: 1,
            idRound: 1,
            question: state.value
          };
        dispatch(createQuestion(questionObj));
    };
    const handleSubmitAnswer = (e) => {
        if (!idQuestion.valueAnswer) {
            return;
        }
        setIdQuestion({
            ...idQuestion,
            submitAnswer: true,
        });
        setTimeout(() => {
            for (let index = 0; index < state.comments.length; index++) {
                console.log(idQuestion.id);
                console.log(state.comments[index].idQuestion);
                if (state.comments[index].idQuestion == idQuestion.id) {
                    let hihi = state.comments[index].objList;
                    let haha = state.comments[index].objList;
                    let a =
                    {
                        author: userLogin.name,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{idQuestion.valueAnswer}</p>,
                        datetime: moment().format("DD-MM-YYYY hh:mm"),
                    };

                    hihi.push(a);
                    state.comments[index].objList.concat(a);
                    setState({
                        comments: [
                            ...state.comments,
                        ]
                    });
                    setIdQuestion({
                        submitAnswer: false,
                        valueAnswer: '',
                        id: ""
                    })
                }
            }
            const answerObj =
            {
                answer: idQuestion.valueAnswer,
                gmail: userLogin.gmail,
                idQuestion:idQuestion.id
              };
            dispatch(createAnswer(answerObj));
        }, 1000);

    };
    const handleChange = (event) => {
        console.log(event.target)
        const { value } = event.target;
        setState({
            ...state,
            value: value,
        });
    };
    const handleChangeAnswer = (event) => {
        const { value } = event.target;
        setIdQuestion({
            ...idQuestion,
            valueAnswer: value,
        });
    };


    return (
        <div className="comment">
            { userLogin.role !="ORGANIZATION" && <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={state.submitting}
                        value={state.value}
                    />
                }
            />}
            {state.comments.length > 0 && <CommentList onClick={handleClick} comments={state.comments} idQuestion={idQuestion.id}>  <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                }
                content={
                    <Editor
                        onChange={handleChangeAnswer}
                        onSubmit={handleSubmitAnswer}
                        submitting={idQuestion.submitAnswer}
                        value={idQuestion.value}
                    />
                }
            /></CommentList>}

        </div>
    );
}
export default CommentRound;