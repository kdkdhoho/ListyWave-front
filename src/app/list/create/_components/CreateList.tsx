'use client';

import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// import Header from './list/Header';
import Header from '@/components/Header/Header';
import Section from './list/Section';
import SimpleInput from './list/SimpleInput';
import ButtonSelector from './list/ButtonSelector';
import LabelInput from './list/LabelInput';
import MemberSelector from './list/MemberSelector';
import ColorSelector from './list/ColorSelector';
import RadioInput from './list/RadioInput';

import * as styles from './CreateList.css';

import { listPlaceholder } from '@/lib/constants/placeholder';
import { BACKGROUND_COLOR } from '@/styles/Color';
import { CategoryType } from '@/lib/types/categoriesType';
import { UserProfileType } from '@/lib/types/userProfileType';
import getCategories from '@/app/_api/category/getCategories';
import getUsers from '@/app/_api/user/getUsers';
import { listDescriptionRules, listLabelRules, listTitleRules } from '@/lib/constants/formInputValidationRules';
// import { listDescription } from '@/app/[userNickname]/[listId]/_components/ListDetailOuter/ListInformation.css';

interface CreateListProps {
  onNextClick: () => void;
  type: 'create' | 'edit';
}

/**
 * CreateList 컴포넌트:
 * 리스트 생성 과정 중
 * 리스트에 대한 정보를 입력하는 페이지
 *
 * @param props.onNextClick - 헤더의 '다음'버튼을 클릭했을때 동작시킬 함수
 */
function CreateList({ onNextClick, type }: CreateListProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [users, setUsers] = useState<UserProfileType[]>([]);

  const { setValue, getValues, control } = useFormContext();
  const collaboIDs = useWatch({ control, name: 'collaboratorIds' });
  const title = useWatch({ control, name: 'title' });
  const category = useWatch({ control, name: 'category' });

  const router = useRouter();
  const searchParams = useSearchParams();
  const isTemplateCreation = searchParams?.has('title') && searchParams?.has('category');

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.userInfos);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const filteredCategories = data.filter((category: CategoryType) => category.codeValue !== '0');
        setCategories(filteredCategories);
      } catch (error) {}
    };
    fetchCategories();

    const handleQueryParams = () => {
      if (isTemplateCreation) {
        setValue('title', searchParams?.get('title'));
        setValue('category', searchParams?.get('category'));
      }
    };
    handleQueryParams();
  }, []);

  return (
    <div>
      {/* 헤더 */}
      <Header
        title={type === 'create' ? '리스트 생성' : '리스트 수정'}
        left="close"
        leftClick={() => {
          router.back();
        }}
        right={
          <button
            className={title && category ? styles.headerNextButtonActive : styles.headerNextButton}
            disabled={!title && !category}
            onClick={onNextClick}
          >
            다음
          </button>
        }
      />

      <div className={styles.body}>
        {/* 리스트 제목 */}
        <Section title="타이틀" isRequired={true}>
          <SimpleInput
            type="short"
            name="title"
            placeholder={listPlaceholder.title}
            rules={listTitleRules}
            defaultValue={getValues('title')}
          />
        </Section>

        {/* 리스트 소개 */}
        <Section title="소개">
          <SimpleInput
            type="long"
            name="description"
            placeholder={listPlaceholder.description}
            rules={listDescriptionRules}
            defaultValue={getValues('description')}
          ></SimpleInput>
        </Section>

        {/* 카테고리 */}
        <Section title="카테고리" isRequired={true}>
          <ButtonSelector
            list={categories}
            onClick={(item: CategoryType) => {
              setValue('category', item.nameValue);
            }}
            defaultValue={category}
          />
        </Section>

        {/* 라벨 */}
        <Section title="라벨">
          <LabelInput name="labels" placeholder={listPlaceholder.label} rules={listLabelRules} />
        </Section>

        {/* 콜라보레이터 */}
        <Section title="콜라보레이터 추가">
          <MemberSelector
            placeholder={listPlaceholder.collaborator}
            members={users}
            fetchData={fetchUsers}
            onClickAdd={(userId: number) => {
              setValue('collaboratorIds', [...collaboIDs, userId]);
            }}
            onClickDelete={(userId: number) => {
              setValue(
                'collaboratorIds',
                collaboIDs.filter((collaboId: number) => collaboId !== userId)
              );
            }}
            rules={{
              maxNum: {
                value: 20,
                errorMessage: `콜라보레이터는 최대 20명까지 지정할 수 있어요.`,
              },
            }}
            defaultValue={getValues('collaboratorIds')}
          />
        </Section>

        {/* 배경 색상 */}
        <Section title="배경 색상" isRequired={true}>
          <ColorSelector
            defaultColor={getValues('backgroundColor')}
            colors={Object.values(BACKGROUND_COLOR)}
            onClick={(color: string) => {
              setValue('backgroundColor', color);
            }}
          />
        </Section>

        {/* 공개 설정 */}
        <Section title="공개 설정" isRequired={true}>
          <RadioInput
            messages={{
              trueMessage: '모든 사람이 이 리스트를 볼 수 있어요.',
              falseMessage: '이 리스트는 나만 볼 수 있어요.',
            }}
            onClick={(b: boolean) => {
              setValue('isPublic', b);
            }}
            defaultValue={getValues('isPublic')}
          />
        </Section>
      </div>
    </div>
  );
}

export default CreateList;
