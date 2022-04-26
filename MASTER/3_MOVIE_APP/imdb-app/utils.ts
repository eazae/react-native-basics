/**
 * #3.3 TMDB의 이미지를 불러오기 위한 url을 빌드하는 함수
 * @param img
 * @param width default값: "w500"
 */
export const makeImgPath = (img: string, width: string = 'w500') => `https://image.tmdb.org/t/p/${width}${img}`;
