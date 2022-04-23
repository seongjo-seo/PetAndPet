import './MyPageStyle.css';
import React, { useRef, useState } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyLikePostCard from '../components/post/MyLikePostCard';

const InterestedPost = ({ userInfo }) => {
  const postCon = useRef();
  // const matchCon = useRef();
  const usedCon = useRef();

  const [isPostFold, setIsPostFold] = useState(true);
  // const [isMatchFold, setIsMatchFold] = useState(true);
  const [isUsedFold, setIsUsedFold] = useState(true);

  const clickShowPost = (e) => {
    setIsPostFold(!isPostFold);
    postCon.current.style.height = '900px';
    if (!isPostFold) {
      postCon.current.style.height = '';
    }
  };
  // const clickShowMatch = (e) => {
  //   setIsMatchFold(!isMatchFold);
  //   matchCon.current.style.height = '900px';
  //   if (!isMatchFold) {
  //     matchCon.current.style.height = '';
  //   }
  // };
  const clickShowUsed = (e) => {
    setIsUsedFold(!isUsedFold);
    usedCon.current.style.height = '900px';
    if (!isUsedFold) {
      usedCon.current.style.height = '';
    }
  };

  const postFoldBtn = isPostFold ? (
    <FontAwesomeIcon icon={faAngleDown} className="fold-toggle-btn" />
  ) : (
    <FontAwesomeIcon icon={faAngleUp} className="fold-toggle-btn" />
  );
  // const matchFoldBtn = isMatchFold ? (
  //   <FontAwesomeIcon icon={faAngleDown} className="fold-toggle-btn" />
  // ) : (
  //   <FontAwesomeIcon icon={faAngleUp} className="fold-toggle-btn" />
  // );
  const usedFoldBtn = isUsedFold ? (
    <FontAwesomeIcon icon={faAngleDown} className="fold-toggle-btn" />
  ) : (
    <FontAwesomeIcon icon={faAngleUp} className="fold-toggle-btn" />
  );

  return (
    <div className="mypost-container">
      <div className="mypost-post-wrapper">
        <h3 onClick={clickShowPost}>게시물{postFoldBtn}</h3>
        <div className="mypost-post-container" ref={postCon}>
          <MyLikePostCard type="collectPost" userInfo={userInfo} />
        </div>
      </div>
      {/* <div className="mypost-match-wrapper">
        <h3 onClick={clickShowMatch}>산책메이트 찾기 게시물{matchFoldBtn}</h3>
        <div className="mypost-match-container" ref={matchCon}>
          b
        </div>
      </div> */}
      <div className="mypost-used-wrapper">
        <h3 onClick={clickShowUsed}>중고거래 게시물{usedFoldBtn}</h3>
        <div className="mypost-used-container" ref={usedCon}>
          <MyLikePostCard type="market" userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default InterestedPost;
