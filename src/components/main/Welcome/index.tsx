import WelcomeMessage from './WelcomeMessage'
import OtherServers from './OtherServers'

export default function Welcome() {
  return (
    <div className="gap-16 mb-32 md:flex md:justify-between md:items-top ">
      <WelcomeMessage />
      <OtherServers />
    </div>
  )
}
