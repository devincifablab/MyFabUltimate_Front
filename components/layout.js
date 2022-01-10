import Navbar from "./navbar"

const Layout = ({ children, user, role }) => (
  <>
  <Navbar user={user} role={role} />
    {children}
  </>
)

export default Layout
