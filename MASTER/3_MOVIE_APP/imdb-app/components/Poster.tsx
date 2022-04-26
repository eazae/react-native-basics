/* #3.5 Refactor: detach component from ./Slide.tsx */
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }}></Image>;
};

export default Poster;
