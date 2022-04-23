import { useEffect } from 'react';
import { connect } from 'react-redux';
import MarketPost from '../../pages/usedMarket/ItemPost';
import { getMarketPost } from '../modules/market';
import { useParams } from 'react-router-dom';

const MarketPostContainer = ({ getMarketPost, post, loadingPost, userInfo }) => {
  const { marketId } = useParams();

  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMarketPost(marketId);
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMarketPost]);

  return <MarketPost post={post} loadingPost={loadingPost} userInfo={userInfo}/>;
};

export default connect(
  ({ market, loading }) => ({
    post: market.post,
    loadingPost: loading['market/GET_POST'],
  }),
  {
    getMarketPost,
  },
)(MarketPostContainer);
