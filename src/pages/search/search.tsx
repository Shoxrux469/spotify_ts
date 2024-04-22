import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import searchContext from "../../modules/contexts/search";
import useService from "../../hooks/service";
import Loader from "../../components/common/loader";

const Search = () => {
  const [tracks, setTracks] = useState([]);
  const [artist, setArtist] = useState([]);
  const { searchText } = useContext(searchContext);
  const { getSearch, loading, error } = useService();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length > 0) {
      getSearch(searchText, 1, "artist").then((res: object) => {
        console.log(res);
        // setArtist(res.artists.items);
      });
      getSearch(searchText, 4).then((res: object) => {
        console.log(res);
        // setTracks(res?.tracks?.items);
      });
    }
  }, [searchText]);

  //   const goToPlaylist = (item) => {
  //     let img = item?.images[0]?.url;
  //     navigate(`../artist/${item.id}`, {
  //       state: {
  //         track: item?.tracks?.href,
  //         playlist: item,
  //         name: item.name,
  //         img,
  //       },
  //     });
  //   };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p className="text-red-600 text-3xl">ERROR.</p>;
  }

  return (
    <>
      {/* <Helmet> */}
      <title>Spotify ― Search</title>
      {/* </Helmet> */}
      <section>
        {/* {searchText ? ( 
          <SearchResult
            tracks={tracks}
            artist={artist[0]}
            goToPlaylist={goToPlaylist}
          />
        ) : (
          <RecentSearches />
        )}
        <BrowseAll /> */}
      </section>
    </>
  );
};

export default Search;
