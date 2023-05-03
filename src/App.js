// 헤더 풋터
import Header2 from './Header/Header2';
import Footer from './Footer/Footer';

//페이지 임포트
import LoginStart from './Login/LoginStart';
import Main from './Main/Main';
import Notice from './Admin-Notice/Notice';
import Login from './Login/Login';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './Tip/TipList';
import ReportDetail from './Admin-Report/ReportDetail';
import ProfileDetail from './Profile/ProfileDetail';
import JamList from './Jam/Jamlist';
import Doing from './Doing/Doing';
import Charge from './Charge/Charge';
import DealListAd from './Administrator/DealListAd';
import MainAd from './Administrator/MainAd';
import PartnerWrite from './Partner/PartnerWrite';
import Payment from './Payment/Payment';
import Chatting from './Chatting/Chatting';
import ProfileWrite from './Profile/ProfileWrite';
import JamWrite from './Jam/JamWrite';
import NoticeWrite from './Admin-Notice/NoticeWrite';
import NoticeDetail from './Admin-Notice/NoticeDetail';


// 모듈
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Header2 /> */}
      {/* <Route path="/" component={LoginStart} exact={true} /> */}

      {/* 메인, 공지 */}
      {/* <Route path="/1" component={Main} exact={true} /> */}
      <Route path="/2" component={Notice} exact={true} />
      
      {/* 로그인, 회원가입 */}
      {/* <Route path="/3" component={Login} exact={true} /> */}
      {/* <Route path="/4" component={SignUp} exact={true} /> */}
      {/* 관리자 */}
      {/* <Route path="/5" component={ReportPage} exact={true} />
      <Route path="/6" component={ReportDetail} exact={true} /> */}
      {/* <Route path="/7" component={DealListAd} exact={true}/> */}
      {/* <Route path="/8" component={MainAd} exact={true}/> */}
      {/* 프로필 */}
      {/* <Route path="/9" component={ProfileWrite} exact={true}/> */}
      {/* <Route path="/10" component={ProfileDetail} exact={true} /> */}
      {/* 팁 */}
      {/* <Route path="/11" component={TipList} exact={true} /> */}
      {/* 잼 */}
      {/* <Route path="/12" component={JamList} exact={true} /> */}
      {/* <Route path="/13" component={JamWrite} exact={true} /> */}
      {/* 파트너 구인 */}
      {/* <Route path="/14" component={PartnerWrite} exact={true}/> */}
      {/* <Route path="/15" component={Chatting} exact={true}/> */}
      {/* <Route path="/16" component={Payment} exact={true}/> */}
      {/* <Route path="/17" component={Doing} exact={true}/> */}
      {/* <Route path="/18" component={Charge} exact={true}/> */}

      {/* 비었음 사용할 것 */}
      <Route path="/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/notice" component={Notice} exact={true} />
      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      {/* <Footer /> */}
    </>
  )
}
export default App;
