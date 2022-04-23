import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MatchingModalButton from '../../components/common/MatchingModalButton';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


const MatchingPostWrapper = styled.section`
  display: flex;
  width: 600px;
  height: fit-content;
  justify-content: center;
  align-items: center;
  margin: 120px auto;
  background-color: white;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  .imcoo {
    width: 600px;
    height: 600px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: rgb(30, 30, 30);
    }
  }
  .ttttt {
    padding: 0 20px;
  }
  .mmmcccont {
    padding: 0 10px;
    font-size: 20px;
  }
  .petsinfo {
    margin-left: 5px;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(245, 245, 245);
  width: 600px;
  margin: 0 auto;
  padding: 0 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.img`
  height: 450px;
  width: 700px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin-left: 500px;
  :hover {
    background-color: rgb(252, 252, 252);
  }
`;

const marginStyle1 = {
  marginTop: 20,
  marginBottom: 20,
};

const marginStyle2 = {
  marginTop: 5,
  marginBottom: 5,
};

const MatchingPost = ({ post, loadingPost, userInfo }) => {
  console.log('pst', userInfo, post);
  const navigate = useNavigate();

  const addChat = () => {
    axios
      .post('http://localhost:3001/chat/add', {
        matchId: post[0].matchId,
        userId: post[0].userId,
        participant: userInfo.userId,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/chatting');
          console.log('re', res);
        }
      });
  };
  var nowYear = new Date().getFullYear();

  return (
    <MatchingPostWrapper>
      {loadingPost && 'loading...'}
      {!loadingPost && post && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h3>{post[0].userNick}</h3>
            </UserWrapper>
            <ButtonWrapper>
              <MatchingModalButton />
            </ButtonWrapper>
          </TopWrapper>
          <div className="ttttt">
            <h2 style={marginStyle1}>{post[0].matchTitle}</h2>
          </div>
          <div className="imcoo">
            <ImgWrapper
              src={`http://localhost:3001/match/download?matchId=${post[0].matchId}&matchImgName=${post[0].matchImgName}`}
            />
          </div>
          <div className="mmmcccont">
            <h4 style={marginStyle1}>{post[0].matchContent}</h4>
            <h6 style={marginStyle2}>
              {`산책 예정 시간: ${moment(new Date(post[0].matchTime))
                .format('YYYY-MM-DD HH:mm')
                .substring(0, 10)} ${moment(new Date(post[0].matchTime))
                .format('YYYY-MM-DD HH:mm')
                .substring(11, 13)}시${moment(new Date(post[0].matchTime))
                .format('YYYY-MM-DD HH:mm')
                .substring(14, 16)}분`}
            </h6>
            <h6 style={marginStyle2}>
              {post[0].userAge}대 |{' '}
              {post[0].userSex === 'male' ? '남자' : '여자'} |
              {`${post[0].region1} ${post[0].region2}  ${post[0].region3}`}
            </h6>
            <br />

            <h5 style={marginStyle2}>
              {post[0].userNick}
              <small> 님의 반려동물</small>
              <FontAwesomeIcon icon={faPaw} className="petsinfo" />
            </h5>
            <h6 style={marginStyle2}>
              {post[0].selectPets[0].petName} |{' '}
              {nowYear - post[0].selectPets[0].petBirth.substring(0, 4) + 1}살 |{' '}
              {post[0].selectPets[0].petSex ? '수컷' : '암컷'} |{' '}
              {post[0].selectPets[0].petType} |{' '}
              {post[0].selectPets[0].petTypeDetail}
            </h6>
          </div>
          <StyledButton style={marginStyle1}>
            <StyledLink to="" onClick={addChat}>
              <h3>채팅하기</h3>
              <ChatIcon sx={{ top: 100 }} />
            </StyledLink>
          </StyledButton>
        </div>
      )}
    </MatchingPostWrapper>
  );
};

export default MatchingPost;
