import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <ul className="footer_category">
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
        <li><Link to="/posts/categories/science">science</Link></li>
      </ul>
      <div className="footer_copyright">
      <small>Copyright © 2024 <span>B</span>log. All rights reserved.</small> 
      </div>
    </footer>
  )
}

export default Footer
