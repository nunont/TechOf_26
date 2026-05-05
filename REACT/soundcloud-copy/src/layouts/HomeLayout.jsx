
import './HomeLayout.css'

function HomeLayout({ children }) {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="home-lay">
        {children}
      </div>
    </div>
    
  )
}

export default HomeLayout