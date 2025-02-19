// 리스트 조회 api
import axiosInstance from '@/lib/axios/axiosInstance';

interface GetCommentsType {
  listId: number | undefined;
  cursorId: number | undefined | null;
}

//리스트 상세 페이지 리스트 조회 api
async function getComments({ listId, cursorId }: GetCommentsType) {
  const params = new URLSearchParams({
    size: '5',
  });

  if (cursorId) {
    params.append('cursorId', cursorId.toString());
  }

  const response = await axiosInstance.get(`/lists/${listId}/comments?${params.toString()}`);

  return response.data;
}

export default getComments;
