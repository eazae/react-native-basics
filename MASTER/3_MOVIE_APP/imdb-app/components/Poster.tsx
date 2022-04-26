/* #3.5 Refactor: detach component from ./Slide.tsx */
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  /* #3.7 (포스터가 없는 경우를 위해서) */
  background-color: rgba(255, 255, 255, 0.5);
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }}></Image>;
};

export default Poster;
