import { styled } from "styled-components";
import Timeline from "../components/timeline";
import PostTweetForm from "../components/post-tweet-form";

const Wrapper = styled.div`
  display: grid;
  overflow-y: scroll;
  position: relative;
`;

const TimelineNav = styled.div`
position: absolute;
display: flex;
justify-content: space-around;
  width: 100%;
  height : 50px;
 background: black;
 opacity: 70%;
`


const ForyouButton = styled.div`
display: flex;
align-items: center;
  
`
const FollowingButton = styled.div`
  display: flex;
align-items: center;
`

export default function Home({modal}) {
  return (
    <Wrapper>
    <TimelineNav>
    <ForyouButton>For you</ForyouButton>
    <FollowingButton>Following</FollowingButton>
    </TimelineNav>
    
      {modal && <PostTweetForm/>}
    <Timeline>

    </Timeline>
    </Wrapper>
  );
}