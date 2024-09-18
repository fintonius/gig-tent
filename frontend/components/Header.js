import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Logo</Link>
        <p>nav bar</p>
      </div>
      <div className="sub-bar">
        <p>searchbar</p>
      </div>
      <Nav />
    </header>
  );
}
