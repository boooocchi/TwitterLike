import { type NextPage } from "next";
import { NewTweetForm } from "../components/NewTweetForm";
import InifiniteTweetList from "../components/InfiniteTweetList"
const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold ">Home</h1>
      </header>
      <NewTweetForm />
      <RecentTweets />
    </>
  );
};

funciton RecentTweets(){
  const tweets=api.tweet.insiniteFeed.useInfiniteQuery({},{getNextPageParam:(lastPage)=>lastPage.nextCursor})
  return <InfiniteTweetList tweets={tweets.data?.page.flatMap(page=>page.tweets)}
  isError={tweets.isError}
  isLoading={tweets.isLoading}
  hasMore={tweets.hasNextPage}
  fetchNextTweets={tweets.fetchNextPage}

  />

};

export default Home;
