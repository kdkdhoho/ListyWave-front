'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import getRecommendedUsers from '@/app/_api/explore/getRecommendedUsers';

import * as styles from './UsersRecommendation.css';
import { UserProfileType } from '@/lib/types/userProfileType';

function UsersRecommendation() {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { data: usersList } = useQuery<UserProfileType[]>({
    queryKey: [QUERY_KEYS.getRecommendedUsers],
    queryFn: () => getRecommendedUsers(),
  });

  const handleScrollToRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: wrapperRef.current.scrollLeft + 234,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {usersList?.length !== 0 && (
        <>
          <div className={styles.userRecommendationTitle}>사용자 추천</div>
          <ul className={styles.recommendUsersListWrapper} ref={wrapperRef}>
            {usersList &&
              usersList?.map((item: UserProfileType) => {
                return (
                  <li key={item.id}>
                    <UserRecommendListItem data={item} handleScrollToRight={handleScrollToRight} />
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
}

export default UsersRecommendation;

interface UserRecommendListItemProps {
  data: UserProfileType;
  handleScrollToRight: () => void;
}

function UserRecommendListItem({ data, handleScrollToRight }: UserRecommendListItemProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowingState = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleFollowButtonClick = () => {
    handleFollowingState();
    handleScrollToRight();
  };

  return (
    <>
      <div className={styles.recommendUserWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={data?.profileImageUrl}
            alt="추천 사용자 프로필 이미지"
            fill
            sizes="100vw 100vh"
            className={styles.recommendUserProfileImage}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <h6 className={styles.recommendUserNickname}>{data.nickname}</h6>
        <p className={styles.recommendUserDescription}>최근 활동한 사용자입니다.</p>
        <button
          className={`${styles.followButtonDefault} ${isFollowing === true ? styles.followButtonFollowing : ''}`}
          onClick={handleFollowButtonClick}
        >
          <span>{isFollowing ? '팔로잉' : '팔로우'}</span>
        </button>
      </div>
    </>
  );
}
