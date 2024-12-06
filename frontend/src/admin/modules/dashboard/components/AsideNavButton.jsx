import { Link } from "react-router-dom";

export function AsideNavButton({ to, icon, title }) {
  return (
    <Link to={to}>
      <article>
        <img src={`/${icon}.svg`} alt="" />

        <div>
          <span>{title}</span>
          <small>Haz click aqui</small>
        </div>
      </article>
    </Link>
  );
}
