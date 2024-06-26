import { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import PlaylistsTypes from "./playlistsTypes";
import "./index.scss";
import PlayListsCard from "../../components/common/playListsCard";
import { IMergedData } from "../../types/types";

interface IUser {
  display_name: string;
}

const Main = () => {
  const { token, getUser, getPlayLists } = useService();
  // const [filters, setFilters] = useState<IMergedData[]>([]);
  const [playLists, setPlayLists] = useState<IMergedData[]>([]);
  const [albums, setAlbums] = useState<IMergedData[]>([]);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const timestamp =
      `${date.getFullYear()}-${month}-${date.getDate()} ${date.getHours()}:${date.getMinutes()} UTC`.replace(
        /-/g,
        "/"
      );

    Promise.all([
      getPlayLists(
        `browse/featured-playlists?country=US&timestamp=${timestamp}&`,
        5
      ),
      getPlayLists("browse/new-releases?country=US&", 5),
      getUser(),
    ]).then(([featuredRes, newReleasesRes, user]) => {
      const featuredResult = featuredRes?.playlists?.items.filter(
        (item: object) => item !== undefined
      );

      setPlayLists(featuredResult);
      newReleasesRes && setAlbums(newReleasesRes.albums.items);

      user && setUser(user);
    });
  }, [token]);

  return (
    <div>
      <div className="main_content mt-28">
        <PlaylistsTypes />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl mb-3 font-bold cursor-pointer hover:underline">
            Специально для тебя, {user?.display_name}
          </h2>
          <p className="text-[#b3b3b3] hover:underline cursor-pointer font-semibold text-sm">
            Показать все
          </p>
        </div>
      </div>
      <div className="px-2 pb-6">
        <div className="flex">
          {playLists &&
            playLists.map((item, i) => <PlayListsCard item={item} key={i} />)}
        </div>
        <div className="flex">
          {albums &&
            albums.map((item, i) => <PlayListsCard item={item} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Main;
