/* #3.17 component: a title and horizontal FlatList */
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import VMedia from './VMedia';

// from Movies16.tsx
const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 15px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`; // item 사이의 간격을 위해서

interface HListProps {
  title: string;
  // (Step 6)
  //// data: any[];
  // TODO TS) "any" 사용은 최대한 자제 필요 -> TS적용은 (https://github.com/nomadcoders/noovies/blob/master/components/HList.tsx) 참고
  // -> see api17.ts
  data: Movie[] | TV[];
}

const HList: React.FC<HListProps> = ({
  title, //// children,
  data,
}) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    {/*//! "children" prop: 이렇게 하면 <HList> 사이에 넣은 것들이 자동으로 들어가지는 듯 했다 
        (https://reactjs.org/docs/composition-vs-inheritance.html#containment)*/}
    {/* {children} */}
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      data={data}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path || ''}
          // movie의 경우에는 original_title, tv의 경우에는 original_name으로 이름이 서로 다름. Movies.tsx와 Tv.tsx 에 공통적으로 활용하기 위해서는 다음과 같이 검사가 필요
          //? "??" JS 연산자 활용: item.original_name ? item.original_name : item.original_title 과 동일한 코드임
          // originalTitle={item.original_name ?? item.original_title}
          // +) TS 적용
          originalTitle={'original_name' in item ? item.original_name : item.original_title}
          voteAverage={item.vote_average}
        />
      )}
      ItemSeparatorComponent={HListSeparator}
      // keyExtractor 별도로 추가
      keyExtractor={(item: Movie | TV) => item.id + ''}
    />
  </ListContainer>
);

export default HList;
