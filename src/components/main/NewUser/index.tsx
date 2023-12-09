import Features from './Features'
import WelcomeMessage from './WelcomeMessage'

export default async function NewUserWelcome() {
  return (
    <div className="gap-16 mb-32 md:flex md:justify-between md:items-top ">
      <WelcomeMessage />
      <Features />
    </div>
  )
}
