import "./index.scss";

interface IAsideNavs {
  title: string;
  link: string;
  svg: string;
}

const AsideMenu = () => {
  const asideNavs: IAsideNavs[] = [
    {
      title: "Главная",
      link: "../",
      svg: "M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z",
    },
    {
      title: "Поиск",
      link: "../search",
      svg: "M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z",
    },
  ];

  return (
    <div className="bg-white/5 w-full text-white rounded-lg">
      <ul className="w-full px-3 py-2">
        {asideNavs.map((item, i) => (
          <li key={i} className="px-3 py-2">
            <a
              href={item.link}
              draggable="false"
              className="flex gap-5 h-8 w-full items-center"
            >
              <svg
                role="img"
                aria-hidden="true"
                className="icon_default"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d={item.svg}></path>
              </svg>

              <p className="text-white/70 font-semibold">{item.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AsideMenu;
