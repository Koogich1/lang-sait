import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row">
      <Link className="" href="">
        Главная
      </Link>
      <Link className="" href="">
        О школе
      </Link>
      <Link className="" href="">
        Выбор языка
      </Link>
      <Link className="" href="">
        Преподаватели
      </Link>
      <Link className="" href="">
        Новости
      </Link>
    </nav>
  );
}
