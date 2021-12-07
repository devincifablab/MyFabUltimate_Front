import Navbar from "./navbar"

const Layout = ({ children, user }) => (
  <>
  <Navbar user={user} />
    {children}
  </>
)

export default Layout
