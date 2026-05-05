import './Header.css'

export default function Header() {

  const sections = [
    {
      id: 1,
      title: 'Discover.\nGet discoverd.',
      description: 'Discover your next obsession, or become someone else’s.\nSoundCloud is the only community where fans and artists come together to discover and connect through music.',
      background: 'https://a-v2.sndcdn.com/assets/images/front-hero-artist-fan-534fb484.jpeg'
    }, 
    {
      id: 2,
      title: 'It all starts with an upload.',
      description: 'From bedrooms and broom closets to studios and stadiums, SoundCloud is where you define what’s next in music. Just hit upload.'
    },
    {
      id: 3,
      title: 'Where every music scene lives.',
      description: 'Discover 400 million songs, remixes and DJ sets: every chart-topping track you can find elsewhere, and millions more you can’t find anywhere else.'
    }
  ]

  return (
    <div>
      <div className='topbar'>

      </div>
      <HeaderSection section={sections[0]} />
    </div>
  )


}

function HeaderSection({ section }) {
  return (
    <div className="header-section" style={{ backgroundImage: `url(${section.background})` }}>
      <div className='hs-info'>
        <h1>{section.title}</h1>
        <p>{section.description}</p>
        <div className='hs-buttons'>
          <button>Get Started</button>
          <button className='no-background'>Learn More</button>
        </div>
      </div>
      <div className='hs-info-two'>

      </div>
    </div>
  )
}