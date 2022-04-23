import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ProfileNav from '../components/profile/ProfileNav';
import Footer from '../components/Footer'
const MyPageLayoutWrapper = styled.div``;

const ProfileHeaderBlock = styled.header``;
const MainWrapper = styled.main``;
const ProfileBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const MyPageLayout = ({ userInfo }) => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <MyPageLayoutWrapper>
      <Header />
      <ProfileBlock>
        <ProfileHeaderBlock>
          <ProfileNav
            category={category}
            onSelect={onSelect}
            userInfo={userInfo}
          />
        </ProfileHeaderBlock>
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </ProfileBlock>
      <Footer/>
    </MyPageLayoutWrapper>
  );
};

export default MyPageLayout;
