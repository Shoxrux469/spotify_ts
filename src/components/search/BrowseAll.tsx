import { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { useNavigate } from "react-router-dom";

interface ICategories {
  id: string;
  name: string;
  categories: {
    items: [];
  };
  icons: {
    url: string;
  }[];
}

interface ICategory {
  playlists: {
    items: [];
  };
}

const BrowseAll_child: React.FC<{ item: ICategories }> = ({ item }) => {
  const [category, setCategory] = useState<[]>([]);
  const { token, getCategory } = useService();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory(item.id).then((res: ICategory) =>
      setCategory(res.playlists.items)
    );
  }, [token]);

  const goToCurrentPlaylists = (data: [], category: ICategories) => {
    navigate(`../playlists`, {
      state: { playlists: data, name: category.name },
    });
  };

  return (
    <div
      className="category"
      onClick={() => goToCurrentPlaylists(category, item)}
    >
      <span className="text-[26px] font-bold capitalize absolute left-5 top-5">
        {item.name}
      </span>
      <div className="w-[55%] h-[55%] bg-blue-500 absolute right-[-18px] bottom-[-12px] rotate-[25deg]">
        <img src={item?.icons[0]?.url} alt="category" />
      </div>
    </div>
  );
};

const BrowseAll = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const { getAllCategories, token } = useService();

  useEffect(() => {
    getAllCategories().then((res: ICategories) =>
      setCategories(res.categories.items)
    );
  }, [token]);

  return (
    <div className="max-w-[1400px] mt-8">
      <h2 className="text-[26px] font-bold">Browse all</h2>
      <div className="mt-7 grid grid-cols-5 grid-rows-240px gap-6">
        {categories?.map((item) => {
          return <BrowseAll_child key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default BrowseAll;
