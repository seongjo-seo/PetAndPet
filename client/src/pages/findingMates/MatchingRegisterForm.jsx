import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import AImageFIleInput from '../../components/common/AImageFileInput';
import AImageViewer from '../../components/common/AImageViewer';
import BasicDateTimePicker from '../../components/common/BasicDateTimePicker';
import Button from '../../components/common/Button';
import {
  changeInput,
  initializeForm,
  unloadPost,
  updateMatchPost,
  writeMatchPost,
} from '../../redux/modules/matching';
import { getMyPetList } from '../../redux/modules/mypet';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem;
  }
`;

const BottomLeftWrapper = styled.div`
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
`;

const BottomWrapper = styled.div`
  display: flex;
`;

const MatchingRegisterForm = ({userInfo}) => {
  console.log('userInfo', userInfo);
  const [content, setContent] = useState('');
  const contents = useSelector((state) => state.matching.write);
  const post = useSelector((state) => state.matching.update);
  console.log('pppppppost', post.matchId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const formData = new FormData();
  // form 초기화 정보 가져오기(글쓰기시에만 write가 사용)
  const { form } = useSelector(({ matching }) => ({
    form: matching.write,
  }));
  const { matchTitle, matchContent, matchTime, imageUrl } = form;
  console.log('imageUrl', imageUrl);
  useEffect(() => {
    if (!post.matchId) dispatch(initializeForm('write'));
    else setContent();

    dispatch(getMyPetList(userInfo.userId));
    
    return () => {
      dispatch(unloadPost());
    };
  },[dispatch, post.matchId, userInfo.userId]);

  
  const petList = useSelector((state) => state.mypet.list);
  //write/update후처리
  const res = useSelector((state) => state.matching.res);
  console.log(res, 'resrersersreserser');
  if (res) {
    if (res.status === 'success') {
      navigate('/match/list');
      res.status = '';
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (post.matchId) {
      dispatch(
        changeInput({
          form: 'update',
          name,
          value,
        }),
      );
    } else {
      dispatch(
        changeInput({
          form: 'write',
          name,
          value,
        }),
      );
    }
  };
  console.log('post', post)

  const deleteUrl = () => {
    if (!post.matchId) URL.revokeObjectURL(imageUrl);
    else URL.revokeObjectURL(post.imageUrl);
  };

  const appendingFormData = (receivedFormData) => {
    setContent(receivedFormData);
  };

  const submitPost = async (e) => {
   console.log('contents', contents);
   if(petList.length === 0){
     alert('반려동물을 등록해주세요');
     return false;
   }
   if(!post.matchId){
    if(contents.selectPet === ''){
      alert('반려동물을 선택해주세요.')
      return false;
    }
   }else{
    if(post.selectPet === ''){
      alert('반려동물을 선택해주세요.')
      return false;
    }
   }
   
    e.preventDefault();
    if (!post.matchId) {
      for (const [key, value] of Object.entries(contents)) {
        if (`${key}` === 'matchImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    } else {
      for (const [key, value] of Object.entries(post)) {
        if (`${key}` === 'matchImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    }
    formData.append('token', localStorage.getItem('token'));
    formData.append('region1', userInfo.region1);
    formData.append('region2', userInfo.region2);
    formData.append('region3', userInfo.region3);
    if (!post.matchId) dispatch(writeMatchPost(formData), [dispatch]);
    else dispatch(updateMatchPost(formData), [dispatch]);
  };

  return (
    <>
      <FormWrapper onSubmit={submitPost} encType="multipart/form-data">
        <StyledTextField
          id="outlined-multiline-flexible"
          label={'제목'}
          onChange={handleChange}
          name="matchTitle"
          value={post.matchTitle || matchTitle}
        />
        <StyledTextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={6}
          onChange={handleChange}
          name="matchContent"
          value={post.matchContent || matchContent}
        />
        <BottomWrapper>
          <BottomLeftWrapper>
            <BasicDateTimePicker post={post} matchTime={matchTime} />
            <Box sx={{ marginBottom: 0.5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">나의 반려동물</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="selectPet"
                  name="selectPet"
                  onChange={handleChange}
                  value={useSelector((state) => (post.matchId === '' ? state.matching.write.selectPet : state.matching.update.selectPet))}
                >
                  {petList ? petList.map((val) => (
                    <MenuItem value={val.petId}>{val.petName}</MenuItem>
                  )) : ""}
                </Select>
              </FormControl>
            </Box>
            <AImageFIleInput
              buttonName={'이미지 첨부'}
            //  previewUrl={imageUrl}
              appendingFormData={appendingFormData}
              post={post}
              type="matching"
            />
            <Button type="button" onClick={deleteUrl}>
              이미지삭제
            </Button>
            <Button type="submit">
              {(post.matchId && '산책포스팅 수정') || '산책메이트 글올리기'}
            </Button>
          </BottomLeftWrapper>
          <AImageViewer post={post} imageUrl={imageUrl} />
        </BottomWrapper>
      </FormWrapper>
    </>
  );
};

export default MatchingRegisterForm;
