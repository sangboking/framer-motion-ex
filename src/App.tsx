import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background:linear-gradient(135deg,#e09,#d0e);
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  width:50vw;
  gap:10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width:100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;




function App() {
  const [id,setId] = useState<null|string>(null);
  
 
  return (
    <Wrapper>
      <Grid>
        {
          ["1","2","3","4"].map((n)=>
            <Box onClick={()=>setId(n)} key={n} layoutId={n}/>
          )
        }
      </Grid>
      <AnimatePresence>
        {id?
        <Overlay
          onClick={()=> setId(null)}
          initial={{ backgroundColor:"rgba(0,0,0,0)"}} 
          animate={{backgroundColor:"rgba(0,0,0,0.5)"}}
          exit={{backgroundColor:"rgba(0,0,0,0)"}}>
           <Box layoutId={id} style={{width:400,height:200}}/>
        </Overlay>:null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;



/*
  (1):framer-motion styled-components에 적용하는방법
    -styled.div 의형태에서 styled(motion.div) 의 형태로 작성한다
  
  (2):생성한 태그들에 props와 같은형태로 저장이 가능하다
    -App 컴포넌트 밖에서 객체를 만들어 내부에 원하는이름으로 css값들을 작성한다
    -App 컴포넌트 내부에서 variants 키워드로 생성한 객체를 불러오고,
     motion 요소에 기입하면 props처럼 사용이 가능하다
  
  (3):모션태그로 만들어진 부모태그 안에 있는 자식요소들은 자동적으로 
      initial,animate,variants 값들이 적용된다.

  (4):useMotionValue 
     - x축이나 y축등의 이동 위치값을 얻어낼수 있다.
     - 생성한 태그안에 style ={{}} 의 형태로 useMotionValue로 선언한 값을 넣을수있다.
     - MotionValue는 값이변경해도 리랜더링 되지 않는다.
  
  (5):useTransform
     -useMotionValue 로 얻은 값을 값의 변화에따라 모양,색,등을 변경시킬수있다.
     -useTransform(x,[-100,0,100],[2,1,0]) 이런식으로 사용할수있다 여기서 
     첫 매개변수인 x는 motionvalue로 얻은 값을 넣을수 있고, 두번째 파라미터 배열은
     x값이 -100부터 100까지의 값변화를 나타낸다. 세번째 파라미터 배열은 
     두번째 파라미터의 값변화에따라 출력하는 값을 나타내는것이다.
  
  (6):useViewportScroll
      -useViewportScroll을 사용하면 scrollx,y등의 값을 얻어올수있다.
      -const {scrollX} = useViewportScroll 의형태로 불러온다.
  
  (7):AnimatePresence
      -component나 모달창 등의 사라짐,다시나나탈 때의 에니메이션 효과가능
      -AnimatePresence태그 안에는 무언가 나타나거나 없어짐의 조건문이 있어야한다.
      -생성,제거 되는 컴포넌트 태그안에  그전처럼 varaiants,initial,animate등의
      값들을 넣으면 된다.

  (8):custom
      -variants 키워드를 조건에따라 변경(커스텀) 이가능하다
      -<AnimatePresence custom={}>의형태로 태그 내부에 선언해주고, 또한 사용할
      엘리먼트 태그 내부에서도 custom={} 을 선언해야 한다.
      -만들어논 variant 에서 요소들을 함수의 return값으로 반환해야한다.



*/
